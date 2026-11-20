/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // System UI font (SF Pro on Apple devices, Segoe UI on Windows): no web font to download, no swap.
      fontFamily: { sans: ['var(--font)'] },
    },
  },
  plugins: [],
};
