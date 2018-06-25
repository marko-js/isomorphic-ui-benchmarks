const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, 'components/App.vue'),
  target: 'node',
  output: {
    filename: 'App.server.js',
    path: path.resolve(__dirname, 'components'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [{ test: /\.vue$/, use: 'vue-loader' }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
}
