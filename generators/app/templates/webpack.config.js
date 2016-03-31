'use strict';
const path = require('path');
const webpack = require('webpack');
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
    'zepto':'Zepto',
    'flipsnap':'Flipsnap'
  },
  resolve: {
    modulesDirectories: ['node_modules', './src'],
    extensions: ['', '.js']
  },
  postcss: [require('autoprefixer')],
  module: {
    loaders: [{
      test: /\.js?/,
      loaders: ['babel']
    }, {
      test: /(index|reset)\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
    }, {
      test: /\.less/,
      loaders: ['style', 'css', 'postcss', 'less'],
      exclude: /(index|reset)\.less$/
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
