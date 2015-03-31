'use strict';
var angular = require('angular-cjs');
var channel = require('yaf').channel;
var createChannel = require('./create');

var result = channel(createChannel);

module.exports = angular.module(result.moduleName, [])
  .provider(result.entityName, result.factoryFn);
