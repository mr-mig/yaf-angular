System.register([], function (_export) {
  var angular, link, createLink, result;
  return {
    setters: [],
    execute: function () {
      "use strict";
      angular = require("angular");
      link = require("yaf").link;
      createLink = require("./create");
      result = link(createLink);

      module.exports = angular.module(result.moduleName, []).value(result.entityName, result.factoryFn);
    }
  };
});
//# sourceMappingURL=index.js.map