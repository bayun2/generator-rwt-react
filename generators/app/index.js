'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
  },
  prompting: function () {
    const files = fs.readdirSync(process.cwd());
    if (files.length) {
      return console.log('Error: Current directory is not empty');
    }
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the amazing ' + chalk.red('generator-rwt-react') + ' generator!'
    ));

    var DIRECTORIES = ['src', 'test', 'data', 'pages'];
    var FILES = [
      '.babelrc',
      '.eslintrc',
      'LICENSE',
      'package.json',
      'README.md',
      'HISTORY.md',
      'gulpfile.js',
      'webpack.config.js',
      'deploy.js'
    ];

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Name',
      default: this.appname
    }, {
      type: 'input',
      name: 'version',
      message: 'Version',
      default: '1.0.0'
    }, {
      type: 'input',
      name: 'author',
      message: 'Author',
      default: 'Your Github name'
    }, {
      type: 'input',
      name: 'description',
      message: 'Description',
      default: '...'
    }];
    this.prompt(prompts, function (props) {
      this.props = props;
      DIRECTORIES.forEach(val => this.directory(val, val));
      this.template('gitignore', '.gitignore');
      FILES.forEach(filename => this.template(filename, filename, props));
      done();
    }.bind(this));
  },

  install: function () {
    this.installDependencies();
  }
});
