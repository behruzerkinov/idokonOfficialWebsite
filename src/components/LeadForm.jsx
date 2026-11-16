import React, { useEffect, useId, useState } from 'react';
import { CheckCircle2, Phone, Send } from 'lucide-react';
import { toast } from 'sonner';
import { SITE, formatPhone } from '../data/site';
import { submitLead, maskPhone, isValidPhone } from '../lib/submitLead';

const LABEL = 'mb-1.5 block text-sm font-medium';

/**
 * One form for demo, contact and hardware orders. Posts to /api/lead and only
 * shows success when the server confirms delivery.
 */
export const LeadForm = ({
  t, lang, type, items, store = false, plan = false, message = false,
  defaults = {}, doneLabel, onDone, onSuccess,
}) => {
  const uid = useId();
  const f = t.form;
  const [v, setV] = useState({ name: '', phone: '+998 ', storeType: '', plan: '', message: '', website: '' });
  const [err, setErr] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | done | failed

  // Prefill from outside (plan chosen in pricing, kit request in equipment).
  useEffect(() => {
    setV((p) => ({ ...p, ...Object.fromEntries(Object.entries(defaults).filter(([, x]) => x != null)) }));
  }, [defaults.plan, defaults.message, defaults.storeType]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (k) => (e) => setV((p) => ({ ...p, [k]: k === 'phone' ? maskPhone(e.target.value) : e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (v.name.trim().length < 2) next.name = f.errName;
    if (!isValidPhone(v.phone)) next.phone = f.errPhone;
    setErr(next);
    if (Object.keys(next).length) return;

    setState('sending');
    const ok = await submitLead({
      type, lang, name: v.name.trim(), phone: v.phone.replace(/\s+/g, ''),
      storeType: v.storeType, plan: v.plan, message: v.message, website: v.website,
      items: items?.map(({ id, title, qty, price }) => ({ id, name: title?.[lang] || title?.uz || id, qty, price })),
    });
    if (ok) {
      setState('done');
      toast.success(f.successTitle);
      onSuccess?.();
    } else {
      setState('failed'); // form data stays
      toast.error(f.failTitle);
    }
  };

  // Offline mode: no form yet, just direct channels. Flip SITE.leadsEnabled to bring the form back.
  if (!SITE.leadsEnabled) {
    return (
      <div className="space-y-3">
        <p className="text-sm" style={{ color: 'var(--muted)' }}>{f.offlineDesc}</p>
        {SITE.phones.map((p) => (
          <a key={p} href={`tel:${p}`} className="btn-primary w-full"><Phone size={20} strokeWidth={1.75} aria-hidden="true" />{formatPhone(p)}</a>
        ))}
        <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full"><Send size={20} strokeWidth={1.75} aria-hidden="true" />Telegram</a>
      </div>
    );
  }

  if (state === 'done') {
    return (
      <div className="py-6 text-center" role="status">
        <CheckCircle2 className="mx-auto mb-4 text-emerald-600" size={40} strokeWidth={1.75} />
        <h3 className="text-lg font-semibold">{f.successTitle}</h3>
        <p className="mx-auto mt-2 max-w-xs text-sm" style={{ color: 'var(--muted)' }}>{f.successDesc}</p>
        <button type="button" className="btn-secondary mt-6 w-full" onClick={onDone || (() => { setV({ name: '', phone: '+998 ', storeType: '', plan: '', message: '', website: '' }); setState('idle'); })}>
          {doneLabel || f.again}
        </button>
      </div>
    );
  }

  const field = (k, label, props = {}) => (
    <div>
      <label htmlFor={`${uid}-${k}`} className={LABEL}>{label}</label>
      <input
        id={`${uid}-${k}`} className="field" value={v[k]} onChange={set(k)}
        aria-invalid={!!err[k]} aria-describedby={err[k] ? `${uid}-${k}-e` : undefined} {...props}
      />
      {err[k] && <p id={`${uid}-${k}-e`} className="mt-1 text-sm text-red-600" role="alert">{err[k]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="space-y-4 text-left">
      {field('name', f.name, { type: 'text', autoComplete: 'name', placeholder: f.namePh })}
      {field('phone', f.phone, { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}

      {store && (
        <div>
          <label htmlFor={`${uid}-store`} className={LABEL}>{f.storeType} <span style={{ color: 'var(--muted)' }}>{f.optional}</span></label>
          <select id={`${uid}-store`} className="field" value={v.storeType} onChange={set('storeType')}>
            <option value="">{f.storeTypeNone}</option>
            {t.contact.storeTypeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      )}

      {plan && (
        <div>
          <label htmlFor={`${uid}-plan`} className={LABEL}>{f.plan} <span style={{ color: 'var(--muted)' }}>{f.optional}</span></label>
          <select id={`${uid}-plan`} className="field" value={v.plan} onChange={set('plan')}>
            <option value="">{f.planNone}</option>
            {SITE.plans.map((p) => <option key={p.id} value={t.pricing[p.id].name}>{t.pricing[p.id].name}</option>)}
          </select>
        </div>
      )}

      {message && (
        <div>
          <label htmlFor={`${uid}-msg`} className={LABEL}>{f.message} <span style={{ color: 'var(--muted)' }}>{f.optional}</span></label>
          <textarea id={`${uid}-msg`} rows={3} className="field" value={v.message} onChange={set('message')} placeholder={f.messagePh} maxLength={1000} />
        </div>
      )}

      {/* Honeypot: hidden from people and assistive tech */}
      <input
        type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
        value={v.website} onChange={set('website')}
        className="absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
      />

      {state === 'failed' && (
        <div role="alert" className="rounded-[10px] border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          <p className="font-medium">{f.failTitle}</p>
          <p className="mt-1">{f.failDesc}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-medium">
            {SITE.phones.map((p) => <a key={p} href={`tel:${p}`} className="underline">{formatPhone(p)}</a>)}
            <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className="underline">Telegram</a>
          </div>
        </div>
      )}

      <button type="submit" disabled={state === 'sending'} className="btn-primary w-full">
        <Send size={20} strokeWidth={1.75} aria-hidden="true" />
        {state === 'sending' ? f.sending : f.submit}
      </button>
      <p className="text-center text-xs" style={{ color: 'var(--muted)' }}>{f.privacy}</p>
    </form>
  );
};
