'use strict';
var angular = require('angular-cjs');
var styleRef = require('yaf/utils/refCountStyles');
var compositeReady = require('yaf/interfaces/common/compositeReadyContext');
var linkInterface = require('yaf/interfaces/behavioural/link');
var channelsInterface = require('yaf/interfaces/behavioural/channel');
var injectorReady = require('yaf/interfaces/common/injectorReadyContext');
var templateReady = require('yaf/interfaces/common/templateReadyContext');
var extend = require('extend');

module.exports = function createScreen(definition) {
  var module = angular.module(definition.moduleName, definition.moduleDependencies);

  var registerRoutes = function ($routeProvider, channelsProvider) {
    $routeProvider
      .when(definition.route, {
        template: definition.template,
        controller: controller
      });

    channelsProvider.createChannels(definition.channels);
  };

  var controller = function ($scope, channels, link) {
    var injectedCustomServices = Array.prototype.slice.call(arguments, 3);

    var styles;
    if (definition.styles) {
      styles = styleRef.attachStyles(definition.name, definition.styles);
    }

    $scope.$on('$destroy', function () {
      styleRef.detachStyles(definition.name, styles);
    });

    var readyContext = extend(
      templateReady($scope),
      injectorReady(injectedCustomServices, definition.injectables),
      compositeReady(link, channels)
    );

    definition.ready.apply(readyContext);
  };

  controller.$inject = [
    '$scope',
    channelsInterface().entityName,
    linkInterface().entityName
  ].concat(definition.injectables);

  registerRoutes.$inject = ['$routeProvider', 'channelsProvider'];

  return module.config(registerRoutes);
};
