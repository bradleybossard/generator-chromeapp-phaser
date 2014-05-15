var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var manifest = require('../manifest');
var chalk = require('chalk');

var ChromeAppGenerator = module.exports = function ChromeAppGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // set source root path to templates
  this.sourceRoot(path.join(__dirname, 'templates'));

  // create a default manifest
  this.manifest = new manifest({
    'icons': {
      '16': 'images/icon-16.png',
      '128': 'images/icon-128.png'
    },
    'app': {
      'background': {
        'scripts': [
          'scripts/main.js',
          'scripts/chromereload.js'
        ]
      }
    }
  });

  // setup the test-framework property, Gruntfile template will need this
  this.testFramework = options['test-framework'] || 'mocha';
  this.coffee = options.coffee;
  this.compass = options.compass;

  // add more permissions
  this.hookFor('chromeapp-phaser:permission', { as: 'subgen' });

  // for hooks to resolve on mocha by default
  options['test-framework'] = this.testFramework;

  // resolved to mocha by default (could be switched to jasmine for instance)
  this.hookFor('test-framework', {
    as: 'app',
    options: {
      options: {
        'skip-install': options['skip-install-message'],
        'skip-message': options['skip-install']
      }
    }
  });

  this.options = options;

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ChromeAppGenerator, yeoman.generators.Base);

ChromeAppGenerator.prototype.askFor = function askFor(argument) {
  var cb = this.async();

  this.log(chalk.magenta('... Chrome Apps with Phaser ...'));

  var prompts = [{
    name: 'appName',
    message: 'What would you like to call this application?',
    default:  (this.appname) ? this.appname : 'phaserChromeApp'
  },{
    name: 'appDescription',
    message: 'How would you like to describe this application?',
    default: 'Phaser Chrome App'
  },{
    name: 'phaserVersion',
    message: 'Which Phaser version would you like to use?',
    default: '2.0.2'
  },
  {
    name: 'gameWidth',
    message: 'Game Display Width',
    default: 900
  },
  {
    name: 'gameHeight',
    message: 'Game Display Height',
    default: 700
  }];

  this.prompt(prompts, function(answers) {
    this.appName = answers.appName;
    this.appDescription = answers.appDescription;
    this.phaserVersion = answers.phaserVersion;
    this.gameHeight = answers.gameHeight;
    this.gameWidth = answers.gameWidth;

    cb();
  }.bind(this));
};

ChromeAppGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

ChromeAppGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

ChromeAppGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

ChromeAppGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.template('_bower.json', 'bower.json');
};

ChromeAppGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

ChromeAppGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

ChromeAppGenerator.prototype.mainStylesheet = function mainStylesheet() {
  this.copy('styles/main.css', 'app/styles/main.css');
};

ChromeAppGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/bower_components');
  this.mkdir('app/styles');
  this.directory('images', 'app/images');
  this.mkdir('app/scripts');
  this.copy('scripts/chromereload.js', 'app/scripts/chromereload.js');
  this.copy('scripts/phaser-override.js', 'app/scripts/phaser-override.js');

  this.mkdir('app/scripts/states');
  this.copy('scripts/states/boot.js', 'app/scripts/states/boot.js');
  this.copy('scripts/states/preload.js', 'app/scripts/states/preload.js');
  this.copy('scripts/states/menu.js', 'app/scripts/states/menu.js');
  this.copy('scripts/states/play.js', 'app/scripts/states/play.js');
  this.copy('scripts/states/gameover.js', 'app/scripts/states/gameover.js');
  // TODO(bradleybossard): Change filename to _filename
  this.template('scripts/main.js', 'app/scripts/main.js');

  this.template('_locales/en/messages.json', 'app/_locales/en/messages.json', this);
  this.write('app/manifest.json', this.manifest.stringify());
};

ChromeAppGenerator.prototype.bootstrapGame = function bootstrapGame() {
  var stateFiles = this.expand('app/scripts/states/*.js');

  this.gameStates = [];
  var statePattern = new RegExp(/(\w+).js$/);
  stateFiles.forEach(function(file) {
    var state = file.match(statePattern)[1];
    if (!!state) {
      this.gameStates.push({shortName: state, stateName: this._.capitalize(state)});
    }
  }, this);

  // TODO(bradleybossard): Change filename to _filename
  this.template('scripts/index.js', 'app/scripts/index.js');
  // TODO(bradleybossard): Change filename to _filename
  this.template('index.html', 'app/index.html');
};

ChromeAppGenerator.prototype.install = function () {
  if (this.options['skip-install']) {
    return;
  }

  var done = this.async();
  this.installDependencies({
    skipMessage: this.options['skip-install-message'],
    skipInstall: this.options['skip-install'],
    callback: done
  });
};
