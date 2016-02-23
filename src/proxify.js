/**
 * Created by Mark.Mosby on 2/21/2016.
 */
  //Modules for each proxy factory type
  //Modules for traps specific to a proxy type
  //Module for traps used by all proxy types + helper functions
  //Module for global proxy settings object that contains state info for each proxy instance - used for lookups when traps are executing
  //Symbols on objects - how to proxy

  var objectProxy = require('objectProxyFactory.js');

export default function proxify(obj, settings = {}) {
	if (typeof obj === "object")
		return objectProxy.proxifyObject(obj, settings);			//proxify this as an [object object]
	else if (typeof obj === "function")
		return proxifyFunction(obj, settings);		//proxify this as an [object function]
	else if (Array.isArray(obj))
		return proxifyArray(obj, settings);			//proxify this as an [object array]
	return obj;								//no proxification, return obj.
}

function proxifyFunction(fn, settings) {
  var keys = [],
      settings = settings && typeof settings == "object" ? settings : {};

  if (settings.keys) keys = settings.keys;
  else if (settings.delegatable) {
    for (var key in fn) {
      keys.push(key);
    }
  }
  else keys = Reflect.ownKeys(fn);

  traps = settings.traps || fnTraps;

  var handler = {};
  Object.defineProperties(
    handler, {
      "_internalKeys": {
        value: keys,
        writable: false,
        configurable: false,
        enumerable: false
      },
      "addKeys": {
        value: function _addKeys(newKeys) {
          this._internalKeys = this._internalKeys.concat(newKeys);
        },
        writable: false,
        configurable: false
      },
       "removeKeys": {
         value: function _removeKeys(remKeys) {
           var tmpKeys = [];
           for (let i = 0; i < this._internalKeys.length; i++) {
             if (~remKeys.indexOf(this._internalKeys[i]))
              tmpKeys.push(this._internalKeys[i]);
           }
           this._internalKeys = tmpKeys;
         },
         writable: false,
         configurable: false
       }
    }
  );

  for (let i = 0; i < traps.length; i++) {
    if (Reflect.has(trapFns, traps[i]))
      handler[traps[i]] = trapFns[traps[i]];
  }

  return new Proxy(fn, handler);
}

function proxifyArray (arr, settings) {
  var keys = [],
      settings = settings && typeof settings == "object" ? settings : {};

  if (settings.keys) keys = settings.keys;
  else if (settings.delegatable) {
    for (var key in arr) {
      keys.push(key);
    }
  }
  else keys = Reflect.ownKeys(fn);

  traps = settings.traps || arrTraps;

	var handler = {};
  Object.defineProperty(
    handler,
    "_internalKeys",
    {
      value: keys,
      writable: false,
      configurable: false,
      enumerable: false
    }
  );

  for (let i = 0; i < traps.length; i++) {
    if (Reflect.has(trapFns, traps[i]))
      handler[traps[i]] = trapFns[traps[i]];
  }

  return new Proxy(arr, handler);
}
