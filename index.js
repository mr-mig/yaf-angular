'use strict';

var angular = require('angular-cjs');

module.exports = {
  element: require('./lib/element'),
  composite: require('./lib/composite'),
  screen: require('./lib/screen'),
  state: require('./lib/state'),
  // angular-specific
  module: angular.module('yaf-angular', [
    require('./lib/link').name,
    require('./lib/channel').name
  ])
};
