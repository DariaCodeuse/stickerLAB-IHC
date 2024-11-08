const colors = require('tailwindcss/colors');

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        tapiz: '#EBF0F6',
        primario: '#0568FD',
        secundario: '#FAE6E9',
        'base-3': '#F18789',
        'base-4': '#F1A662',
        black: '#263238',
        'd-grey': '#4D4D4D',
        grey: '#717171',
        'l-grey': '#89939E',
        'grey-blue': '#ABBED1',
        silver: '#F5F7FA',
      },
      fontFamily: {
        main: ['Montserrat', 'Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        secondary: ['Montserrat Alternates', 'sans-serif'],
      },
      fontWeight: {
        bold: 700,
      },
    },
  },

  plugins: [
    function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--font-main': theme('fontFamily.main').join(', '),
          '--font-secondary': theme('fontFamily.secondary').join(', '),
          '--font-bold': theme('fontWeight.bold'),
          '--tapiz': theme('colors.tapiz'),
          '--primario': theme('colors.primario'),
          '--secundario': theme('colors.secundario'),
          '--base-3': theme('colors.base-3'),
          '--base-4': theme('colors.base-4'),
          '--black': theme('colors.black'),
          '--d-grey': theme('colors.d-grey'),
          '--grey': theme('colors.grey'),
          '--l-grey': theme('colors.l-grey'),
          '--grey-blue': theme('colors.grey-blue'),
          '--silver': theme('colors.silver'),
        },
      });
    },
  ],
};

module.exports = config;
