'use strict';
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    index: [
      './src/index.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/',
    chunkFilename: '[chunkhash].js'
  },
  externals:{
    zepto:'Zepto',
    react:'React',
    'react-dom':'ReactDOM'
  },
  resolve: {
    modules: ['node_modules', './src'],
  },
  module: {
    rules: [{
      test: /\.js/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(less|css)$/,
      use: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              minimize: production,
              modules: true,
              localIdentName: '[name]__[local]-[hash:base64:5]',
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      })
    },{
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      use: ['url?limit=8192']
    }]
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
  ]
};
