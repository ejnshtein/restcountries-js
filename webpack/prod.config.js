/* eslint-disable no-undef */
const path = require('path')

module.exports = {
  mode: 'production',

  entry: {
    restcountries: './api.js'
  },

  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].min.js',
    library: '[name]',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    publicPath: '/'
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.scss']
  },

  module: {
    strictExportPresence: true
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
