System.register([], function (_export) {
  var angular, state, stateFactory;
  return {
    setters: [],
    execute: function () {
      "use strict";
      angular = require("angular-cjs");
      state = require("yaf").state;
      stateFactory = require("./create");

      // register the state object in angular DI container
      module.exports = function angularState(definition) {
        var result = state(definition, stateFactory);

        // try to get the module first
        // this is the case when state is created for a structure entity like element
        try {
          angular.module(definition.moduleName);
        } catch (e) {
          angular.module(definition.moduleName, definition.moduleDependencies);
        }

        return angular.module(definition.moduleName).factory(result.entityName, result.factoryFn);
      };
    }
  };
});
//# sourceMappingURL=index.js.map