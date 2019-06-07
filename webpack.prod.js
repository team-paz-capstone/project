const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'sourcemaps',
  entry: {
    main: ['./src/main/js/index.js']
  },
  output: {
    path: path.resolve(__dirname, './src/main/resources/static/built'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
};
