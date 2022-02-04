# GET: Gulp, ES6, TailwindCSS

A starter project that GETs you up and running with Gulp (v4), ES6 JavaScript
modules, and TailwindCSS (v3). Great as a kickstart template for trying out
TailwindCSS, quickly generating simple sites, or working on SPAs.

## ✨ Highlights

- Sass compilation (in SCSS format, so you can use CSS directly if you prefer)
  with autoprefixing, minification and sourcemaps, using modern
  [Dart Sass](https://sass-lang.com/dart-sass).
- Responsive image file and markup generation (`<picture>` sets with `webp` and
  `avif` formats), automatically.
- HTML and Javascript minification.
- All the usual Tailwind 3 stuff, including
  [Just-In-Time mode](https://tailwindcss.com/blog/just-in-time-the-next-generation-of-tailwind-css)
  and
  [CSS purging by default](https://tailwindcss.com/docs/content-configuration#configuring-source-paths).
  (If you weren't around for the history of TailwindCSS, just know that these
  are both Good Things™.) The Tailwind
  [typography plugin](https://tailwindcss.com/docs/typography-plugin) is also
  included.
- Live browser reloading.
- ES6 modules and syntax, so this starter project is easy to extend and adapt as
  you see fit.
- **Bonus:** [Prettier](https://prettier.io/) is integrated and runs on every
  commmit using Husky and Pretty Quick. You can run it on all files at any time
  by using `npm run format`.
- **Bonus:** A GitHub Pages action is included that automatically builds and
  publishes your site each time you push to `main`. Don't use GitHub for
  development? You can remove the `.github` subdirectory.

## 🔠 Installation

1. Clone or fork this project.

1b. Optional: Edit the project name, contact information and URLs in
[`package.json`](package.json) to match your own.

2. Run `npm install`

3. Edit or remove the contents of the `.github` folder to match your workflow.

## 🚧 Development

`gulp` or `npm start`

After the site is built, your default web browser will open with the index file
and automatically reload whenever project files change.

## 🚚 Production

`gulp --prod` or `npm run prod`

Take a look at the [included GitHub action](.github/workflows/build.yml) to
automatically publish your project to GitHub Pages on every push. This own
project uses it to build [the GET page](https://rootwork.github.io/GET/) itself!

## 📂 File structure

- [`config.js`](config.js) contains path and project configuration -- edit this
  to suit your needs.
- [`tailwind.config.cjs`](tailwind.config.cjs) contains TailwindCSS
  configuration.
- `src` contains the files you'll be working with:
  - [`src/fonts`](src/fonts) contain local font files; note related
    configuration in `tailwind.config.cjs`.
  - [`src/img`](src/img) contains images which will be minified in builds.
  - [`src/js`](src/js) contains site scripts which will be minified, and
    contains subdirectories for drop-in library scripts and vendor scripts.
  - [`src/root`](src/root) contains files you want copied to the root of your
    build directory, like `robots.txt` or `CNAME`.
  - [`src/styles`](src/styles) contains Sass files that generate minified CSS.

Build processes will generate files in `dist`, which is ignored by git.

## ⚠️ Limitations

Responsive image generation and markup generation is designed for single-page
sites with a handful of images. The markup generation is just regex string
replacement, and images that have the same name but different formats will
clobber each other. In larger projects, a more efficient and robust templating
system would make much more sense -- for instance see how a Hugo theme I've
contributed to
[handles it](https://github.com/chipzoller/hugo-clarity/blob/master/layouts/partials/image-feature.html#L35-L71).

To omit GET's image and markup generation, set `modernImages` to `false` in
[`config.js`](config.js). Images will still be minified, but alternate formats
and markup will not be created.

## 📑 Built with

GET originally inspired by https://github.com/stefansdev/creativdepot and
https://github.com/lazymozek/gulp-with-tailwindcss

The big three components are, of course:

- https://github.com/gulpjs/gulp
- https://github.com/babel/babel
- https://github.com/tailwindlabs/tailwindcss

Other projects GET leverages:

- https://github.com/eslint/eslint
- https://github.com/typicode/husky
- https://github.com/prettier/prettier
- https://github.com/azz/pretty-quick
- https://github.com/Browsersync/browser-sync
- https://github.com/lovell/sharp
- https://github.com/khalyomede/gulp-sharp-responsive
- https://github.com/terser/terser
- https://github.com/sass/sass
- https://github.com/postcss/postcss
- https://github.com/postcss/autoprefixer
- https://github.com/gulp-sourcemaps/gulp-sourcemaps
- https://github.com/scniro/gulp-clean-css
- https://github.com/contra/gulp-concat
- https://github.com/jonschlinkert/gulp-htmlmin
- https://github.com/robrich/gulp-if
- https://github.com/lazd/gulp-replace
- https://github.com/yargs/yargs
- https://github.com/sindresorhus/log-symbols

**Thank you open source!**
