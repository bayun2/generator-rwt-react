'use strict';
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const express = require('express');
const gulp = require('gulp');
const del = require('del');
const objectAssign = require('object-assign');
const merge = require('lodash.merge');
const wpConfig = require('./webpack.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

gulp.task('clean', ['checkVersion'], cb => {
  del(['dist']).then(() => {
    cb();
  });
});

gulp.task('checkVersion', cb => {
  const cwd = process.cwd();
  let version;
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf-8'));
    version = pkg.version;
  } catch (e) {
    cb(e);
  }

  let exitCode = 0;
  try {
    execSync(`git ls-remote --exit-code --tags origin ${version}`, {
      cwd,
    });
  } catch (e) {
    exitCode = e.status;
  } finally {
    if (exitCode === 0) {
      cb('当前工程版本号已经被打成tag');
    } else if (exitCode !== 2) {
      cb('获取远程仓库tag失败, 或者还未建立远端对应git仓库');
    } else {
      cb();
    }
  }
});

gulp.task('build', ['clean'], () => {
  const config = merge(wpConfig, {
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),
      new ExtractTextPlugin('index.css'),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      })
    ],
    module: {
      preLoaders: [{
        test: /\.js?/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }]
    }
  });
  return gulp.src('./src/**/*.js')
    .pipe(gulpWebpack(config))
    .pipe(gulp.dest('dist'));
});

gulp.task('dev', cb => {
  const app = express();
  wpConfig.module.loaders[0] = {
    test: /\.js?/,
    loaders: ['react-hot', 'babel'],
    exclude: /node_modules/
  };
  const config = objectAssign({}, wpConfig, {
    devtool: 'eval',
    entry: {
      index: [
        'webpack-hot-middleware/client',
        './src/index.js'
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin('index.css'),
      new webpack.HotModuleReplacementPlugin()
    ]
  });
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
  app.use(express.static(__dirname));
  app.get('/pages/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
  });
  app.post('/data/:name', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', req.params.name));
  });
  app.listen(80, err => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log('Page is running at: http://local.forexmaster.cn/pages/index.html');
    }
    cb();
  });
});

gulp.task('default', ['build']);
