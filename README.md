# GET: Gulp, ES6, TailwindCSS

A starter project that GETs you up and running with Gulp (v4), ES6 modules, and
TailwindCSS (v3). Great as a kickstart template for trying out TailwindCSS, or
quickly generating simple sites or SPAs.

## Highlights

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
- [Prettier](https://prettier.io/) is integrated: It runs on every commmit using
  Husky and Pretty Quick, and you can run it on all files at any time by using
  `npm run format`.
- Bonus: A GitHub Pages action ready to go that automatically builds and
  publishes your site every time you push to `main`. (If you don't use GitHub
  for development, you can remove the `.github` subdirectory.)

## Installation

```sh
npm install
```

## Development

`gulp` or `npm start`

After the site is built, your default web browser will open with the index file
and automatically reload whenever project files change.

## Production

`gulp --prod` or `npm run prod`

Take a look at the [included GitHub action](.github/workflows/build.yml) to
automatically publish your project to GitHub Pages on every push. This own
project uses it to build [the GET page](https://rootwork.github.io/GET/) itself!

## File structure

- [`config.js`](config.js) contains general project configuration
- [`tailwind.config.cjs`](tailwind.config.cjs) contains TailwindCSS
  configuration
- `src` contains the files you'll be working with:
  - [`src/fonts`](src/fonts) contain local font files; note related
    configuration in `tailwind.config.cjs`
  - [`src/img`](src/img) contains images which will be minified in builds
  - [`src/js`](src/js) contains site scripts which will be minified, and
    contains subdirectories for drop-in library scripts and vendor scripts
  - [`src/root`](src/root) contains files you want copied to the root of your
    build directory, like `robots.txt` or `CNAME`
  - [`src/styles`](src/styles) contains Sass files that generate minified CSS

Build processes will generate files in `dist`.

`.gitignore` excludes the build folders, as well as the built CSS (i.e.
post-Sass, pre-Tailwind) in the `src` file. Modify as necessary for your
project.

## Notes

Responsive image generation works great. The responsive image _markup_
generation is just regex string replacement. In larger projects, a more robust
templating system would make much more sense, for instance see how a Hugo theme
I've contributed to
[handles it](https://github.com/chipzoller/hugo-clarity/blob/master/layouts/partials/image-feature.html#L35-L71).

Inspired by
[stefansdev/creativdepot](https://github.com/stefansdev/creativdepot) and
[lazymozek/gulp-with-tailwindcss](https://github.com/lazymozek/gulp-with-tailwindcss).
