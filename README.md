# GET: Gulp, ES6, TailwindCSS

A starter project that GETs you up and running with Gulp, ES6 modules, and
TailwindCSS.

The gulp portion uses modern v4 syntax, and includes:

- Sass compilation (in SCSS format, so you can use CSS directly if you prefer)
  with autoprefixing and CSS purging
- Responsive image file and markup generation (`<picture>` sets with `webp` and
  `avif` formats), automatically
- HTML and Javascript minification
- Live browser reloading

Tailwind with ES6 modules means this starter project is easy to extend and adapt
as you see fit. [Prettier](https://prettier.io/) is integrated: It runs on every
commmit using Husky and Pretty Quick, and you can run it on all files at any
time by using `npm run format`.

## Installation

```sh
npm install
```

## Build processes

**Development:**

`gulp` or `npm start`

**Production:**

`gulp --prod` or `npm run prod`

## File structure

- `config.js` contains general project configuration
- `tailwind.config.js` contains TailwindCSS configuration
- `src` are the files you'll be working with:
  - `src/fonts` contain local font files; note related configuration in
    `tailwind.config.cjs`
  - `src/img` contains images which will be minified in builds
  - `src/js` contains site scripts which will be minified, and contains
    subdirectories for drop-in library scripts and vendor scripts
  - `src/root` contains files you want copied to the root of your build
    directory, like `robots.txt` or `CNAME`
  - `src/styles` contains Sass files that generate minified CSS

Build processes will generate files in `dist`.

`.gitignore` excludes the build folders, as well as the built CSS (i.e.
post-Sass, pre-Tailwind) in the `src` file. Modify as necessary for your
project.

## Notes

The responsive image _markup_ generation is just regex string replacement. In
larger projects, a more robust templating system would make much more sense, for
instance see how a Hugo theme I've contributed to
[handles it](https://github.com/chipzoller/hugo-clarity/blob/master/layouts/partials/image-feature.html#L35-L71).

Inspired by
[stefansdev/creativdepot](https://github.com/stefansdev/creativdepot) and
[lazymozek/gulp-with-tailwindcss](https://github.com/lazymozek/gulp-with-tailwindcss).
