/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Onest (self-hosted, see index.css); Unbounded and the digits-only mono are set via CSS variables.
      fontFamily: { sans: ['var(--font)'] },
    },
  },
  plugins: [],
};
