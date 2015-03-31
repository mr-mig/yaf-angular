System.register([], function (_export) {
  var angular, channel, createChannel, result;
  return {
    setters: [],
    execute: function () {
      "use strict";
      angular = require("angular-cjs");
      channel = require("yaf").channel;
      createChannel = require("./create");
      result = channel(createChannel);

      module.exports = angular.module(result.moduleName, []).provider(result.entityName, result.factoryFn);
    }
  };
});
//# sourceMappingURL=index.js.map