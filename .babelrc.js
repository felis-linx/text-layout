const fs = require('fs')
const path = require('path')

const APP_PATH = fs.realpathSync(process.cwd())
const resolve = relativePath => path.resolve(APP_PATH, relativePath)

module.exports = api => {

  api.cache(() => process.env.NODE_ENV)

  return {
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      [
        'react-css-modules',
        {
          context: resolve('src'),
          exclude: '/node_modules/',
          webpackHotModuleReloading: true,
          generateScopedName: '[local]___[hash:base64:8]',
          attributeNames: {
            activeStyleName: 'activeClassName',
            overlayStyleName: 'overlayClassName'
          }
        },
      ],
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 3 versions', 'safari >= 9']
          },
          modules: false,
          debug: false,
        },
      ],
      '@babel/preset-react',
    ]
  }
}
