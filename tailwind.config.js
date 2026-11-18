/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // "Inter Fallback" is local Arial resized to Inter's metrics (index.css), so the web-font swap causes no layout shift.
      fontFamily: { sans: ['"Inter Variable"', '"Inter Fallback"', 'system-ui', 'sans-serif'] },
      // Every corner follows one token (--r in index.css).
      borderRadius: {
        sm: 'calc(var(--r) * 0.4)', DEFAULT: 'calc(var(--r) * 0.5)', md: 'calc(var(--r) * 0.6)', lg: 'calc(var(--r) * 0.8)',
        xl: 'var(--r)', '2xl': 'calc(var(--r) * 1.4)', '3xl': 'calc(var(--r) * 1.9)',
      },
    },
  },
  plugins: [],
};
