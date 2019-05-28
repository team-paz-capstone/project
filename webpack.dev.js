const path = require('path');

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
};
