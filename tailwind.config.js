/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  theme: {
    extend: {
      spacing: {
        120: '480px'
      },
      screens: {
          '': { 'raw': 'print' },
          'print': { 'raw': 'print' },

      }
    },
  },
  plugins: [],
}
