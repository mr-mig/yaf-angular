System.register([], function (_export) {
  var angular, styleRef, compositeReady, linkInterface, channelsInterface, injectorReady, templateReady, extend;
  return {
    setters: [],
    execute: function () {
      "use strict";
      angular = require("angular-cjs");
      styleRef = require("yaf/utils/refCountStyles");
      compositeReady = require("yaf/interfaces/common/compositeReadyContext");
      linkInterface = require("yaf/interfaces/behavioural/link");
      channelsInterface = require("yaf/interfaces/behavioural/channel");
      injectorReady = require("yaf/interfaces/common/injectorReadyContext");
      templateReady = require("yaf/interfaces/common/templateReadyContext");
      extend = require("extend");

      module.exports = function createScreen(definition) {
        var module = angular.module(definition.moduleName, definition.moduleDependencies);

        var registerRoutes = function registerRoutes($routeProvider, channelsProvider) {
          $routeProvider.when(definition.route, {
            template: definition.template,
            controller: controller
          });

          channelsProvider.createChannels(definition.channels);
        };

        var controller = function controller($scope, channels, link) {
          var injectedCustomServices = Array.prototype.slice.call(arguments, 3);

          var styles;
          if (definition.styles) {
            styles = styleRef.attachStyles(definition.name, definition.styles);
          }

          $scope.$on("$destroy", function () {
            styleRef.detachStyles(definition.name, styles);
          });

          var readyContext = extend(templateReady($scope), injectorReady(injectedCustomServices, definition.injectables), compositeReady(link, channels));

          definition.ready.apply(readyContext);
        };

        controller.$inject = ["$scope", channelsInterface().entityName, linkInterface().entityName].concat(definition.injectables);

        registerRoutes.$inject = ["$routeProvider", "channelsProvider"];

        return module.config(registerRoutes);
      };
    }
  };
});
//# sourceMappingURL=create.js.map