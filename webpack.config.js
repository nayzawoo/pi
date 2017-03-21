const path = require('path')
const webpack = require('webpack')

const config = {
  entry: {
    app: './src/app.js',
    app_chart: './src/app_chart.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {test: /\.js$/, use: 'babel-loader'}
    ]
  },
  plugins: [
  ]
}

module.exports = config;