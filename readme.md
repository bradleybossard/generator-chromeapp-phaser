# Chrome App generator [![Build Status](https://secure.travis-ci.org/yeoman/generator-chromeapp-phaser.svg?branch=master)](http://travis-ci.org/yeoman/generator-chromeapp-phaser)

Maintainer: [Bradley Bossard](https://github.com/bradleybossard)

> Chrome Apps using Phaser boilerplate generator that creates everything you need to get started with development.  To test, go to: chrome://extensions, enable Developer mode and load `app` as an unpacked extension.

## Notes
The idea is combine a Chrome App generator with a Phaser generator, like generator-phaser, which parses out the different pieces of the Phaser framework into seperate .js files.  Another caveat is Chrome apps have loosened restrictions on using the file:// protocol, and therefore we don''t need to run a NodeJS server.

## Getting Started

- First make a new directory, and `cd` into it: mkdir my-new-chromeapp-phaser && cd $_
- Install the generator: `npm install -g generator-chromeapp-phaser`
- Run: `yo chromeapp-phaser`

## Generators

Available generators:

* [chromeapp-phaser](#app) (aka [chromeapp-phaser:app](#app))
* [chromeapp-phaser:permission](#permission)
* [chromeapp-phaser:samples](#samples)

### App
Sets up a new Chrome App complete with Phaser and a set of state objects (Preloader, Boot, Gameover, Menu, Play)

Example: 
```bash
yo chromeapp-phaser
```

### Permission
Create manifest.json or append permission into manifest.json. You can choose permission to put into manifest.json

Example: 
```bash
yo chromeapp-phaser:permmision
```

## Build

Creates a production build, production files to zip file. You can publish zip file to Chrome Web Store. 

Examples:
```bash
grunt build
```

## Debug

Support two preview mode. LiveReload/run/debug your Chrome App on Chrome browser and Chrome app container.

* `grunt debug` - Default, run you Chrome App on Chrome app container

![](http://i.imgur.com/DGxbvBY.gif)

* `grunt debug:server` - Run you Chrome App on Chrome browser like 'serve' task of webapp.

![](http://recordit.co/8wefRz0m0I.gif)

## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.

* `--test-framework=[framework]`

  Defaults to `mocha`. Can be switched for
  another supported testing framework like `jasmine`.

* `--skip-pull`
  
  Skips to `pull` command of `git` to check the [google-chrome-app samples](https://github.com/GoogleChrome/chrome-app-samples) on github repository

* `--coffee`

## Future Work

Currently, there isn't any support for resizing the Phaser canvas or fullscreen.


## Contribute

Create an issue and let me know if you want to help.  I'm kind of a Github idiot and don't know much about pull requests, so I might need some handholding.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
