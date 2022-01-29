export default {
  config: {
    tailwindjs: './tailwind.config.cjs',
    port: 9050,
  },
  paths: {
    root: './',
    src: {
      base: './src',
      styles: './src/styles',
      js: './src/js',
      img: './src/img',
    },
    dist: {
      base: './dist',
      styles: './dist/css',
      js: './dist/js',
      img: './dist/img',
    },
    build: {
      base: './build',
      styles: './build/css',
      js: './build/js',
      img: './build/img',
    },
  },
}
