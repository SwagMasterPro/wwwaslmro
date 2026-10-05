import { readFileSync } from "node:fs";
import { createHmac, randomUUID } from "node:crypto";
import vm from "node:vm";
import assert from "node:assert/strict";

type Row = (string | number)[];
type Tab = { properties: { sheetId: number; title: string; hidden?: boolean; gridProperties: { rowCount: number; columnCount: number } }; tables?: { name: string; tableId: string; range: { sheetId: number; endRowIndex: number } }[] };
type RequestObject = Record<string, { [key: string]: unknown }>;
export const headers = ["ID înscriere", "Data înscrierii", "Nume", "E-mail", "Telefon", "Opțiune", "Sumă bilet (RON)", "Status plată / solicitare", "ID comandă", "Verificare membru", "Cont trimis la", "Observații ASLM"];
const names = ["_WebinarRegistrations", "_WebinarQueue", "_WebinarRateLimits", "_WebinarWorker"];
const source = ["Store.gs", "Code.gs"].map(name => readFileSync(new URL(`../../scripts/webinar-sheet/${name}`, import.meta.url), "utf8")).join("\n");
const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));
export class SheetFixture {
  readonly sheetId = "test-sheet";
  readonly secret = "sheet-test-secret-".repeat(3);
  now = Date.now();
  tabs: Tab[] = [{ properties: { sheetId: 1, title: "Înscrieri", gridProperties: { rowCount: 1000, columnCount: 26 } }, tables: [{ name: "InscrieriWebinarASLM", tableId: "tracker", range: { sheetId: 1, endRowIndex: 1000 } }] }, ...names.map((title, i) => ({ properties: { sheetId: i + 2, title, hidden: true, gridProperties: { rowCount: 1000, columnCount: 2 } } }))];
  rows: Record<string, Row[]> = Object.fromEntries(["Înscrieri", ...names].map(name => [name, [name === "Înscrieri" ? [...headers] : ["Key", "Record JSON"]]]));
  writes: RequestObject[][] = [];
  reads = 0;
  locked = false;
  loseResponse = false;
  failWrite = false;
  duringWrite?: () => void;
  readonly context: vm.Context;
  constructor() {
    const cache = new Map<string, { value: string; expires: number }>();
    const lock = { tryLock: () => { if (this.locked) return false; this.locked = true; return true; }, hasLock: () => this.locked, releaseLock: () => { this.locked = false; } };
    this.context = vm.createContext({
      PropertiesService: { getScriptProperties: () => ({ getProperty: (key: string) => ({ WEBINAR_SHEET_ID: this.sheetId, WEBINAR_SHEET_SECRET: this.secret }[key] || null) }) },
      clock: () => this.now,
      CacheService: { getScriptCache: () => ({ get: (key: string) => { const entry = cache.get(key); return entry && entry.expires > this.now ? entry.value : null; }, put: (key: string, value: string, ttl: number) => { cache.set(key, { value, expires: this.now + ttl * 1000 }); }, remove: (key: string) => { cache.delete(key); } }) },
      ContentService: { MimeType: { JSON: "json" }, createTextOutput: (body: string) => ({ body, setMimeType() { return this; } }) },
      Utilities: { computeHmacSha256Signature: (data: string, secret: string) => [...createHmac("sha256", secret).update(data).digest()], formatDate: (date: Date) => date.toISOString() },
      LockService: { getScriptLock: () => lock },
      Sheets: { Spreadsheets: {
        get: () => { this.reads++; return { sheets: clone(this.tabs) }; },
        Values: { batchGet: (_id: string, opts: { ranges: string[] }) => ({ valueRanges: opts.ranges.map(range => ({ values: clone(this.rows[range.match(/^'([^']+)'!/)![1]]) })) }) },
        batchUpdate: (body: { requests: RequestObject[] }) => this.commit(body.requests),
      } },
    });
    vm.runInContext(`Date.now = clock;\n${source}`, this.context);
  }
  private commit(requests: RequestObject[]) {
    this.duringWrite?.();
    if (this.failWrite) { this.failWrite = false; throw new Error("Quota exhausted"); }
    const nextRows = clone(this.rows), nextTabs = clone(this.tabs);
    for (const request of requests) {
      if (request.updateSheetProperties) {
        const p = request.updateSheetProperties.properties as Tab["properties"];
        nextTabs.find(t => t.properties.sheetId === p.sheetId)!.properties.gridProperties.rowCount = p.gridProperties.rowCount;
      } else if (request.updateTable) {
        const table = request.updateTable.table as { tableId: string; range: { sheetId: number; endRowIndex: number } };
        nextTabs.flatMap(t => t.tables || []).find(t => t.tableId === table.tableId)!.range = table.range;
      } else if (request.updateCells) {
        const r = request.updateCells as unknown as { start: { sheetId: number; rowIndex: number; columnIndex: number }; rows: { values: { userEnteredValue: { stringValue?: string; numberValue?: number; formulaValue?: string } }[] }[]; fields: string };
        assert.equal(r.fields, "userEnteredValue");
        const tab = nextTabs.find(t => t.properties.sheetId === r.start.sheetId)!;
        assert.ok(r.start.rowIndex < tab.properties.gridProperties.rowCount, "write requires grid extension first");
        const rows = nextRows[tab.properties.title];
        const row = rows[r.start.rowIndex] ||= [];
        r.rows[0].values.forEach((cell, i) => {
          assert.equal(cell.userEnteredValue.formulaValue, undefined, "contact details never become formulas");
          row[r.start.columnIndex + i] = cell.userEnteredValue.stringValue ?? cell.userEnteredValue.numberValue!;
        });
      } else assert.ok(request.copyPaste, "unrecognized write");
    }
    this.rows = nextRows; this.tabs = nextTabs; this.writes.push(clone(requests));
    if (this.loseResponse) { this.loseResponse = false; throw new Error("Response lost after atomic commit"); }
  }
  envelope(action: string, args: Record<string, unknown>, overrides: Record<string, unknown> = {}) {
    const timestamp = this.now, nonce = randomUUID(), payload = JSON.stringify({ action, args, sheetId: this.sheetId });
    const signature = createHmac("sha256", this.secret).update(`${timestamp}\n${nonce}\n${payload}`).digest("hex");
    return JSON.stringify({ timestamp, nonce, payload, signature, ...overrides });
  }
  post(body: string): { ok: boolean; result?: unknown; error?: string } {
    this.context.event = { postData: { contents: body } };
    const response = vm.runInContext("doPost(event)", this.context) as { body: string };
    return JSON.parse(response.body);
  }
  rpc<T = unknown>(action: string, args: Record<string, unknown> = {}): T {
    const response = this.post(this.envelope(action, args));
    if (!response.ok) throw new Error(response.error);
    return response.result as T;
  }
  records<T>(tab: string): T[] {
    return this.rows[tab].slice(1).filter(row => row[0]).map(row => JSON.parse(String(row[1])));
  }
}
export function registrationArgs(option = "member", email = "ana@example.com", id = randomUUID()) {
  return { p_id: id, p_name: "=Ana Ionescu", p_email: email, p_phone: "+40 700", p_option: option, p_token_hash: "a".repeat(64), p_terms_version: "webinar-2026-10-v2" };
}
