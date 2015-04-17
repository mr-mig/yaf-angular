System.register([], function (_export) {
  var angular, screenFactory, createScreen;
  return {
    setters: [],
    execute: function () {
      "use strict";
      angular = require("angular");
      screenFactory = require("yaf").screen;
      createScreen = require("./create");

      module.exports = function angularScreen(definition) {
        return screenFactory(definition, createScreen);
      };
    }
  };
});
//# sourceMappingURL=index.js.map