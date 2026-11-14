import React, { useState } from 'react';
import { Phone, Send, Clock, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { Reveal, RevealWords } from './Reveal';

const CHANNEL =
  'group flex items-center gap-3.5 rounded-xl border border-[color:var(--line)] bg-zinc-50 p-3.5 transition-[border-color,transform] duration-500 ease-out hover:-translate-y-0.5 hover:border-emerald-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 dark:bg-white/[0.03]';
const ICON_TILE = 'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white';
const CHANNEL_LABEL = 'font-mono text-[11px] text-zinc-500 dark:text-zinc-400';
const CHANNEL_VALUE =
  'font-mono text-sm font-semibold tabular-nums text-zinc-900 transition-colors duration-300 group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400';
const LABEL = 'mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300';
const FIELD =
  'w-full rounded-xl border border-[color:var(--line)] bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors duration-300 focus:border-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 dark:bg-white/[0.03] dark:text-zinc-100';

export const ContactConfigurator = ({ t }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '+998 ',
    storeType: 'grocery',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePhoneChange = (e) => {
    let val = e.target.value;
    if (!val.startsWith('+998')) {
      val = '+998 ';
    }
    setFormData(prev => ({ ...prev, phone: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.phone.length < 9) {
      toast.error(t.contact?.fillRequired || "Iltimos, ismingiz va telefon raqamingizni to'liq kiriting!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success(t.contact?.requestReceived || "So'rovingiz qabul qilindi!", {
        description: t.contact?.requestDesc || "Operatorimiz 10 daqiqa ichida siz bilan bog'lanadi."
      });
      setFormData({
        name: '',
        phone: '+998 ',
        storeType: 'Oziq-ovqat / Supermarket',
        message: ''
      });
    }, 600);
  };

  return (
    <section id="contact" className="section scroll-mt-20 border-b border-[color:var(--line)] text-zinc-900 dark:text-zinc-100">
      <div className="container-page">

        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <div className="eyebrow mb-5">{t.contact.eyebrow}</div>
          <RevealWords
            as="h2"
            text={t.contact.title}
            className="display-lg text-zinc-950 dark:text-white"
          />
          <Reveal as="p" delay={0.2} className="lede mt-5">
            {t.contact.lead}
          </Reveal>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">

          {/* Left Column: Direct Communication Channels */}
          <Reveal className="flex flex-col lg:col-span-5">
            <div className="surface flex flex-1 flex-col justify-between p-7 sm:p-8">
              <div>
                <div className="eyebrow mb-3">
                  {t.contact?.directContact || "To'g'ridan-to'g'ri aloqa"}
                </div>

                <h3 className="mb-4 text-xl font-semibold tracking-[-0.02em] text-zinc-950 sm:text-2xl dark:text-zinc-50">
                  {t.contact?.headline || "Do'koningiz hisobini tartibga keltiramiz"}
                </h3>

                <p className="mb-6 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
                  {t.contact?.subhead || "Dasturni sinab ko'rish, uskunalar tanlash yoki narxlar bo'yicha savollaringiz bo'lsa, mutaxassisimizga qo'ng'iroq qiling."}
                </p>

                <div className="space-y-3">
                  <a href="tel:+998991130999" className={CHANNEL}>
                    <div className={`${ICON_TILE} bg-emerald-600`}>
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className={CHANNEL_LABEL}>{t.contact.hotlineLabel || "Tezkor operator raqami:"}</div>
                      <div className={CHANNEL_VALUE}>+998 99 113 09 99</div>
                    </div>
                  </a>

                  <a href="tel:+998953600999" className={CHANNEL}>
                    <div className={`${ICON_TILE} bg-emerald-600`}>
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className={CHANNEL_LABEL}>{t.contact.secondHotlineLabel || "Qo'shimcha operator:"}</div>
                      <div className={CHANNEL_VALUE}>+998 95 360 09 99</div>
                    </div>
                  </a>

                  <a
                    href="https://t.me/idokonuz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={CHANNEL}
                  >
                    <div className={`${ICON_TILE} bg-[#229ED9]`}>
                      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.693c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
                      </svg>
                    </div>
                    <div>
                      <div className={CHANNEL_LABEL}>{t.contact.telegramLabel || "Telegram orqali bog'lanish:"}</div>
                      <div className={CHANNEL_VALUE}>@idokonuz</div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-[color:var(--line)] pt-4 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{t.contact.workingHoursLabel || "Ish vaqti:"}</span>
                </div>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{t.contact.workHours}</span>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Consultation Request */}
          <Reveal delay={0.12} className="flex flex-col lg:col-span-7">
            <div className="surface flex flex-1 flex-col p-7 sm:p-8">
              {submitted ? (
                <div className="my-auto py-8 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="mb-2 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                    {t.contact?.requestReceived || "So'rovingiz qabul qilindi!"}
                  </h4>
                  <p className="mx-auto mb-6 max-w-md text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
                    {t.contact?.requestDesc || "Mutaxassisimiz tez orada sizga qo'ng'iroq qilib, I-Do'kon tizimini do'koningizga moslashtirish bo'yicha maslahat beradi."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary"
                  >
                    {t.contact?.sendAnother || "Yana bir so'rov yuborish"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                    {t.contact?.orderConsultation || "Konsultatsiya buyurtma qilish"}
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className={LABEL}>
                        {t.contact.nameLabel}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder={t.contact.namePlaceholder}
                        className={FIELD}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="contact-phone" className={LABEL}>
                        {t.contact.phoneLabel}
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        placeholder={t.contact.phonePlaceholder}
                        className={`${FIELD} font-mono`}
                      />
                    </div>
                  </div>

                  {/* Optional Message */}
                  <div>
                    <label htmlFor="contact-message" className={LABEL}>
                      {t.contact.messageLabel} {t.contact?.optional || "(ixtiyoriy)"}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder={t.contact?.messagePlaceholder || "Qanday uskunalar yoki savollaringiz bor..."}
                      className={`${FIELD} resize-none`}
                    />
                  </div>

                  {/* Privacy Notice */}
                  <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {t.contact.privacy}
                  </p>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full disabled:cursor-wait disabled:opacity-60"
                  >
                    {loading ? (
                      <span>{t.contact.submitting}</span>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>{t.contact.submitBtn}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

        </div>

      </div>
    </section>
  );
};
