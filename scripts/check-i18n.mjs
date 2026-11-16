// Compares key paths of uz / ru / en in src/data/translations.js. Exits 1 on mismatch.
import { translations } from '../src/data/translations.js';

const flatten = (v, prefix = '', out = new Set()) => {
  if (Array.isArray(v)) {
    out.add(`${prefix}[]`);
    v.forEach((x, i) => typeof x === 'object' && flatten(x, `${prefix}[${i}]`, out));
  } else if (v && typeof v === 'object') {
    for (const k of Object.keys(v)) flatten(v[k], prefix ? `${prefix}.${k}` : k, out);
  } else out.add(prefix);
  return out;
};

const langs = Object.keys(translations);
const keys = Object.fromEntries(langs.map((l) => [l, flatten(translations[l])]));
const all = new Set(langs.flatMap((l) => [...keys[l]]));
let bad = 0;
for (const l of langs) {
  const missing = [...all].filter((k) => !keys[l].has(k));
  if (missing.length) {
    bad += missing.length;
    console.error(`[${l}] missing:\n  ${missing.join('\n  ')}`);
  }
}
if (bad) process.exit(1);
console.log(`i18n OK: ${langs.join(', ')} share ${all.size} keys`);
