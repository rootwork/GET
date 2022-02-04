module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway'],
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      'dark-mode': {
        raw: '(prefers-color-scheme: dark)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
