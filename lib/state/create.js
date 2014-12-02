//todo
'use strict';
var conv = require('yaf').conventions;

module.exports = function stateFactory(stateDefinition) {
  // angular factory function, returning constructor
  return function(){
    return function stateConstructor() {
      // create an instance using the obj as a schema
      return Object.create(stateDefinition);
    };
  };
};
