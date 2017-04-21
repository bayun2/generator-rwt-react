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
const bodyParser = require('body-parser');
const fs = require('fs');

gulp.task('clean', ['checkVersion'], cb => {
  del(['dist']).then(() => cb());
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
  wpConfig.plugins.push(
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
  wpConfig.devtool = 'eval';
  Object.keys(wpConfig.entry).forEach(k => wpConfig.entry[k].unshift(
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?http://localhost:80',
    'webpack/hot/only-dev-server'
  ));
  wpConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  )
  const compiler = webpack(wpConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: wpConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
  app.use(express.static(__dirname));
  app.get('/pages/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
  });
  app.post('/data/:name', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', req.params.name));
  });

  // mock 数据
  app.use(bodyParser.json());
  let router = express.Router();
  app.use((req, res, next) => router(req, res, next));
  function setRouter() {
    router = express.Router();
    fs.readdirSync(path.join(__dirname, './data')).forEach(filename => {
      const p = path.join(__dirname, './data', filename);
      require(path.join(__dirname, './data', filename))(router, require('faker'));
    })
  }
  setRouter();
  // 热更新data
  fs.watch(path.join(__dirname, './data'), (eventType, filename) => {
    try {
      const p = path.join(__dirname, './data', filename);
      cleanCache(p);
      setRouter();
    } catch (ex) {
      console.error('module update failed:', ex);
    }
  });

  app.listen(80, err => {
    if (err) return console.log(err);
    console.log('Page is running at: http://local.forexmaster.cn/pages/index.html');
    cb();
  });
});

function cleanCache(modulePath) {
  const path = require.resolve(modulePath);
  let module = require.cache[path];
  if (module && module.parent) {
      module.parent.children.splice(module.parent.children.indexOf(module), 1);
  }
  require.cache[path] = null;
}

gulp.task('default', ['build']);
