'use strict';

var angular = require('angular-cjs');

module.exports = {
  element: require('./src/element'),
  composite: require('./src/composite'),
  screen: require('./src/screen'),
  state: require('./src/state'),
  // angular-specific
  module: angular.module('yaf-angular', [
    require('./src/link').name,
    require('./src/channel').name
  ])
};
