const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const EslintFriendlyFormatter = require('eslint-friendly-formatter')

const fs = require('fs')
const path = require('path')

const APP_PATH = fs.realpathSync(process.cwd())
const resolve = relativePath => path.resolve(APP_PATH, relativePath)

const paths = {
  context: resolve('src'),
  application: resolve('src/index.tsx'),
  build: resolve('build'),
  html: resolve('src/index.html'),
}

const FILENAMES = {
  development: {
    application: 'assets/js/[name].js',
    chunkFilename: `assets/js/[name].js`,
    images: 'assets/images/[name].[ext]',
    fonts: 'assets/fonts/[name].[ext]',
    styles: 'assets/css/[name].css',
  },
  production: {
    application: 'assets/js/[name].[hash:8].js',
    chunkFilename: `assets/js/[name].[contenthash:8].js`,
    images: 'assets/images/[name].[hash:8].[ext]',
    fonts: 'assets/fonts/[name].[hash:8].[ext]',
    styles: 'assets/css/[name].[hash:8].css',
  },
}

let mode = 'development'

module.exports = (env, argv = {}) => {
  if (argv.mode) {
    mode = argv.mode // eslint-disable-line prefer-destructuring
    console.log('\nBuilding for\x1b[34m', mode, '\x1b[0m\n') // eslint-disable-line no-console
  }

  const filenames = FILENAMES[mode] || FILENAMES.development

  return {
    mode,
    context: paths.context,
    entry: {
      application: paths.application,
    },
    output: {
      path: paths.build,
      filename: filenames.application,
      publicPath: '/text-layout/',
      chunkFilename: filenames.chunkFilename,
    },
    resolve: {
      modules: ['node_modules', paths.context],
      extensions: ['*', '.tsx', '.ts', '.js', '.css'],
      alias: {
        src: path.resolve(__dirname, 'src/'),
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          exclude: /node_modules/,
          include: [paths.context],
          use: {
            loader: 'eslint-loader',
            options: {
              formatter: EslintFriendlyFormatter,
            },
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          include: [paths.context],
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(ts|tsx)?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
          include: [paths.context],
        },
        {
          test: /(min)?\.css$/,
          include: [paths.context],
          use: [
            mode === 'development'
              ? 'style-loader'
              : {
                  loader: MiniCssExtractPlugin.loader,
                },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: '[local]___[hash:base64:8]',
                },
                sourceMap: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: `${APP_PATH}/postcss.config.js`,
                },
              },
            },
          ],
        },
        {
          test: /\.(gif|png|jpg|jpeg|svg)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: filenames.images,
              },
            },
          ],
        },
        {
          test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: filenames.fonts,
              },
            },
          ],
        },
      ],
    },
    devServer: {
      bonjour: true,
      compress: true,
      hot: true,
      overlay: true,
      historyApiFallback: true,
      port: 3000,
    },
    optimization: {
      namedChunks: true,
      chunkIds: 'named',
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'async',
        name: true,
        cacheGroups: {
          default: {
            reuseExistingChunk: true,
          },
          libs: {
            test: /[\\/]node_modules[\\/]/,
            name: 'libs',
            chunks: 'all',
          },
        },
      },
    },
    devtool: mode === 'development' ? '#cheap-module-eval-source-map' : false,
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          DEVELOPMENT: mode === 'development',
          PATH_PREFIX: JSON.stringify(mode === 'development' ? '' : '/text-layout'),
          NODE_ENV: JSON.stringify(mode),
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: paths.html,
        inject: true,
      }),
      new MiniCssExtractPlugin({
        filename: filenames.styles,
        allChunks: true,
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new FriendlyErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ],
  }
}
