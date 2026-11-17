/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'],
      },
      // All corners follow one token (--r), so the Theme Studio "Roundness" slider reshapes every component.
      borderRadius: {
        sm: 'calc(var(--r) * 0.4)', DEFAULT: 'calc(var(--r) * 0.5)', md: 'calc(var(--r) * 0.6)', lg: 'calc(var(--r) * 0.8)',
        xl: 'var(--r)', '2xl': 'calc(var(--r) * 1.4)', '3xl': 'calc(var(--r) * 1.9)',
      },
      boxShadow: { xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
    },
  },
  plugins: [],
};
