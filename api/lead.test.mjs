import test from 'node:test';
import assert from 'node:assert/strict';
import handler from './lead.js';

const mkRes = () => {
  const res = { statusCode: 0, body: null };
  res.status = (c) => { res.statusCode = c; return res; };
  res.json = (b) => { res.body = b; return res; };
  return res;
};
const mkReq = (body, method = 'POST') => ({ method, body });
const valid = { type: 'demo', name: 'Jasur', phone: '+998 90 123 45 67', lang: 'uz', website: '' };

let calls;
const mockFetch = (status = 200) => {
  calls = [];
  globalThis.fetch = async (url, init) => { calls.push({ url, init }); return { ok: status < 400, status }; };
};
process.env.TELEGRAM_BOT_TOKEN = 'TOKEN';
process.env.TELEGRAM_CHAT_ID = '42';

test('valid demo is sent to Telegram', async () => {
  mockFetch();
  const res = mkRes();
  await handler(mkReq(valid), res);
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { ok: true });
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /api\.telegram\.org\/botTOKEN\/sendMessage/);
  const sent = JSON.parse(calls[0].init.body);
  assert.equal(sent.chat_id, '42');
  assert.match(sent.text, /Jasur/);
  assert.match(sent.text, /\+998901234567/);
  assert.equal(sent.parse_mode, undefined);
});

test('valid hardware order lists items', async () => {
  mockFetch();
  const res = mkRes();
  await handler(mkReq({ ...valid, type: 'hardware', items: [{ id: 'a', name: 'Printer', qty: 2, price: 1000 }] }), res);
  assert.equal(res.statusCode, 200);
  assert.match(JSON.parse(calls[0].init.body).text, /Printer.*2/);
});

test('honeypot returns 200 and sends nothing', async () => {
  mockFetch();
  const res = mkRes();
  await handler(mkReq({ ...valid, website: 'http://spam' }), res);
  assert.equal(res.statusCode, 200);
  assert.equal(calls.length, 0);
});

test('bad phone is rejected', async () => {
  mockFetch();
  const res = mkRes();
  await handler(mkReq({ ...valid, phone: '+998 90 123' }), res);
  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, { ok: false, error: 'invalid' });
  assert.equal(calls.length, 0);
});

test('missing name is rejected', async () => {
  mockFetch();
  const res = mkRes();
  await handler(mkReq({ ...valid, name: ' ' }), res);
  assert.equal(res.statusCode, 400);
});

test('Telegram failure returns 502', async () => {
  mockFetch(500);
  const res = mkRes();
  await handler(mkReq(valid), res);
  assert.equal(res.statusCode, 502);
  assert.deepEqual(res.body, { ok: false, error: 'delivery' });
});

test('missing env returns 502', async () => {
  mockFetch();
  const t = process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.TELEGRAM_BOT_TOKEN;
  const res = mkRes();
  await handler(mkReq(valid), res);
  process.env.TELEGRAM_BOT_TOKEN = t;
  assert.equal(res.statusCode, 502);
});

test('non-POST returns 405', async () => {
  mockFetch();
  const res = mkRes();
  await handler(mkReq(valid, 'GET'), res);
  assert.equal(res.statusCode, 405);
});
