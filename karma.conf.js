'use strict';

// laod webpack config here for for webpack preprocessor
var webpackConfig = require('./webpack.config');
webpackConfig.cache = true;

// pass all essential scripts to istanbul for coverage 
webpackConfig.module.postLoaders = [{
  test: /\.js$/,
  exclude: /(_spec|vendor|node_modules)/,
  loader: 'istanbul-instrumenter'
}];


module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      // load all external dependencies here (refere to webpack config)
      // 'bower_components/jquery/jquery.min.js',
      'node_modules/angular/angular.js',
      // load all specs
      'tests/**/*.spec.js'
    ],

    preprocessors: {
      'tests/**/*.spec.js': ['webpack']
    },
    webpack: {
      resolve: webpackConfig.resolve,
      module: webpackConfig.module
    },

    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      subdir: function (browser) {
        return browser.toLowerCase().split(/[ /-]/)[0];
      },
      reporters: [
        {type: 'cobertura', file: 'cobertura.xml'},
        {type: 'text', file: 'text.txt'},
        {type: 'text-summary', file: 'text-summary.txt'},
        {type: 'html'},
        {type: 'lcov', file: 'lcov.info'}
      ]
    },
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: ['PhantomJS', 'Chrome', 'Firefox', 'Safari']
  });
};
