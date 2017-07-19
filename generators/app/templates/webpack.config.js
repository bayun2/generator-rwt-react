'use strict';
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const production = process.env.NODE_ENV === 'production';
const development = process.env.NODE_ENV === 'development';
const DashboardPlugin = require('webpack-dashboard/plugin');
const baseCssLoader = [
  {
    loader: 'css-loader',
    options: {
      minimize: production,
      modules: true,
      localIdentName: '[name]__[local]-[hash:base64:5]'
    }
  }, {
    loader: 'postcss-loader',
    options: {
      plugins: [require('autoprefixer')]
    }
  }, {
    loader: 'less-loader'
  }
];
const basePlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      basename: JSON.stringify(!development ? '/online-address' : '/pages/index.html')
    }
  }),
  new webpack.optimize.ModuleConcatenationPlugin()
];
const pubCssLoader = ExtractTextPlugin.extract({fallback: 'style-loader', use: baseCssLoader});
if (production) {
  basePlugins.push(
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({
    // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true
      }
    }),
    new DashboardPlugin());
} else {
  baseCssLoader.unshift('style-loader');
  basePlugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  );
}

module.exports = {
  entry: {
    index: [
      'es6-promise/auto',
      'isomorphic-fetch',
      './src/index.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/',
    chunkFilename: '[chunkhash].js'
  },
  externals: {
    zepto: 'Zepto',
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  resolve: {
    modules: ['node_modules', './src']
  },
  devtool: production ? 'cheap-module-source-map' : 'eval',
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/
      }, {
        test: /\.js/,
        loader: 'babel-loader?cacheDirectory',
        exclude: /node_modules/
      }, {
        test: /\.(less|css)$/,
        use: production ? pubCssLoader : baseCssLoader
      }, {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: ['url-loader?limit=8192']
      }
    ]
  },
  plugins: basePlugins
};
