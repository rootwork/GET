export default {
  config: {
    tailwindjs: './tailwind.config.cjs',
    port: 9050,
    modernImages: true,
    cacheBusting: true,
  },
  paths: {
    root: './',
    src: {
      base: './src',
      rootFiles: './src/root',
      styles: './src/styles',
      js: './src/js',
      img: './src/img',
      fonts: './src/fonts',
    },
    dist: {
      base: './dist',
      styles: './dist/css',
      js: './dist/js',
      img: './dist/img',
      fonts: './dist/fonts',
    },
  },
}
