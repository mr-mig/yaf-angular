define(["exports"], function (exports) {
  "use strict";
  var angular = require("angular");
  var channel = require("yaf").channel;
  var createChannel = require("./create");

  var result = channel(createChannel);

  module.exports = angular.module(result.moduleName, []).provider(result.entityName, result.factoryFn);
});
//# sourceMappingURL=index.js.map