System.register([], function (_export) {
  var conv, extend, tagReady, compositeReady, getOptionsValues, linkInterface, channelsInterface, attachStyles, detachStyles, injectorReady, templateReady;
  return {
    setters: [],
    execute: function () {
      "use strict";
      conv = require("yaf").conventions;
      extend = require("extend");
      tagReady = require("yaf/interfaces/common/tagReadyContext");
      compositeReady = require("yaf/interfaces/common/compositeReadyContext");
      getOptionsValues = require("yaf/utils/getOptionsValues");
      linkInterface = require("yaf/interfaces/behavioural/link");
      channelsInterface = require("yaf/interfaces/behavioural/channel");
      attachStyles = require("yaf/utils/attachStyles");
      detachStyles = require("yaf/utils/detachStyles");
      injectorReady = require("yaf/interfaces/common/injectorReadyContext");
      templateReady = require("yaf/interfaces/common/templateReadyContext");

      module.exports = function compositeDirectiveFactory(definition, state) {

        function directiveFactory(CompositeState, channels, linkFn) {

          // get all injected services
          var injectedCustomServices = Array.prototype.slice.call(arguments, 3);

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
                    scope.state = new CompositeState();
                  }

                  var styles;
                  if (definition.styles) {
                    styles = attachStyles(definition.styles);
                  }

                  if (scope.channel) {
                    var channelNames = scope.channel.split(" ");
                    channelNames.forEach(function (channel) {
                      channels.get(channel).linkWith(scope, scope.state);
                    });
                  }

                  if (definition.styles) {
                    scope.$on("$destroy", function () {
                      // todo potential mem leak here?
                      detachStyles(styles);
                    });
                  }

                  // collect the interpolated option values from attrs
                  var opts = getOptionsValues(attrs);

                  var readyContext = extend(tagReady(el, scope.state, opts), templateReady(scope), injectorReady(injectedCustomServices, definition.injectables), compositeReady(linkFn, channels));

                  definition.ready.apply(readyContext);
                },
                post: function post() {}
              };
            },
            scope: angularDirectiveScope
          };
        }

        var stateName = conv.names.state(definition.name);

        // inject all composite-specific services
        directiveFactory.$inject = [stateName, channelsInterface().entityName, linkInterface().entityName].concat(definition.injectables);

        definition.component = directiveFactory;
        return definition;
      };
    }
  };
});
//# sourceMappingURL=create.js.map