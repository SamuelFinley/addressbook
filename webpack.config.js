'use strict'

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devtool = 'source-map'

const devServer = {
  historyApiFallback: true
}

const entry = {
  main: [
    'babel-polyfill',
    './src/main'
  ],
  vendors: [
    'angular',
    'angular-animate',
    'angular-aria',
    'angular-material',
    'angular-messages',
    'angular-ui-router',
    'angular-material/angular-material.css'
  ]
}

const output = {
  filename: '[name].js',
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/'
}

const extensions = [
  '.js',
  '.css',
  '.html'
]

const modules = [
  'node_modules',
  'lib'
]

const loaders = [{
  test: /\.js$/,
  exclude: [/node_modules/],
  use: ['ng-annotate-loader', 'babel-loader']
}, {
  test: /\.css$/,
  use:
    ExtractTextPlugin.extract({
      loader: 'css-loader',
      fallbackLoader: 'style-loader'
    })
}, {
  test: /\.html$/,
  exclude: [/node_modules/],
  include: [/static/],
  use: ['html-loader']
}, {
  test: /\.html$/,
  exclude: [/node_modules/],
  include: [/src/],
  use: [
    'ngtemplate-loader',
    'html-loader'
  ]
}, {
  test: /\.(ico|png|eot|svg|ttf|woff|woff2)$/,
  use: 'url-loader?limit=10000'
}]

const plugins = [
  new ExtractTextPlugin('[name].css'),
  new HtmlWebpackPlugin({
    hash: true,
    inject: 'head',
    template: 'static/index.html'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity
  })
]

module.exports = {
  devtool,
  devServer,
  entry,
  output,
  resolve: {
    extensions,
    modules
  },
  module: {
    loaders
  },
  plugins
}
