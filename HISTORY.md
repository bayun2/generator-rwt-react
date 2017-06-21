# 0.3.0
## npm包升级
+ yeoman-generator 0.22 ---1.1.1 (支持yarn，版本改动比较大，移除了一些常用方法)
  https://github.com/yeoman/generator/releases
+ webpack  2.4.1---3.0.0  (打包Scope Hoisting，生产文件js效率提高)
  https://github.com/webpack/webpack/releases
+ postcss  5.2.17---6.0.2
  https://github.com/postcss/postcss/blob/master/CHANGELOG.md
+ postcss-loader  1.3.3---2.0.6  
  https://www.npmjs.com/package/postcss-loader
+ autoprefixer   6.3.1----7.1.1       
  提升一些样式（包括transiton以及flex常用属性）的兼容性,支持postcss6.0.0+
  https://github.com/postcss/autoprefixer/blob/master/CHANGELOG.md  
+ extract-text-webpack-plugin  2.1.0----2.1.2    (修复issue中的bug)
  https://github.com/webpack-contrib/extract-text-webpack-plugin/releases
+ css-loader  0.28.0 --- 0.28.4
  https://github.com/webpack-contrib/css-loader/releases
+ eslint    3.10.2----4.0.0  (一些规则的fix, 废弃顶层规则ecmaFeatures)
  https://github.com/eslint/eslint/releases
+ eslint-loader  1.7.1---1.8.0    support for eslint@^4.0.0
  https://github.com/MoOx/eslint-loader/releases  
+ eslint-plugin-react   4.1.0 --- 7.1.0   (有一个规则废弃)
  https://github.com/yannickcr/eslint-plugin-react/releases
+ babel-core 6.4.5----6.25.0
  https://github.com/babel/babel/releases
+ babel-loader 6.4.1 ---- 7.1.0  Update to support webpack 3
  https://github.com/babel/babel-loader/releases
## 脚手架支持yarn安装npm包依赖，提升install速度
## 引入 webpack-dashboard 执行build 后分析打包模块组成及大小
## 修复语法报错

# 0.2.3
补回debug功能

# 0.2.2
提示文案动态变化

# 0.2.1
部署脚本支持蜂投构建

# 0.2.0
增加部署脚本

# 0.1.2
webpack配置优化

# 0.1.1
webpack升到2

# 0.1.0
* 增加css module

# 0.0.9
* 修复build：pre-eslint正则匹配的bug

# 0.0.7

* 修改eslint规则
* 增加npm run debug命令用来生成可连接远程调试的本地资源
* 页面主入口增加针对不同环境的接口path配置
* 增加build时eslint效验
