const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'sourcemaps',
  entry: {
    main: './src/main/js/index.js'
  },
  // output the bundle.js to dev-server folder
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dev-server'),
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
  // Use proxy to map /api, /users, and /offices endpoints from spring boot backend
  devServer: {
    contentBase: 'dev-server',
    port: 3000,
    historyApiFallback: true,
    hot: true,
    inline: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080/',
        secure: false
      },
      '/src/main/resources/static/css/main.css': {
        target: 'http://localhost:8080/css/main.css',
        secure: false
      },
      '/users': {
        target: 'http://localhost:8080/',
        secure: false
      },
      '/offices': {
        target: 'http://localhost:8080/',
        secure: false
      }
    }
  },
  // use the index.html as template to generate a temp html in dev-server folder
  plugins: [
    new HtmlWebpackPlugin({
      template: './dev-server-template/index.html'
    })
  ],
  // A patch to ensure all features of newer react-dom can be hot reloaded
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
};
