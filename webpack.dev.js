/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080',
      '/media': 'http://localhost:8080'
    }
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
});
