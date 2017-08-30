const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

module.exports = {
  map: false,
  plugins: [
    autoprefixer(),
    cssnano({
      preset: 'default',
    }),
  ],
};
