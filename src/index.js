'use strict';

var angular = require('angular-cjs');

module.exports = {
  element: require('./element/index'),
  composite: require('./composite/index'),
  screen: require('./screen/index'),
  state: require('./state/index'),
  // angular-specific
  module: angular.module('yaf-angular', [
    require('./link/index').name,
    require('./channel/index').name
  ])
};
