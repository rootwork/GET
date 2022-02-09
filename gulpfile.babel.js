import options from './config.js'

import yargs from 'yargs'
const args = yargs(process.argv.slice(2)).argv

import gulp from 'gulp'
const { src, dest, watch, series, parallel } = gulp
import gulpif from 'gulp-if'
import babel from 'gulp-babel'

import del from 'del'

import browserSync from 'browser-sync'

import minifyHTML from 'gulp-htmlmin'

import dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)
import sourcemaps from 'gulp-sourcemaps'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import postcss from 'gulp-postcss'
import concat from 'gulp-concat'
import minifyCSS from 'gulp-clean-css'

import minifyJS from 'gulp-terser'

import sharpResponsive from 'gulp-sharp-responsive'
import replace from 'gulp-replace'

import { cachekill } from 'cachekill'

import logSymbols from 'log-symbols'

// --prod on the CLI sets production environment
let PRODUCTION
if (args.prod === true) {
  PRODUCTION = true
} else {
  PRODUCTION = false
}

// Image formats and replacement
//
// Sharp should process jp(e)g, png, webp, gif, avif, heif, tiff
// In practice, avif and heif source files are not recommended.
const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'tiff']
let imageOptions = {}

if (options.config.modernImages) {
  imageOptions.formats = [
    { width: 640, format: 'jpeg', rename: { suffix: '-sm' } },
    { width: 768, format: 'jpeg', rename: { suffix: '-md' } },
    { width: 1024, format: 'jpeg', rename: { suffix: '-lg' } },
    { width: 640, format: 'webp', rename: { suffix: '-sm' } },
    { width: 768, format: 'webp', rename: { suffix: '-md' } },
    { width: 1024, format: 'webp', rename: { suffix: '-lg' } },
    { width: 640, format: 'avif', rename: { suffix: '-sm' } },
    { width: 768, format: 'avif', rename: { suffix: '-md' } },
    { width: 1024, format: 'avif', rename: { suffix: '-lg' } },
  ]
} else {
  imageOptions.formats = []
}
imageOptions.includeOriginalFile = true

const imageMarkup = `
<picture>
  <source srcset="$1-sm.avif" media="(max-width: 640px)" type="image/avif" />
  <source srcset="$1-md.avif" media="(max-width: 768px)" type="image/avif" />
  <source srcset="$1-lg.avif" media="(max-width: 1024px)" type="image/avif" />
  <source srcset="$1-sm.webp" media="(max-width: 640px)" type="image/webp" />
  <source srcset="$1-md.webp" media="(max-width: 768px)" type="image/webp" />
  <source srcset="$1-lg.webp" media="(max-width: 1024px)" type="image/webp" />
  <source srcset="$1-sm.jpg" media="(max-width: 640px)" type="image/jpeg" />
  <source srcset="$1-md.jpg" media="(max-width: 768px)" type="image/jpeg" />
  <source srcset="$1-lg.jpg" media="(max-width: 1024px)" type="image/jpeg" />
  $&
</picture>
`

// Cache busting
const bustCache = (sourceFiles, done) => {
  sourceFiles = `${sourceFiles}/**/*`
  const targetFiles = `${options.paths.dist.base}/**/*.{js,css,html}`
  const hashLength = 6
  const rename = true
  return cachekill(sourceFiles, targetFiles, hashLength, rename)
  done()
}

export const bustStylesCache = () => {
  return bustCache(options.paths.dist.styles)
}

export const bustScriptsCache = () => {
  return bustCache(options.paths.dist.js)
}

export const bustImagesCache = () => {
  return bustCache(options.paths.dist.img)
}

// Browser serving
const server = browserSync.create()
export const serve = (done) => {
  server.init({
    server: {
      baseDir: options.paths.dist.base,
    },
    port: options.config.port || 5000,
  })
}

// Browser reloads
export const reload = (done) => {
  console.log('\n\t' + logSymbols.info, 'Reloading browser preview.\n')
  server.reload()
}

// Cleanup
export const clean = () => {
  console.log('\n\t' + logSymbols.info, 'Cleaning generated files.\n')
  return del([options.paths.dist.base])
}

// HTML processing
export const html = () => {
  return src(`${options.paths.src.base}/**/*.html`)
    .pipe(
      gulpif(
        options.config.modernImages,
        replace(
          /<img\s[^>]*?src\s*=\s*['\"]([^'\"\.]*?)\.([^'\"\.]*?)['\"][^>]*?>/g,
          imageMarkup
        )
      )
    )
    .pipe(gulpif(PRODUCTION, minifyHTML({ collapseWhitespace: true })))
    .pipe(dest(options.paths.dist.base))
    .pipe(server.stream())
}

// Root files processing
export const root = () => {
  return src([
    `${options.paths.src.rootFiles}/**/*`,
    `!${options.paths.src.rootFiles}/README.md`,
  ]).pipe(dest(options.paths.dist.base))
}

// Style processing
export const styles = () => {
  return src(`${options.paths.src.styles}/**/*.scss`)
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(concat({ path: 'styles.temp.css' }))
    .pipe(postcss([tailwindcss(options.config.tailwindjs), autoprefixer]))
    .pipe(concat({ path: 'styles.css' }))
    .pipe(gulpif(PRODUCTION, minifyCSS({ compatibility: '*' })))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(dest(options.paths.dist.styles))
    .pipe(server.stream())
}

// Script processing
//
// For minification options, see:
// https://github.com/terser/terser#minify-options
export const scripts = (done) => {
  return [
    src([
      `${options.paths.src.js}/lib/**/*.js`,
      `${options.paths.src.js}/**/*.js`,
      `!${options.paths.src.js}/vendor/**/*.js`,
    ])
      .pipe(concat({ path: 'scripts.js' }))
      .pipe(gulpif(PRODUCTION, minifyJS()))
      .pipe(dest(options.paths.dist.js)),
    src(`${options.paths.src.js}/vendor/*.js`)
      .pipe(gulpif(PRODUCTION, minifyJS()))
      .pipe(dest(options.paths.dist.js)),
    done(),
  ]
}

// Image processing
export const images = () => {
  return src(`${options.paths.src.img}/**/*.{${imageFormats}}`)
    .pipe(sharpResponsive(imageOptions))
    .pipe(dest(options.paths.dist.img))
}

// Font processing
export const fonts = () => {
  return src([
    `${options.paths.src.fonts}/**/*`,
    `!${options.paths.src.fonts}/**/*.md`,
  ]).pipe(dest(options.paths.dist.fonts))
}

// Watch tasks
export const watchFiles = () => {
  console.log('\n\t' + logSymbols.info, 'Watching for changes...\n')
  watch(`${options.paths.src.base}/**/*.html`, parallel(html, styles))
  watch(`${options.paths.src.rootFiles}/**/*`, series(root, reload))
  watch(
    [options.config.tailwindjs, `${options.paths.src.styles}/**/*.scss`],
    series(styles)
  )
  watch(`${options.paths.src.js}/**/*.js`, series(scripts, reload))
  watch(`${options.paths.src.img}/**/*`, series(images, reload))
  watch(`${options.paths.src.fonts}/**/*`, series(fonts, reload))
}

// Build notification
export const complete = (done) => {
  console.log(
    '\n\t' + logSymbols.info,
    `Production build complete at ${options.paths.dist.base}\n`
  ),
    done()
}

// Gulp tasks
let build
if (!PRODUCTION) {
  // dev
  build = series(
    clean,
    parallel(styles, scripts, images, fonts, root, html),
    serve,
    watchFiles
  )
} else {
  if (options.config.cacheBusting) {
    // prod with cache-busting
    build = series(
      clean,
      html,
      parallel(
        series(
          parallel(scripts, styles, images),
          series(bustScriptsCache, bustStylesCache, bustImagesCache)
        ),
        fonts,
        root
      ),
      complete
    )
  } else {
    // prod without cache-busting
    build = series(
      clean,
      parallel(styles, scripts, images, fonts, root, html),
      complete
    )
  }
}

export default build
