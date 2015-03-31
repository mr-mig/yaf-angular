'use strict';
var angular = require('angular-cjs');
var screenFactory = require('yaf').screen;
var createScreen = require('./create');

module.exports = function angularScreen(definition) {
  return screenFactory(definition, createScreen);
};
