module.exports = {
  src: {
    root: './source/',
    html: './source/views/',
    scss: './source/scss/style.scss',
    js: './source/js/**/*',
    img: './source/img/**/*',
    helpers: './gulp/helpers/'
  },
  dest: {
    root: './markup/',
    css: './markupcss/',
    img: './markupimg/',
    js: './markupjs/',
    fonts: './fonts/'
  },
  watch: {
    html: './source/views/{layouts,partials,helpers,data}/**/*',
    scss: './source/scss/**/*',
    js: './source/js/**/*.js',
    img: './source/img/**/*',
    root: './markup/',
  }
};
