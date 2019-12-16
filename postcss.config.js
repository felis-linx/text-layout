const fs = require('fs')
const path = require('path')

const APP_PATH = fs.realpathSync(process.cwd())
const resolve = relativePath => path.resolve(APP_PATH, relativePath)

module.exports = {
  plugins: {
    'postcss-import': {
      path: resolve('src'),
    },
    'postcss-global-import': {},
    'postcss-nested': {},
    'postcss-cssnext': {
      browsers: ['last 2 versions', '> 5%'],
    },
  },
}
