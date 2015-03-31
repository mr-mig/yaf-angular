(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["_test"] = factory();
	else
		root["_test"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	module.exports = {
	  element: __webpack_require__(2),
	  composite: __webpack_require__(3),
	  screen: __webpack_require__(4),
	  state: __webpack_require__(5),
	  // angular-specific
	  module: angular.module('yaf-angular', [
	    __webpack_require__(6).name,
	    __webpack_require__(7).name
	  ])
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var angular = global.angular;
	if (typeof angular === 'undefined')
	  throw new Error('Failed to load module angular-cjs: AngularJS is not defined in the global scope.');
	module.exports = angular;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(1);
	var element = __webpack_require__(14).element;
	var createElement = __webpack_require__(8);
	var createState = __webpack_require__(5);

	module.exports = function angularElement(definition) {
	  var elementDefinition = element(definition, createState, createElement);

	  // try to get the module first
	  // this is the case when state is created for a structure entity like element
	  try {
	    angular.module(elementDefinition.moduleName);
	  } catch (e) {
	    angular.module(elementDefinition.moduleName, elementDefinition.moduleDependencies);
	  }

	  return angular.module(elementDefinition.moduleName).directive(elementDefinition.name, elementDefinition.component);
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(1);
	var composite = __webpack_require__(14).composite;
	var createComposite = __webpack_require__(9);
	var createState = __webpack_require__(5);

	// register composite using angular DI container
	module.exports = function angularComposite(definition) {
	  var compositeDefinition = composite(definition, createState, createComposite);

	  // try to get the module first
	  // this is the case when state is created for a structure entity like composite
	  try {
	    angular.module(compositeDefinition.moduleName);
	  } catch (e) {
	    angular.module(compositeDefinition.moduleName, compositeDefinition.moduleDependencies);
	  }

	  return angular.module(compositeDefinition.moduleName).directive(compositeDefinition.name, compositeDefinition.component);
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(1);
	var screen = __webpack_require__(14).screen;
	var createScreen = __webpack_require__(10);

	module.exports = function angularScreen(definition) {
	  return screen(definition, createScreen);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(1);
	var state = __webpack_require__(14).state;
	var stateFactory = __webpack_require__(11);

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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(1);
	var link = __webpack_require__(14).link;
	var createLink = __webpack_require__(12);

	var result = link(createLink);

	module.exports = angular.module(result.moduleName, []).value(result.entityName, result.factoryFn);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(1);
	var channel = __webpack_require__(14).channel;
	var createChannel = __webpack_require__(13);

	var result = channel(createChannel);

	module.exports = angular.module(result.moduleName, []).provider(result.entityName, result.factoryFn);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var conv = __webpack_require__(14).conventions;
	var tagReady = __webpack_require__(18);
	var getOptionsValues = __webpack_require__(15);
	var attachStyles = __webpack_require__(16);
	var detachStyles = __webpack_require__(17);
	var injectorReady = __webpack_require__(19);
	var templateReady = __webpack_require__(20);
	var extend = __webpack_require__(24);

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
	                detachStyles(styles);
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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var conv = __webpack_require__(14).conventions;
	var extend = __webpack_require__(24);
	var tagReady = __webpack_require__(18);
	var compositeReady = __webpack_require__(21);
	var getOptionsValues = __webpack_require__(15);
	var linkInterface = __webpack_require__(22);
	var channelsInterface = __webpack_require__(23);
	var attachStyles = __webpack_require__(16);
	var detachStyles = __webpack_require__(17);
	var injectorReady = __webpack_require__(19);
	var templateReady = __webpack_require__(20);

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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(1);
	var attachStyles = __webpack_require__(16);
	var detachStyles = __webpack_require__(17);
	var compositeReady = __webpack_require__(21);
	var linkInterface = __webpack_require__(22);
	var channelsInterface = __webpack_require__(23);
	var injectorReady = __webpack_require__(19);
	var templateReady = __webpack_require__(20);
	var extend = __webpack_require__(24);

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
	      styles = attachStyles(definition.styles);
	    }

	    $scope.$on("$destroy", function () {
	      detachStyles(styles);
	    });

	    var readyContext = extend(templateReady($scope), injectorReady(injectedCustomServices, definition.injectables), compositeReady(link, channels));

	    definition.ready.apply(readyContext);
	  };

	  controller.$inject = ["$scope", channelsInterface().entityName, linkInterface().entityName].concat(definition.injectables);

	  registerRoutes.$inject = ["$routeProvider", "channelsProvider"];

	  return module.config(registerRoutes);
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	//todo
	"use strict";
	var conv = __webpack_require__(14).conventions;

	module.exports = function stateFactory(stateDefinition) {
	  // angular factory function, returning constructor
	  return function () {
	    return function stateConstructor() {
	      // create an instance using the obj as a schema
	      return Object.create(stateDefinition);
	    };
	  };
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = link;

	function link(scope) {
	  return new LinkBus(scope);
	}

	function LinkBus(scope) {
	  // the current linked scope
	  this.scope = scope;
	  // all source states
	  this.sources = [];
	  // all target states
	  this.targets = [];
	  // current transformer
	  this.transformer = function (nothing, x) {
	    return x;
	  };

	  this.scope.$on("$destroy", (function () {
	    // kill all references bounded to this scope object
	    // in angular all listeners will be removed automatically
	    this.sources = null;
	    this.targets = null;
	    this.scope = null;
	    this.transformer = null;
	  }).bind(this));
	}

	// add a state as a change source
	LinkBus.prototype.source = function (state, field, deep) {
	  //1. state is always deep-watched
	  //2. state + field is not deepwatched by default
	  //3. state + arrayField is not deepwatched, but watchCollection is used + field is shallow watched
	  //4. state + arrayField + deep is deepwatched

	  var forceDeep = !field || deep;
	  var lengthyField = field && Array.isArray(state[field]);
	  var watchCollection = field && lengthyField && !forceDeep;
	  var watchReference = field && lengthyField;

	  // get hold of all registered states
	  this.sources.push({
	    state: state,
	    field: field
	  });

	  if (field && typeof state[field] === "function") {
	    return this.fromFn(state, field);
	  }

	  var watched = function watched() {
	    return state[field];
	  };

	  if (!field) {
	    watched = function () {
	      return state;
	    };
	  }

	  var watchHandler = (function (n, o) {
	    if (n !== o) {
	      console.log("value changed", {
	        forceDeep: forceDeep,
	        lengthy: lengthyField,
	        collection: watchCollection,
	        reference: watchReference,
	        n: n,
	        o: o
	      });

	      this._dispatch({
	        state: state,
	        field: field,
	        value: n });
	    }
	  }).bind(this);

	  var watcherFn = watchCollection ? this.scope.$watchCollection.bind(this.scope) : this.scope.$watch.bind(this.scope);
	  var deregisterEntityWatcher = watcherFn(watched, watchHandler, forceDeep);

	  //  if (watchReference) {
	  //    var referenceWatcher = function () {
	  //      return state;
	  //    };
	  //
	  //    this.scope.$watch(referenceWatcher, function (n, o) {
	  //      if (n !== o) {
	  //        console.log('reference watcher', n, o);
	  //        // remove old watcher
	  //        deregisterEntityWatcher();
	  //
	  //        // create a new watcher for fresh value
	  //        deregisterEntityWatcher = watcherFn(function () {
	  //          return n;
	  //        }, watchHandler, forceDeep);
	  //      }
	  //    });
	  //
	  //  }

	  return this;
	};

	// dispatch change to all targets
	LinkBus.prototype._dispatch = function (newVal) {
	  if (!this.targets.length) {
	    console.log("The change event inside one of the links " + "has no targets!\nSources: " + this.sources);
	  }
	  this.targets.forEach(_applyTransformation(newVal, this.transformer));
	};

	// add a state as a change target
	LinkBus.prototype.target = function (state, field) {
	  if (!state) {
	    throw new Error("You specified an \"undefined\" state to link!");
	  }
	  this.targets.push({
	    state: state,
	    field: field
	  });
	  return this;
	};

	// add a transformer function to current link
	// should be of type (source, target) -> target
	LinkBus.prototype.map = function (fn) {
	  this.transformer = fn;
	  return this;
	};

	// link function call as a change source
	LinkBus.prototype.fromFn = function (state, fnName) {
	  // remember old function
	  var oldFn = state[fnName];

	  // hijack with decorator
	  state[fnName] = (function () {
	    var args = [].slice.apply(arguments);

	    var result = oldFn.apply(state, args);

	    // dispatch change when this method is called
	    this._dispatch(result);
	  }).bind(this);

	  return this;
	};

	// propagate transformation to the given target
	function _applyTransformation(newVal, transformer) {
	  return function (target) {
	    var changedValue = target.field ? target.state[target.field] : target.state;
	    var newTargetValue = transformer(newVal.value, changedValue);

	    if (newTargetValue === undefined && !target.field) {
	      console.log("Warning! The link reset the target state to \"undefined\"!" + "\nFeels like a bug." + "\nYou should use a pure function inside link.map()." + "\nThis function should return transformed state object:" + "\n" + transformer);
	    }

	    if (target.field) {
	      target.state[target.field] = newTargetValue;
	    } else {
	      // update all fields of the old target
	      // Pretending that it acts as an immutable
	      Object.keys(target.state).forEach(function (key) {
	        target.state[key] = newTargetValue[key];
	      });
	    }
	  };
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// global registry
	var channels = {};

	module.exports = ChannelsProvider;

	// accessor function
	// allows non-existent channels usage
	// gives sane warning message
	channels.get = function (name) {
	  if (!channels[name]) {
	    console.log("Warning! The non-existent channel is accessed: " + name + ".\n" + "This is potentially abnormal situation: all active channels should " + "be created using channelsProvider.createChannels(<array>) " + "or registered using the screen's \"channels\" field.");
	    return new Channel(name);
	  }

	  return channels[name];
	};

	function Channel(name) {
	  // channel name
	  this.name = name;

	  // all scopes linked to this channel
	  this.scopes = [];

	  // all source states linked to this channel
	  this.sources = [];

	  // all target states linked to this channel
	  this.targets = [];

	  // transformation function
	  // (target, source) -> newTarget
	  this.transform = function (nothing, x) {
	    return x;
	  };
	}

	// angular-specific provider format
	function ChannelsProvider() {

	  function add(name) {
	    channels[name] = new Channel(name);
	  }

	  // this should be called during app startup to create the given channels
	  this.createChannels = function (array) {
	    array.forEach(add);
	  };

	  this.$get = ["$rootScope", ChannelFactory];
	}

	// this thing will be injected in angular
	function ChannelFactory($rootScope) {
	  // links the given scope to this channel
	  // any change will be propagated to this scope
	  Channel.prototype.link = function (scope) {
	    if (this.scopes.indexOf(scope) > -1) {
	      return;
	    }

	    this.scopes.push(scope);
	    return this;
	  };

	  Channel.prototype.source = function (state, field) {
	    if (!this.scopes.length) {
	      throw new Error("Channel" + this.name + "is not linked to any scope!\n" + "All active channels should be linked to at least one scope to be able to watch state changes." + "Use channel.link(scope)");
	    }

	    this.sources.push({
	      state: state,
	      field: field
	    });

	    if (typeof state[field] === "function") {
	      return this.fromFn(state, field);
	    }

	    var watched = function watched() {
	      return state[field];
	    };

	    if (!field) watched = function () {
	      return state;
	    };

	    var watchHandler = (function (n, o) {
	      if (n !== o) {
	        this._dispatch(state);
	      }
	    }).bind(this);

	    var scope = this.scopes[this.scopes.length - 1];

	    //deep watch object if no field defined
	    scope.$watch(watched, watchHandler, !field);

	    return this;
	  };

	  Channel.prototype.fromFn = function (state, fnName) {
	    // remember old function
	    var oldFn = state[fnName];

	    // hijack with decorator
	    state[fnName] = (function () {
	      var args = [].slice.apply(arguments);

	      var result = oldFn.apply(state, args);

	      // dispatch change when this method is called
	      // todo pass the source state anyway?
	      this._dispatch(result);
	    }).bind(this);

	    return this;
	  };

	  Channel.prototype._dispatch = function (sourceState) {
	    $rootScope.$broadcast(this.name, sourceState);
	  };

	  Channel.prototype.map = function (fn) {
	    // (target, source) -> target
	    this.transformer = fn;
	    return this;
	  };

	  // Bind the given state to all changes in this channel
	  Channel.prototype.linkWith = function (targetScope, state) {
	    var listenTarget = {
	      state: state,
	      scope: targetScope
	    };

	    this.targets.push(listenTarget);

	    // binding to target scope so that listener deregisters automatically
	    return targetScope.$on(this.name, (function (event, sourceState) {
	      var result = this.transformer(state, sourceState);
	      if (result === undefined) {
	        console.log("Warning! The channel \"" + this.name + "\" has resetted the target state to \"undefined\"!" + "\nDo you really want this?" + "\nMaybe you should use a pure function inside channel.map()." + "\nThis function should return transformed state object:" + "\n" + this.transformer);
	      }
	      targetScope.state = result;
	    }).bind(this));
	  };

	  return channels;
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  conventions: __webpack_require__(25),
	  element: __webpack_require__(26),
	  composite: __webpack_require__(27),
	  screen: __webpack_require__(28),
	  state: __webpack_require__(29),
	  link: __webpack_require__(22),
	  channel: __webpack_require__(23)
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var notStateOrChannels = function (key) {
	  return key !== 'state' && key !== 'channels';
	};

	module.exports = function getOptionsValues(attrs){
	  return Object.keys(attrs)
	    .filter(notStateOrChannels)
	    .reduce(function(acc, key){
	      acc[key] = attrs[key];
	      return acc;
	    }, {});
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function attachStyles(stylesStr, node) {
	  var styles = document.createElement('style');
	  styles.type = 'text/css';
	  styles.innerHTML = stylesStr;
	  node = node ? (node[0] || node) : document.head.childNodes[0];
	  node.parentNode.appendChild(styles);
	  return styles;
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function detachStyles(styles) {
	  if (!styles.parentNode) {
	    return;
	  }
	  return styles.parentNode.removeChild(styles);
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function internals(el, state, options) {

	  return {
	    element: el,
	    state: state,
	    options: options
	  };
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function injectorReadyContext(injected, injectables) {

	  // combine injected components with the corresponding injectable names
	  var injector =
	    injectables
	      .reduce(function (acc, name, idx) {
	        acc[name] = injected[idx];
	        return acc;
	      }, {});

	  return {
	    injector: injector
	  };
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(scope){
	  return {
	    templateScope: scope
	  };
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function readyContext(link, channels) {

	  return {
	    link: link,
	    channels: channels
	  };
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var conv = __webpack_require__(25);

	module.exports = function defineLink(createLink) {
	  return {
	    factoryFn: createLink,
	    entityName: conv.behaviourComponentsNames.link,
	    moduleName: conv.names.ngModule(conv.globalNames.framework, conv.behaviourComponentsNames.link)
	  }
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var conv = __webpack_require__(25);

	module.exports = function defineСhannel(createChannel) {
	  return {
	    factoryFn: createChannel,
	    moduleName: conv.names.ngModule(
	      conv.globalNames.framework,
	      conv.behaviourComponentsNames.channel
	    ),
	    entityName: conv.globalNames.channels
	  };
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = Object.prototype.hasOwnProperty;
	var toString = Object.prototype.toString;
	var undefined;

	var isPlainObject = function isPlainObject(obj) {
		'use strict';
		if (!obj || toString.call(obj) !== '[object Object]') {
			return false;
		}

		var has_own_constructor = hasOwn.call(obj, 'constructor');
		var has_is_property_of_method = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		// Not own constructor property must be Object
		if (obj.constructor && !has_own_constructor && !has_is_property_of_method) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) {}

		return key === undefined || hasOwn.call(obj, key);
	};

	module.exports = function extend() {
		'use strict';
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0],
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
			target = {};
		}

		for (; i < length; ++i) {
			options = arguments[i];
			// Only deal with non-null/undefined values
			if (options != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && Array.isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};



/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var firstLower = __webpack_require__(30);
	var firstUpper = __webpack_require__(31);
	var composeName = __webpack_require__(32);

	module.exports = {
	  structureComponentsNames: __webpack_require__(33),
	  behaviourComponentsNames: __webpack_require__(34),
	  globalNames: __webpack_require__(35),
	  names : {
	    element: composeName(firstLower),
	    state: composeName(firstUpper, __webpack_require__(34).state),
	    composite: composeName(firstLower),
	    screen: composeName(firstLower),
	    ngModule: __webpack_require__(36)
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var conv = __webpack_require__(25);
	var component = __webpack_require__(38);
	var stateful = __webpack_require__(43);
	var taglike = __webpack_require__(41);
	var injector = __webpack_require__(42);
	var compose = __webpack_require__(37);


	module.exports = function createElement(definition, createStateFn, createElementFn){
	  var createOfType = compose(component, injector, stateful, taglike)(definition);
	  var componentDefinition = createOfType(conv.structureComponentsNames.element);

	  var state = createStateFn(componentDefinition);
	  var element = createElementFn(componentDefinition);
	  return element;
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var conv = __webpack_require__(25);
	var component = __webpack_require__(38);
	var stateful = __webpack_require__(43);
	var taglike = __webpack_require__(41);
	var injector = __webpack_require__(42);
	var compose = __webpack_require__(37);


	// right now composite is totaly the same as element
	// this fact may change in the future (and implementations may differ)
	module.exports = function createComposite(definition, createStateFn, createCompositeFn){
	  var createOfType = compose(component, injector, stateful, taglike)(definition);
	  var componentDefinition = createOfType(conv.structureComponentsNames.composite);

	  var state = createStateFn(componentDefinition);
	  var composite = createCompositeFn(componentDefinition);
	  return composite;
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var conv = __webpack_require__(25);
	var component = __webpack_require__(38);
	var routable = __webpack_require__(39);
	var channelSource = __webpack_require__(40);
	var taglike = __webpack_require__(41);
	var injector = __webpack_require__(42);
	var compose = __webpack_require__(37);


	module.exports = function createScreen(definition, createScreenFn) {
	  var createOfType = compose(component, routable, channelSource, injector, taglike)(definition);
	  var componentDefinition = createOfType(conv.structureComponentsNames.screen);

	  return createScreenFn(componentDefinition);
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var conv = __webpack_require__(25);

	module.exports = function state(definition, factoryFn){
	  var stateName = conv.names.state(definition.name);

	  return {
	    entityName: stateName,
	    factoryFn: factoryFn(definition.state)
	  };
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function firstLower(string) {
	  return string.charAt(0).toLowerCase() + string.substr(1);
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function firstUpper(string) {
	  return string.charAt(0).toUpperCase() + string.substr(1);
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var firstUpper = __webpack_require__(31);

	module.exports = function composeName(firstWordTransformer, component) {
	  component = component || '';

	  return function (entity) {
	    return [firstWordTransformer(entity), firstUpper(component)].join('');
	  };
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = {
	  element: 'elements',
	  composite: 'composites',
	  screen: 'screens'
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = {
	  state: 'state',
	  channel: 'channel',
	  link: 'link'
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = {
	  channels: 'channels',
	  framework: 'yaf'
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function angularModuleName(entity, componentName){
	  return [entity.toLowerCase(), componentName].join('.');
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function compose() {
	  var funcs = arguments;

	  return function() {
	    var args = arguments,
	      length = funcs.length;

	    while (length--) {
	      args = [funcs[length].apply(this, args)];
	    }
	    return args[0];
	  };
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var conv = __webpack_require__(25);
	var extend = __webpack_require__(24);

	module.exports = function component(definition) {
	  return function componentOfType(type) {
	    var moduleName = conv.names.ngModule(type, definition.name);

	    return extend(
	      definition,
	      {
	        moduleName: moduleName,
	        type: type
	      });
	  };
	};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var extend = __webpack_require__(24);
	var isFunction = __webpack_require__(44);

	var defaultSchema = {
	  route : '/'
	};

	var verify = function (def) {
	  if (!def.route) {
	    throw new Error('You tried to create a routable component without route specified!');
	  }
	  return def;
	}

	module.exports = function stateful(definition) {
	  var component = extend(true, {}, defaultSchema, definition);
	  return verify(component);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var extend = __webpack_require__(24);
	var defaultSchema = {
	  channels: []
	}

	var verify = function (def) {
	  if (!Array.isArray(def.channels)){
	    throw new Error('You have tried to create a channel source component ' +
	      'with non-array "channels" field!\n' +
	      'This is incorrect, channels can be automatically created only from array notation.\n' +
	      'You should specify something like "channels: ["myChannel"] in component definition."')
	  }
	  return def;
	}

	module.exports = function(definition){
	  var component = extend(true, definition, defaultSchema);
	  return verify(component);
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var extend = __webpack_require__(24);

	var defaultSchema = {
	  inject: {
	    //'componentName' : 'fromModuleName'
	    //'exportName' : ModuleObject
	  },
	  template: null,
	  styles: null,
	  ready: function () {
	//    this.element;
	//    this.state;
	//    this.options;
	//    this.injector;
	//    this.channels;
	//    this.templateScope;
	  }
	};

	function verify(def){
	  if (!def.name) {
	    throw new Error('You tried to create the component without name specified!');
	  }

	  if (!def.template) {
	    throw new Error('You tried to create the compoennts without template specified!');
	  }

	  return def;
	}

	module.exports = function taglike(definition){
	  var component = extend(true, {}, defaultSchema, definition);
	  return verify(component);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var mapValues = __webpack_require__(45);
	var uniq = __webpack_require__(46);
	var extend = __webpack_require__(24);

	module.exports = function injector(definition){
	  var modules = uniq(mapValues(definition.inject));
	  var injectables = Object.keys(definition.inject);

	  return extend(definition, {
	    moduleDependencies: modules,
	    injectables: injectables
	  });
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var extend = __webpack_require__(24);
	var isFunction = __webpack_require__(44);

	var defaultSchema = {
	  state: {
	    // element's state object
	  },
	  options: {
	    // element's options
	  }
	};

	function verifyNoFunctions(def, prop) {
	  var property = def[prop];

	  var fns = Object.keys(property)
	    .map(function (key) {
	      return property[key];
	    })
	    .filter(isFunction);

	  if (fns.length) {
	    console.log('Warning! Property \"' + prop + '\" in ' +
	      def.name + ' contain function definitions.\n' +
	      'This may result in incorrect behaviour!');
	  }
	}


	module.exports = function stateful(definition) {
	  var component = extend(true, {}, defaultSchema, definition);
	  verifyNoFunctions(component, 'state');
	  verifyNoFunctions(component, 'options');
	  return component;
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (fn) {
	  return !!(fn && fn.constructor && fn.call && fn.apply);
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function mapValues(map){
	  return Object.keys(map).map(function(key){return map[key];});
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function uniq(arr) {
	  return Object.keys(arr.reduce(function (acc, val) {
	    acc[val] = 1;
	    return acc;
	  }, {}));
	};


/***/ }
/******/ ])
});
;