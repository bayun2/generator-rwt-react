'use strict';
const Generator = require('yeoman-generator');
const commandExists = require('command-exists').sync;
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('skip-install', {
      desc: 'Skips the message after the installation of dependencies',
      type: Boolean
    });
  }

  prompting() {
    const files = fs.readdirSync(process.cwd());
    if (files.length) {
      return console.log('Error: Current directory is not empty');
    }
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the amazing ' + chalk.red('generator-rwt-react') + ' generator!'
    ));

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
    return this.prompt(prompts).then(answers => {
      const features = answers.features;
      const hasFeature = feat => features && features.indexOf(feat) !== -1;
      this.answers = answers;
    });
  }

  writing() {
    this._writingGitignore();
    this._writingStaticFile();
  }
  _writingGitignore() {
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );
  }
  _writingStaticFile() {
    const DIRECTORIES = [
      'src',
      'data',
      'pages'
    ];
    const FILES = [
      '.babelrc',
      '.eslintrc',
      'LICENSE',
      'gulpfile.js',
      'webpack.config.js',
    ];
    const FILESTPL = [
      'deploy.js',
      'package.json',
      'HISTORY.md',
      'README.md',
    ];
    DIRECTORIES.forEach(dirname => this.fs.copy(this.templatePath(dirname), this.destinationPath(dirname)));
    FILES.forEach(filename => this.fs.copyTpl(this.templatePath(filename), this.destinationPath(filename)));
    FILESTPL.forEach(filename => this.fs.copyTpl(this.templatePath(filename), this.destinationPath(filename), this.answers));
  }

  install() {
    const hasYarn = commandExists('yarn');
    this.installDependencies({
      npm: !hasYarn,
      yarn: hasYarn,
      bower: false,
      skipMessage: this.options['skip-install-message'],
      skipInstall: this.options['skip-install']
    });
  }
};
