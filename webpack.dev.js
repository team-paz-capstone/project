const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'sourcemaps',
  entry: {
    main: './src/main/js/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '/dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          plugins: ['react-hot-loader/babel'],
          cacheDirectory: true
        }
      }
    ]
  },
  devServer: {
    contentBase: 'dist',
    watchContentBase: true,
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '**': {
        target: 'http://localhost:8080/',
        secure: false
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
