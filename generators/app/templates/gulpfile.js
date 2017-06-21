'use strict';
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const express = require('express');
const gulp = require('gulp');
const del = require('del');
const wpConfig = require('./webpack.config.js');
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
  wpConfig.devtool = 'source-map';
  wpConfig.plugins.push(
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
        reduce_vars: true,
      }
    })
  );
  return gulp.src('./src/**/*.js')
    .pipe(gulpWebpack(wpConfig, webpack))
    .pipe(gulp.dest('dist'));
});

gulp.task('dev', cb => {
  const app = express();
  const port = 8000;
  wpConfig.devtool = 'eval';
  Object.keys(wpConfig.entry).forEach(k => wpConfig.entry[k].unshift(
    'react-hot-loader/patch',
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
    'webpack/hot/only-dev-server'
  ));
  wpConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  );
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
  const router = new express.Router();
  app.use((req, res, next) => router(req, res, next));
  function setRouter() {
    fs.readdirSync(path.join(__dirname, './data')).forEach(filename => {
      require(path.join(__dirname, './data', filename))(router, require('faker'));
    });
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

  app.listen(port, err => {
    if (err) return console.log(err);
    console.log(`Page is running at: http://localhost:${port}/pages/index.html`);
    cb();
  });
});

function cleanCache(modulePath) {
  const path = require.resolve(modulePath);
  const module = require.cache[path];
  if (module && module.parent) {
    module.parent.children.splice(module.parent.children.indexOf(module), 1);
  }
  require.cache[path] = null;
}

gulp.task('default', ['build']);
