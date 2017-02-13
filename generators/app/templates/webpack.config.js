'use strict';
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    index: [
      './src/index.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  externals:{
    zepto:'Zepto',
    react:'React',
    'react-dom':'ReactDOM'
  },
  resolve: {
    modulesDirectories: ['node_modules', './src'],
    extensions: ['', '.js']
  },
  postcss: [require('autoprefixer')],
  module: {
    loaders: [{
      test: /\.js/,
      loaders: ['babel'],
      exclude: /node_modules/
    }, {
      test: /(index)\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
    }, {
      test: /\.less/,
      loaders: ['style', 'css', 'postcss', 'less'],
      exclude: /(index)\.less$/
    }, {
      test: /\.css$/,
      loaders: ['style', 'css', 'postcss']
    }, {
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      loaders: ['url?limit=8192']
    }]
  },
  plugins: []
};
