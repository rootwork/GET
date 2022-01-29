# GET: Gulp, ES6, TailwindCSS

A starter project that GETs you up and running with Gulp, ES6 modules, and TailwindCSS.

The gulp portion uses modern v4 syntax, and includes:

- Sass compilation (in SCSS format, so you can use CSS directly if you prefer) with autoprefixing and CSS purging
- Responsive image file and markup generation (`<picture>` sets with `webp` and `avif` formats), automatically
- HTML and Javascript minification
- Live browser reloading

Tailwind with ES6 modules means this starter project is easy to extend and adapt as you see fit.

Linting also happens on every commit thanks to [Prettier](https://prettier.io/) and [modern-node](https://github.com/sheerun/modern-node).

## Installation

```sh
npm install
```

## Build processes

**Development:**

`gulp` or `npm start`

**Production:**

`gulp prod` or `npm run prod`

## File structure

- `config.js` contains general project configuration
- `tailwind.config.js` contains TailwindCSS configuration
- `src` and subdirectories contain the source HTML, (S)CSS, JS and images
- Build processes will generate files in `dist` (dev) and `build` (prod)

`.gitignore` excludes the `dist` (dev) and `build` (prod) folders, as well as the built CSS (i.e. post-Sass, pre-Tailwind) in the `src` file. Modify as necessary for your project.

## Notes

The responsive image _markup_ generation is just regex string replacement. In larger projects, a more robust templating system would make much more sense, for instance see how a Hugo theme I've contributed to [handles it](https://github.com/chipzoller/hugo-clarity/blob/master/layouts/partials/image-feature.html#L35-L71).

Originally forked from [lazymozek/gulp-with-tailwindcss](https://github.com/lazymozek/gulp-with-tailwindcss).
