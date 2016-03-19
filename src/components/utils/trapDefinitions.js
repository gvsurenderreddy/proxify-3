const trapDefinitions = {
  defineProperty: 'object',
  deleteProperty: 'key',
  get: 'key',
  getOwnPropertyDescriptor: 'key',
  getPrototypeOf: 'object',
  has: 'object',
  isExtensible: 'object',
  ownKeys: 'object',
  preventExtensions: 'object',
  set: 'key',
  setPrototypeOf: 'object',
  apply: 'function',
  construct: 'function'
};

Object.defineProperty(
  trapDefinitions,
  'getTraps', {
    /**
     * Returns an array of traps on the trapDefinitions object by type
     * @param {string} types - The types of traps desired (property, object, function, objectAll, functionAll, all)
     * @returns {Array} - An array of the requested traps of the specified type
     */
    value: function getTraps(types) {
      {
        const trapTypes = types;
        switch (trapTypes) {
          case 'property':
            return getTrapKeys('key');
          case 'object':
            return getTrapKeys('object');
          case 'function':
            return getTrapKeys('function');
          case 'objectAll':
            return getTrapKeys('key', 'object');
          case 'functionAll':
            return getTrapKeys('key', 'function');
          case 'all':
            return getTrapKeys('key', 'object', 'function');
          case '':
                return getTrapKeys('key', 'object', 'function');
          default:
            return [];
        }
      }
    },
    writable: false,
    enumerable: false,
    configurable: false
  }
);

Object.defineProperties(
  trapDefinitions, {
    /**
     * Returns all traps available for object properties
     * @Returns {Array} - Returns an array of object property trap names
     */
    'propertyTraps': {
      get: function _getPropertyTraps() {
        return getTrapKeys('key');
      },
      configurable: false,
      enumerable: false
    },
    /**
     * Returns all traps available for objects
     * @Returns {Array} - Returns an array of object trap names
     */
    'objectTraps': {
      get: function _getObjectTraps() {
        return getTrapKeys('object');
      },
      configurable: false,
      enumerable: false
    },
    /**
     * Returns all available traps for functions
     * @Returns {Array} - Returns an array of function trap names
     */
    'functionTraps': {
      get: function _getFunctionTraps() {
        return getTrapKeys('function');
      },
      configurable: false,
      enumerable: false
    },
    /**
     * Returns all traps
     * @Returns {Array} - Returns an array of all trap names
     */
    'traps': {
      get: function _getTraps() {
        return getTrapKeys('all');
      },
      configurable: false,
      writable: false
    }
  }
);

/**
 * Iterates the various traps in the trapDefinitions object and determines
 * which values should be returned.
 * @param {Array} types - An array of requested object trap types
 * @returns {Array} - Array of traps available for the requested type
 */
function getTrapKeys(...types) {
  {
    const trapTypes = types,
      retArr = [];
    Array.from(Object.keys(trapDefinitions)).forEach(function trapIterationCallback(trap) {
      if (this.includes(trapDefinitions[trap]))
        retArr.push(trap);
    }, trapTypes);
    return retArr;
  }
}

export { trapDefinitions };