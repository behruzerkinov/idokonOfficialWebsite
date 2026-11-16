// Vercel serverless function: POST /api/lead -> Telegram group message.
const TYPES = ['demo', 'contact', 'hardware'];
const clean = (v, max = 1000) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

const invalid = (res) => res.status(400).json({ ok: false, error: 'invalid' });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method' });

  let b = req.body;
  if (typeof b === 'string') {
    try { b = JSON.parse(b); } catch { return invalid(res); }
  }
  if (!b || typeof b !== 'object') return invalid(res);

  if (clean(b.website)) return res.status(200).json({ ok: true }); // honeypot

  const name = clean(b.name, 80);
  const phone = clean(b.phone).replace(/\s+/g, '');
  const items = Array.isArray(b.items) ? b.items : [];
  if (!TYPES.includes(b.type) || name.length < 2 || !/^\+998\d{9}$/.test(phone) || items.length > 50) {
    return invalid(res);
  }

  const lines = [
    `Yangi ariza: ${b.type.toUpperCase()}`,
    `Ism: ${name}`,
    `Telefon: ${phone}`,
    clean(b.storeType) && `Do'kon turi: ${clean(b.storeType)}`,
    clean(b.plan) && `Tarif: ${clean(b.plan)}`,
    clean(b.message) && `Xabar: ${clean(b.message)}`,
    items.length && 'Buyurtma:',
    ...items.map((i) => `- ${clean(i?.name, 120)} x ${Number(i?.qty) || 0} (${Number(i?.price) || 0})`),
    `Til: ${clean(b.lang, 5)}`,
    `Vaqt: ${new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Tashkent' })} (Asia/Tashkent)`,
  ].filter(Boolean);

  const { TELEGRAM_BOT_TOKEN: token, TELEGRAM_CHAT_ID: chat } = process.env;
  if (!token || !chat) return res.status(502).json({ ok: false, error: 'delivery' });

  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text: lines.join('\n') }),
    });
    if (!r.ok) throw new Error(`telegram ${r.status}`);
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false, error: 'delivery' });
  }
}
