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
const path = require('path');

gulp.task('clean', ['checkVersion'], cb => {
  del(['dist']).then(() => {
    cb();
  });
});

gulp.task('checkVersion', cb => {
  const cwd = process.cwd();
  const version = process.env.npm_package_version;

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

gulp.task('build', ['clean'],() => {
  wpConfig.devtool = 'source-map'
  wpConfig.module.rules.push({
    test: /\.js/,
    loader: 'eslint-loader',
    enforce: 'pre',
    exclude: /node_modules/
  })
  wpConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  )
  return gulp.src('./src/**/*.js')
    .pipe(gulpWebpack(wpConfig, webpack))
    .pipe(gulp.dest('dist'));
});

gulp.task('dev', cb => {
  const app = express();
  const config = objectAssign({}, wpConfig, {
    devtool: 'eval',
    entry: {
      index: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?http://localhost:80',
        'webpack/hot/only-dev-server',
        './src/index.js'
      ]
    }
  });
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  )
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
  require('./data/data.js')(app);
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
