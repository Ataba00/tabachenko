'use strict';
const path = require('path');
const webpack = require('webpack');

module.exports = {

  context: path.resolve(__dirname, './src'),

  entry: {
    bundle: './main.js',
  },

  output: {
    path: path.resolve(__dirname, './public/build'),
    publicPath: 'build/',
    filename: '[name].js',
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
  ],

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!autoprefixer-loader',
        exclude: [/node_modules/, /public/],
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!autoprefixer-loader!less',
        exclude: [/node_modules/, /public/],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
};
