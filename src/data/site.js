// Owner: set verified: true only for claims you can prove.
export const SITE = {
  phones: ['+998991130999', '+998953600999'],
  telegram: 'https://t.me/idokonuz',
  instagram: 'https://www.instagram.com/idokon_uz/',
  courseUrl: 'https://idokon-course.vercel.app',
  domain: 'https://idokon.uz',
  // Offline mode: forms are hidden and visitors see call / Telegram buttons.
  // Set true once TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are set (see api/lead.js).
  leadsEnabled: false,
  // Owner fills e.g. { uz: 'Har kuni 09:00 – 20:00', ru: '...', en: '...' }. Hidden while null.
  supportHours: null,
  brand: {
    logo: '/idokon_logo.webp',
    heroImage: '/brand/hero-shop.webp', // Higgsfield doodle, 757x558
  },
  plans: [
    { id: 'start', monthly: 100000, '6m': 500000, '12m': 1000000 },
    { id: 'standard', monthly: 150000, '6m': 750000, '12m': 1500000 },
    { id: 'premium', monthly: 250000, '6m': 1250000, '12m': 2500000, popular: true },
  ],
  // Marketing claims. Rendered ONLY when verified === true.
  claims: {
    setupMinutes: { value: 10, verified: true },
    support: { verified: true },
  },
};

const CURRENCY_LABEL = { uz: "so'm", ru: 'сум', en: 'UZS' };
// Grouping with a narrow no-break space (100 000), the way prices are written in Uzbekistan, identical in every browser.
export const formatNum = (n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const currencyLabel = (lang = 'uz') => CURRENCY_LABEL[lang] || CURRENCY_LABEL.uz;
export const formatPrice = (n, lang = 'uz') => `${formatNum(n)} ${currencyLabel(lang)}`;
export const formatPhone = (p) => p.replace(/^\+998(\d{2})(\d{3})(\d{2})(\d{2})$/, '+998 $1 $2 $3 $4');
