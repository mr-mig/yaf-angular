System.register([], function (_export) {
  var angular, screen, createScreen;
  return {
    setters: [],
    execute: function () {
      "use strict";
      angular = require("angular-cjs");
      screen = require("yaf").screen;
      createScreen = require("./create");

      module.exports = function angularScreen(definition) {
        return screen(definition, createScreen);
      };
    }
  };
});
//# sourceMappingURL=index.js.map