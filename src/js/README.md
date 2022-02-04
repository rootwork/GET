Script files in this directory and its children will be compiled as follows:

1. Files in `lib` will be concatenated alphabetically into `js/scripts.js` in
   the build and minified.

2. The contents of `main.js` will be minified and appended to `js/scripts.js`.

3. Files in `vendor` will be minified but remain as separate files, e.g.
   `js/vendor/foo.js` here will be available in minified form at `js/foo.js` in
   the build.

To change this behavior, see the `scripts` task in `gulpfile.babel.js`.
