import test from "node:test";
import assert from "node:assert/strict";
import { bankPayment, createSession, notificationReference, sessionPayload, type GatewayConfig } from "../../lib/webinar/gateway";
const reference="ASLMWEB-11111111-1111-4111-8111-111111111111";
const config: GatewayConfig = { baseUrl:"https://egenius.unicredit.ro/api/rest",merchantId:"test-merchant",password:"test-password",version:"85",siteUrl:"https://www.aslm.ro" };
const fixture = () => ({ id:reference,merchant:"test-merchant",currency:"RON",amount:"100.00",status:"CAPTURED",totalCapturedAmount:"100.00",totalRefundedAmount:0,transaction:[{ result:"SUCCESS", response:{gatewayCode:"APPROVED"},transaction:{id:"transaction-one",type:"PAYMENT",amount:100,currency:"RON",timeOfRecord:"2026-10-05T10:00:00Z"} }] });
test("one-time PURCHASE contains no recurring agreement or card storage", () => {
  const body = sessionPayload(reference,"ana@example.com",config);
  assert.equal(body.order.amount,"100.00"); assert.equal(body.order.currency,"RON"); assert.equal(body.interaction.operation,"PURCHASE");
  assert.equal("agreement" in body,false); assert.equal("sourceOfFunds" in body,false); assert.match(body.interaction.returnUrl,/\/webinar\/confirmare/);
});
test("accept only a captured, approved, matching bank transaction", () => { assert.deepEqual(bankPayment(fixture(),reference,"test-merchant"),{status:"paid",transactionId:"transaction-one",paidAt:"2026-10-05T10:00:00.000Z"}); });
test("reject merchant, order, amount and currency mismatches", () => {
  for (const change of [{merchant:"wrong"},{id:"wrong"},{amount:1},{currency:"EUR"}]) assert.throws(()=>bankPayment({...fixture(),...change},reference,"test-merchant"),/mismatch/);
});
test("browser success, authorization, refund and unapproved transactions cannot confirm payment", () => {
  assert.throws(()=>bankPayment({result:"SUCCESS"},reference,"test-merchant"));
  assert.equal(bankPayment({...fixture(),status:"AUTHORIZED"},reference,"test-merchant").status,"pending");
  assert.equal(bankPayment({...fixture(),totalRefundedAmount:100},reference,"test-merchant").status,"pending");
  const denied=fixture(); denied.transaction[0].response.gatewayCode="DECLINED";
  assert.equal(bankPayment(denied,reference,"test-merchant").status,"pending");
  const wrongAmount=fixture(); wrongAmount.transaction[0].transaction.amount=1;
  assert.equal(bankPayment(wrongAmount,reference,"test-merchant").status,"pending");
});
test("bank cancellation or failure permits retry, pending status does not release an active order", () => {
  for(const status of ["FAILED","CANCELLED"]) assert.equal(bankPayment({...fixture(),status},reference,"test-merchant").status,"failed");
  assert.equal(bankPayment({...fixture(),status:"INITIATED"},reference,"test-merchant").status,"pending");
});
test("webhooks accept only webinar references", () => {
  assert.equal(notificationReference({order:{id:reference}}),reference);
  assert.equal(notificationReference({order:{id:"MSC-123"}}),null);
});
test("checkout uses hosted session and hides credentials from public results", async () => {
  let request: RequestInit | undefined;
  const fetcher = async (_url: string | URL | Request, init?: RequestInit) => { request=init; return Response.json({session:{id:"SESSION123"}}); };
  assert.equal(await createSession(reference,"ana@example.com",config,fetcher),"SESSION123");
  assert.match(JSON.stringify(request?.body),/100.00/);
  await assert.rejects(createSession(reference,"ana@example.com",config,async()=>new Response("",{status:400})),(e: unknown)=> e instanceof Error && "definitive" in e && e.definitive===true);
  await assert.rejects(createSession(reference,"ana@example.com",config,async()=>new Response("",{status:503})),(e: unknown)=> e instanceof Error && "definitive" in e && e.definitive===false);
});
