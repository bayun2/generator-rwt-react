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
  let cmdRst = '';
  let cwd = process.cwd();
  try {
    cmdRst = execSync('git tag', {
      cwd: cwd,
      stdio: 'pipe'
    }).toString();
  } catch(e) {
    if (e.message.indexOf('Not a git repository') !== -1) {
      cb(`No git repository was found in ${cwd}`);
    }
  }
  let pkg;
  try {
    pkg = fs.readFileSync(path.join(cwd, 'package.json'), 'utf-8');
  } catch(e) {
    if (e.message.indexOf('ENOENT') !== -1)
     cb(`Can not find package.json in ${cwd}`);
  }
  try {
    pkg = JSON.parse(pkg);
  } catch (e) {
    cb(`Can not parse package.json in ${cwd}`);
  }
  let curVersion = pkg.version;
  if (cmdRst.split('\n').filter(v => !!v).indexOf('publish/' + curVersion) === -1) {
    cb()
  } else {
    cb('当前工程版本号已经被打成tag')
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
