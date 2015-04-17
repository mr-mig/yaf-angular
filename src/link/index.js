'use strict';
var angular = require('angular');
var link = require('yaf').link;
var createLink = require('./create');

var result = link(createLink);

module.exports = angular.module(result.moduleName, [])
  .value(result.entityName, result.factoryFn);
