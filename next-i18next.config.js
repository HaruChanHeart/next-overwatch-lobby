const path = require('path');

module.exports = {
  i18n: {
    locales: ['en', 'ko'],
    defaultLocale: 'en',
    localePath: path.resolve('./public/locales')
  },
}