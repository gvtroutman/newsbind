/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        card: 'var(--card-shadow)',
        'card-hover': 'var(--card-hover-shadow)',
      },
      transitionProperty: {
        height: 'height',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};