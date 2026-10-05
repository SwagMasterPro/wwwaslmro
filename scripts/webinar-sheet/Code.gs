const WEBINAR_TABS = { registrations: "_WebinarRegistrations", jobs: "_WebinarQueue", rates: "_WebinarRateLimits", worker: "_WebinarWorker" };
const WEBINAR_TAB_IDS = { registrations: 700000001, jobs: 700000003, rates: 700000004, worker: 700000005 };
const WEBINAR_HEADERS = ["ID înscriere", "Data înscrierii", "Nume", "E-mail", "Telefon", "Opțiune", "Sumă bilet (RON)", "Status plată / solicitare", "ID comandă", "Verificare membru", "Cont trimis la", "Observații ASLM"];

function webinarConfiguration() {
  const p = PropertiesService.getScriptProperties();
  const sheetId = p.getProperty("WEBINAR_SHEET_ID"), secret = p.getProperty("WEBINAR_SHEET_SECRET");
  if (!sheetId || !secret || secret.length < 32) throw new Error("not_configured");
  return { sheetId, secret };
}
function webinarResponse(result) { return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON); }
function doGet() { return webinarResponse({ ok: false, error: "post_required" }); }
function doPost(e) {
  let lock;
  try {
    const config = webinarConfiguration(), raw = e?.postData?.contents;
    if (!raw || raw.length > 20000) throw new Error("invalid_envelope");
    const envelope = JSON.parse(raw), now = Date.now();
    if (typeof envelope.payload !== "string" || envelope.payload.length > 12000 || !Number.isSafeInteger(envelope.timestamp) || Math.abs(now - envelope.timestamp) > 300000 || typeof envelope.nonce !== "string" || !/^[a-f0-9-]{36}$/.test(envelope.nonce) || typeof envelope.signature !== "string" || !/^[a-f0-9]{64}$/.test(envelope.signature)) throw new Error("unauthorized");
    const expected = Utilities.computeHmacSha256Signature(`${envelope.timestamp}\n${envelope.nonce}\n${envelope.payload}`, config.secret).map(byte => (byte & 255).toString(16).padStart(2, "0")).join("");
    let mismatch = 0;
    for (let i = 0; i < 64; i++) mismatch |= expected.charCodeAt(i) ^ envelope.signature.charCodeAt(i);
    if (mismatch) throw new Error("unauthorized");
    const request = JSON.parse(envelope.payload);
    if (request.sheetId !== config.sheetId || typeof request.action !== "string" || !request.args || typeof request.args !== "object" || Array.isArray(request.args)) throw new Error("invalid_request");
    lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) throw new Error("busy");
    const snapshot = webinarRead(config.sheetId);
    const state = JSON.parse(JSON.stringify(snapshot.state));
    const result = WebinarStore.execute(state, request.action, request.args, now, value => Utilities.formatDate(new Date(value), "Europe/Bucharest", "dd.MM.yyyy HH:mm"));
    webinarCommit(config.sheetId, snapshot, state);
    return webinarResponse({ ok: true, result });
  } catch (error) {
    const allowed = ["not_configured", "invalid_envelope", "unauthorized", "invalid_request", "busy", "schema_missing", "schema_mismatch", "duplicate_record", "registration_closed", "invalid_registration", "duplicate_email", "idempotency_conflict", "invalid_lease", "invalid_rate_key", "unknown_action", "duplicate_sheet_id", "sheet_row_occupied"];
    return webinarResponse({ ok: false, error: allowed.includes(error.message) ? error.message : "unavailable" });
  } finally { if (lock?.hasLock()) lock.releaseLock(); }
}

function webinarRead(sheetId) {
  const cache = CacheService.getScriptCache(), cacheKey = `webinar-metadata:${sheetId}`, cached = cache.get(cacheKey);
  const metadata = cached ? JSON.parse(cached) : Sheets.Spreadsheets.get(sheetId, { fields: "sheets(properties,tables(tableId,name,range))" });
  // Cache only structural metadata. Contacts, jobs and rate counters
  // always come from a fresh Sheet read inside the lock.
  if (!cached) cache.put(cacheKey, JSON.stringify(metadata), 300);
  const tabs = {};
  ["Înscrieri", ...Object.values(WEBINAR_TABS)].forEach(name => {
    const tab = metadata.sheets.find(s => s.properties.title === name);
    if (!tab) throw new Error("schema_missing"); tabs[name] = tab;
  });
  const ranges = ["'Înscrieri'!A1:L", ...Object.values(WEBINAR_TABS).map(name => `'${name}'!A1:B`)];
  const data = Sheets.Spreadsheets.Values.batchGet(sheetId, { ranges, valueRenderOption: "UNFORMATTED_VALUE" }).valueRanges;
  const visibleRows = data[0].values || [];
  if (JSON.stringify(visibleRows[0]) !== JSON.stringify(WEBINAR_HEADERS) || !tabs["Înscrieri"].tables?.some(t => t.name === "InscrieriWebinarASLM")) throw new Error("schema_mismatch");
  const state = { visible: visibleRows.slice(1), registrations: {}, jobs: {}, rates: {}, worker: {} }, indexes = {};
  Object.keys(WEBINAR_TABS).forEach((key, i) => {
    const values = data[i + 1].values || [];
    if (JSON.stringify(values[0]) !== JSON.stringify(["Key", "Record JSON"])) throw new Error("schema_mismatch");
    indexes[key] = { rows: values.slice(1), positions: {} };
    values.slice(1).forEach((row, index) => {
      if (!row[0] && !row[1]) return;
      if (!row[0] || !row[1] || indexes[key].positions[row[0]] !== undefined) throw new Error("duplicate_record");
      indexes[key].positions[row[0]] = index + 1;
      const record = JSON.parse(row[1]);
      if (key === "worker") { if (row[0] !== "worker") throw new Error("schema_mismatch"); state.worker = record; }
      else state[key][row[0]] = record;
    });
  });
  return { state, indexes, tabs };
}
function webinarCell(value) {
  return { userEnteredValue: typeof value === "number" ? { numberValue: value } : { stringValue: String(value ?? "") } };
}
function webinarCommit(sheetId, snapshot, state) {
  const requests = [], neededRows = {};
  const write = (name, rowIndex, values) => {
    const tab = snapshot.tabs[name];
    neededRows[name] = Math.max(neededRows[name] || 0, rowIndex + 1);
    requests.push({ updateCells: { start: { sheetId: tab.properties.sheetId, rowIndex, columnIndex: 0 }, rows: [{ values: values.map(webinarCell) }], fields: "userEnteredValue" } });
  };
  Object.keys(WEBINAR_TABS).forEach(key => {
    const before = key === "worker" ? { worker: snapshot.state.worker } : snapshot.state[key];
    const after = key === "worker" ? { worker: state.worker } : state[key];
    const index = snapshot.indexes[key], occupied = new Set(Object.values(index.positions));
    Object.keys(before).filter(id => !(id in after)).forEach(id => {
      const row = index.positions[id]; if (row !== undefined) { write(WEBINAR_TABS[key], row, ["", ""]); occupied.delete(row); }
    });
    let next = 1;
    Object.keys(after).forEach(id => {
      if (JSON.stringify(before[id]) === JSON.stringify(after[id])) return;
      let row = index.positions[id];
      if (row === undefined) { while (occupied.has(next)) next++; row = next++; occupied.add(row); }
      write(WEBINAR_TABS[key], row, [id, JSON.stringify(after[id])]);
    });
  });
  state.visible.forEach((row, i) => {
    if (JSON.stringify(row.slice(0, 9)) !== JSON.stringify(snapshot.state.visible[i]?.slice(0, 9))) write("Înscrieri", i + 1, row.slice(0, 9));
  });
  const structural = [];
  Object.keys(neededRows).forEach(name => {
    const tab = snapshot.tabs[name], current = tab.properties.gridProperties.rowCount;
    if (neededRows[name] > current) {
      const count = Math.max(neededRows[name] + 100, current + 100);
      structural.push({ updateSheetProperties: { properties: { sheetId: tab.properties.sheetId, gridProperties: { rowCount: count } }, fields: "gridProperties.rowCount" } });
      if (name === "Înscrieri") {
        structural.push({ copyPaste: { source: { sheetId: tab.properties.sheetId, startRowIndex: 1, endRowIndex: 2, startColumnIndex: 0, endColumnIndex: 12 }, destination: { sheetId: tab.properties.sheetId, startRowIndex: current, endRowIndex: count, startColumnIndex: 0, endColumnIndex: 12 }, pasteType: "PASTE_FORMAT" } });
      }
    }
    if (name === "Înscrieri") {
      const table = tab.tables.find(t => t.name === "InscrieriWebinarASLM"), end = Math.max(current, neededRows[name] > current ? neededRows[name] + 100 : neededRows[name]);
      if ((table.range.endRowIndex || 0) < end) structural.push({ updateTable: { table: { tableId: table.tableId, range: { sheetId: tab.properties.sheetId, startRowIndex: 0, endRowIndex: end, startColumnIndex: 0, endColumnIndex: 12 } }, fields: "range" } });
    }
  });
  // Registration state, visible A:I and notification jobs commit together.
  // No append: IDs and locked positions make retry after an unknown response safe.
  if (structural.length) CacheService.getScriptCache().remove(`webinar-metadata:${sheetId}`);
  if (requests.length) Sheets.Spreadsheets.batchUpdate({ requests: [...structural, ...requests] }, sheetId);
}

function setupWebinarStorage() {
  const config = webinarConfiguration(), lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    const metadata = Sheets.Spreadsheets.get(config.sheetId, { fields: "sheets(properties)" });
    if (!metadata.sheets.some(s => s.properties.title === "Înscrieri")) throw new Error("schema_missing");
    const requests = [];
    Object.entries(WEBINAR_TABS).forEach(([key, title]) => {
      if (metadata.sheets.some(s => s.properties.title === title)) return;
      const sheetId = WEBINAR_TAB_IDS[key];
      requests.push({ addSheet: { properties: { sheetId, title, hidden: true, gridProperties: { rowCount: 1000, columnCount: 2, frozenRowCount: 1 } } } });
      requests.push({ updateCells: { start: { sheetId, rowIndex: 0, columnIndex: 0 }, rows: [{ values: ["Key", "Record JSON"].map(webinarCell) }], fields: "userEnteredValue" } });
    });
    if (requests.length) Sheets.Spreadsheets.batchUpdate({ requests }, config.sheetId);
    CacheService.getScriptCache().remove(`webinar-metadata:${config.sheetId}`);
    webinarRead(config.sheetId);
    console.log("Webinar Sheet schema verified. Registration flags remain controlled by the site.");
  } finally { lock.releaseLock(); }
}
function installWebinarDelivery() {
  const properties = PropertiesService.getScriptProperties();
  if (!properties.getProperty("CRON_SECRET") || !properties.getProperty("WEBINAR_SITE_URL")) throw new Error("not_configured");
  if (!ScriptApp.getProjectTriggers().some(t => t.getHandlerFunction() === "webinarDeliver")) ScriptApp.newTrigger("webinarDeliver").timeBased().everyMinutes(5).create();
}
function webinarDeliver() {
  const properties = PropertiesService.getScriptProperties(), site = properties.getProperty("WEBINAR_SITE_URL");
  if (!/^https:\/\/(www\.)?aslm\.ro$/.test(site || "") || !properties.getProperty("CRON_SECRET")) throw new Error("not_configured");
  const response = UrlFetchApp.fetch(`${site}/api/webinar/jobs`, { method: "get", headers: { Authorization: `Bearer ${properties.getProperty("CRON_SECRET")}` }, muteHttpExceptions: true });
  if (response.getResponseCode() !== 200) throw new Error("Webinar email delivery unavailable");
}
