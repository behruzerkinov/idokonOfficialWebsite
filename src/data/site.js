// Owner: set verified: true only for numbers you can prove.
export const SITE = {
  phones: ['+998991130999', '+998953600999'],
  telegram: 'https://t.me/idokonuz',
  courseUrl: 'https://idokon-course.vercel.app',
  domain: 'https://idokon.uz',
  currency: 'UZS',
  // Offline mode: forms are hidden and visitors see call / Telegram buttons.
  // Later: set true once TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are set (see api/lead.js).
  leadsEnabled: false,
  // Owner fills e.g. { uz: 'Har kuni 09:00 – 20:00', ru: '...', en: '...' }. Hidden while null.
  supportHours: null,
  // Brand assets. Drop files into public/brand/ and set the path here (see docs/higgsfield-brief.md).
  // Anything left null falls back to the built-in version, so the site never breaks.
  brand: {
    logo: '/idokon_logo.webp',
    gridImage: null, // e.g. '/brand/grid.webp' (transparent background works best)
    heroVideo: null, // e.g. { src: '/brand/hero-loop.mp4', poster: '/brand/hero-loop.webp' }
  },
  plans: [
    { id: 'start', monthly: 100000, '6m': 500000, '12m': 1000000 },
    { id: 'standard', monthly: 150000, '6m': 750000, '12m': 1500000, popular: true },
    { id: 'premium', monthly: 250000, '6m': 1250000, '12m': 2500000 },
  ],
  // Marketing claims. Rendered ONLY when verified === true.
  claims: {
    activeStores: { value: '900+', verified: false },
    rating: { value: '4.9', verified: false },
    setupMinutes: { value: 10, verified: false },
    checkoutSec: { value: 0.8, verified: false },
    callbackMin: { value: 10, verified: false },
  },
};

const CURRENCY_LABEL = { uz: "so'm", ru: 'сум', en: 'UZS' };

export const formatPrice = (n, lang = 'uz') =>
  `${new Intl.NumberFormat('uz-UZ').format(n)} ${CURRENCY_LABEL[lang] || CURRENCY_LABEL.uz}`;

export const formatPhone = (p) => p.replace(/^\+998(\d{2})(\d{3})(\d{2})(\d{2})$/, '+998 $1 $2 $3 $4');
