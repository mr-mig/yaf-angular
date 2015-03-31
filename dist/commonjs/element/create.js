"use strict";
var conv = require("yaf").conventions;
var tagReady = require("yaf/interfaces/common/tagReadyContext");
var getOptionsValues = require("yaf/utils/getOptionsValues");
var styleRef = require("yaf/utils/refCountStyles");
var injectorReady = require("yaf/interfaces/common/injectorReadyContext");
var templateReady = require("yaf/interfaces/common/templateReadyContext");
var extend = require("extend");

// use angular directive syntax to define element
module.exports = function elementDirectiveFactory(definition) {

  function directiveFactory(ElementState, channels) {

    // get all injected services
    var injectedCustomServices = Array.prototype.slice.call(arguments, 2);

    // todo mix options in?
    var angularDirectiveScope = {
      state: "=",
      channel: "@"
    };

    return {
      restrict: "E",
      template: definition.template,
      compile: function compile(tEl, tAttr) {
        if (!tAttr.state) {
          console.log("Warning! It seems you forgot to specify state attribute for '" + definition.name + "' element!");
        }

        return {
          pre: function pre(scope, el, attrs) {
            if (!scope.state) {
              scope.state = new ElementState();
            }
            var styles;

            if (definition.styles) {
              styles = styleRef.attachStyles(definition.name, definition.styles);
            }

            if (scope.channel) {
              var channelNames = scope.channel.split(" ");
              channelNames.forEach(function (channel) {
                channels.get(channel).linkWith(scope, scope.state);
              });
            }

            if (definition.styles) {
              scope.$on("$destroy", function () {
                styleRef.detachStyles(definition.name, styles);
              });
            }

            // collect the interpolated option values from attrs
            var opts = getOptionsValues(attrs);

            var readyContext = extend(tagReady(el, scope.state, opts), templateReady(scope), injectorReady(injectedCustomServices, definition.injectables));
            // call the ready with all tagReady and injectorReady fields
            definition.ready.apply(readyContext);
          },
          post: function post() {}
        };
      },
      scope: angularDirectiveScope
    };
  }

  var stateName = conv.names.state(definition.name);

  directiveFactory.$inject = [stateName, conv.globalNames.channels].concat(definition.injectables);

  definition.component = directiveFactory;
  return definition;
};
//# sourceMappingURL=create.js.map