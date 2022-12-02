/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.svelte'],
  theme: {
    extend: {
      borderRadius: {
        2: '2rem',
      },
      fontSize: {
        md: '1.05rem',
      },
    },
  },
  plugins: [],
};
