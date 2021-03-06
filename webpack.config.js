var path = require('path');

module.exports = {
  context: path.resolve('src/'),
  entry: ['./index'],
  output: {
    path: path.resolve('dist/'),
    publicPath: '/public/assets/',
    filename: 'proxify.js',
    library: 'proxify'
  },

  devServer: {
    contentBase: 'public',
    host: 'localhost',
    port: 8080
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js']
  }
};
