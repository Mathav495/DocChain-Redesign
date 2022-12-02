/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.svelte'],
  theme: {
    extend: {
      borderRadius: {
        'rounded-0.5': '0.5rem',
      },
    },
  },
  plugins: [],
};
