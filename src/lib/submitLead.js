/** POST a lead to /api/lead. Resolves true only when the server confirms delivery. */
export async function submitLead(payload) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 10000);
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
    const data = await res.json().catch(() => ({}));
    return res.ok && data.ok === true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/** "+998 90 123 45 67" mask; always keeps the +998 prefix. */
export function maskPhone(raw) {
  const d = raw.replace(/\D/g, '').replace(/^998/, '').slice(0, 9);
  const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean);
  return `+998 ${parts.join(' ')}`.trimEnd() + (parts.length ? '' : ' ');
}

export const isValidPhone = (v) => /^\+998\d{9}$/.test(v.replace(/\s+/g, ''));
