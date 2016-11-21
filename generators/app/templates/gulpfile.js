'use strict';
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const open = require('open');
const express = require('express');
const gulp = require('gulp');
const del = require('del');
const env = require('gulp-env');
const request = require('request');
const objectAssign = require('object-assign');
const wpConfig = require('./webpack.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

gulp.task('clean', ['checkVersion'], (cb) => {
  del(['dist']).then(() => {
    cb();
  });
});

gulp.task('checkVersion', (cb) => {
  let cwd = process.cwd();
  let version;
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf-8'));
    version = pkg.version
  } catch (e) {
    cb(e);
  }

  let exitCode = 0;
  try {
    execSync(`git ls-remote --exit-code --tags origin ${version}`, {
      cwd: cwd,
    });
  } catch (e) {
    exitCode = e.status;
  } finally {
    if (exitCode === 0) {
      cb('当前工程版本号已经被打成tag');
    } else if (exitCode !== 2) {
      cb('获取远程仓库tag失败');
    } else {
      cb()
    }
  }
});

gulp.task('build', ['clean'], () => {
  let config = objectAssign({}, wpConfig, {
    devtool: 'source-map',
    plugins: [
      new ExtractTextPlugin('index.css'),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      })
    ]
  });
  return gulp.src('./src/**/*.js')
    .pipe(env.set({
      NODE_ENV: 'production'
    }))
    .pipe(gulpWebpack(config))
    .pipe(gulp.dest('dist'));
});

gulp.task('dev', cb => {
  env({
    NODE_ENV: 'development'
  });
  const app = express();
  let config = objectAssign({}, wpConfig, {
    devtool: 'cheap-module-source-map',
    plugins: [
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin('index.css')
    ]
  });
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(express.static(__dirname));
  app.listen(80, function(err) {
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
