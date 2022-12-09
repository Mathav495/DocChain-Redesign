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
      width: {
        '2/7': '18%',
        '5/7': '82%',
        '3/8': '38.8%',
        '5/8': '69.8%',
        '3/10': '23%',
        '7/10': '77%',
        88: '22rem',
      },
      borderWidth: {
        6: '6px',
      },
    },
  },
  plugins: [],
};
