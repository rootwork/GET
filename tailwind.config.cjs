module.exports = {
  content: ['./src/**/*.{html,js}'],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        fontello: ['fontello'],
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
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-textshadow'),
  ],
}
