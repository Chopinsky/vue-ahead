(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define("iastate-react-ahead", ["React"], factory);
	else if(typeof exports === 'object')
		exports["iastate-react-ahead"] = factory(require("react"));
	else
		root["iastate-react-ahead"] = factory(root["React"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(14)();
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(33);
            var content = __webpack_require__(34);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

const defaultGroupName = 'default';

const getItemLabel = item => {
  let src = typeof item === 'object' ? item['source'] : item;

  if (typeof src !== 'string') {
    src = src.toString();
  }

  return src;
};

const getGroupKey = item => {
  let groupKey = typeof item === 'object' ? item['group'] : defaultGroupName;

  if (typeof groupKey !== 'string' && typeof groupKey !== 'number') {
    groupKey = defaultGroupName;
  }

  groupKey = groupKey.toString() || defaultGroupName;
  return groupKey.toUpperCase();
};

module.exports = {
  getItemLabel,
  getGroupKey
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(5);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(4);
var normalizeHeaderName = __webpack_require__(22);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(9);
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(9);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(21)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var settle = __webpack_require__(23);
var buildURL = __webpack_require__(6);
var buildFullPath = __webpack_require__(25);
var parseHeaders = __webpack_require__(28);
var isURLSameOrigin = __webpack_require__(29);
var createError = __webpack_require__(10);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(30);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(24);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(15);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var bind = __webpack_require__(5);
var Axios = __webpack_require__(17);
var mergeConfig = __webpack_require__(11);
var defaults = __webpack_require__(8);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(12);
axios.CancelToken = __webpack_require__(31);
axios.isCancel = __webpack_require__(7);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(32);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var buildURL = __webpack_require__(6);
var InterceptorManager = __webpack_require__(18);
var dispatchRequest = __webpack_require__(19);
var mergeConfig = __webpack_require__(11);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var transformData = __webpack_require__(20);
var isCancel = __webpack_require__(7);
var defaults = __webpack_require__(8);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(10);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(26);
var combineURLs = __webpack_require__(27);

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(12);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(35);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "._2dH7OUMw0ESmltDd0ovClD {\r\n  position: relative;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.Axrtb5jaHtP98cGxAqRLV {\r\n  -webkit-box-align: center;\r\n  -webkit-box-pack: justify;\r\n  padding-left: 6px;\r\n  padding-right: 2px;\r\n  min-height: 38px;\r\n  align-items: center;\r\n  background-color: rgb(255, 255, 255);\r\n  border-radius: 2px;\r\n  border: 1px solid rgb(204, 204, 204);\r\n  cursor: default;\r\n  position: relative;\r\n  box-sizing: border-box;\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  justify-content: space-between;\r\n  transition: all 100ms ease 0s;\r\n  outline: 0px !important;\r\n}\r\n\r\n._2SUkorElgQ76JGjtyHk4de {\r\n  border: 1px solid blue;\r\n}\r\n\r\n._1Vnmg2rKay_EA99qawmFda {\r\n  padding: 2px;\r\n  color: rgb(51, 51, 51);\r\n  position: relative;\r\n  display: flex;\r\n  flex: 1 1 0%;\r\n  flex-wrap: wrap;\r\n  box-sizing: border-box;\r\n  overflow: hidden;\r\n  visibility: visible;\r\n  box-sizing: border-box;\r\n  width: 100%;\r\n}\r\n\r\n._2CD9QkPe0_ZMyoTQxtKBm7 {\r\n  position: absolute;\r\n  top: 50%;\r\n  color: rgb(128, 128, 128);\r\n  margin: 0;\r\n  transform: translateY(-50%);\r\n  box-sizing: border-box;\r\n}\r\n\r\n.xLIYtwgLVzX9AyYwVcgLt {\r\n  color: inherit;\r\n}\r\n\r\n._1Vnmg2rKay_EA99qawmFda {  \r\n  cursor: text;\r\n  width: 100%;\r\n}\r\n\r\n._2eDYrfCE1goL3V_2ogtQtz {\r\n  background-color: rgb(230, 230, 230);\r\n  display: flex;\r\n  min-width: 0px;\r\n  box-sizing: border-box;\r\n  border-radius: 2px;\r\n  margin: 2px 4px 2px 0;\r\n}\r\n\r\n._1tWm_bFu71IXItBd0OXrpP {\r\n  color: rgb(51, 51, 51);\r\n  font-size: 85%;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  box-sizing: border-box;\r\n  border-radius: 2px;\r\n  overflow: hidden;\r\n  padding: 2px 3px 4px 6px;\r\n}\r\n\r\n._2jKHZpiKI_7YyEyQXA1yMk {\r\n  -webkit-box-align: center;\r\n  align-items: center;\r\n  cursor: pointer;\r\n  display: flex;\r\n  padding-left: 4px;\r\n  padding-right: 4px;\r\n  box-sizing: border-box;\r\n  border-radius: 2px;\r\n}\r\n\r\n._2jKHZpiKI_7YyEyQXA1yMk:hover {\r\n  background-color: rgb(255, 189, 173);\r\n  color: rgb(222, 53, 11);\r\n}\r\n\r\n._2U9LCKIK4vRQWtopGpYhPl {\r\n  -webkit-box-align: center;\r\n  align-items: center;\r\n  align-self: stretch;\r\n  display: flex;\r\n  flex-shrink: 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\n._25xAyedeXMtrf4T3ed1PJt {\r\n  color: rgb(204, 204, 204);\r\n  display: flex;\r\n  box-sizing: border-box;\r\n  padding: 10px 6px;\r\n  transition: color 150ms ease 0s;\r\n}\r\n\r\n._25xAyedeXMtrf4T3ed1PJt:hover {\r\n  cursor: pointer;\r\n  color: rgb(153, 153, 153);\r\n}\r\n\r\n._25xAyedeXMtrf4T3ed1PJt:focus {\r\n  color: rgb(153, 153, 153);\r\n  outline: 2px dotted gray;\r\n}\r\n\r\n.k1UudnI1h5npE3btdwIY1 {\r\n  display: inline-block;\r\n  fill: currentcolor;\r\n  line-height: 1;\r\n  stroke: currentcolor;\r\n  stroke-width: 0;\r\n}\r\n\r\n._1fXbnnAsavNrQXwBYoNqlw {\r\n  align-self: stretch;\r\n  background-color: rgb(204, 204, 204);\r\n  margin-bottom: 8px;\r\n  margin-top: 8px;\r\n  width: 1px;\r\n  box-sizing: border-box;\r\n}\r\n\r\n._3etkCiSEHj9rBdr3HP7hoI {\r\n  top: 100%;\r\n  background-color: rgb(255, 255, 255);\r\n  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 11px;\r\n  margin-bottom: 1px;\r\n  margin-top: 1px;\r\n  position: absolute;\r\n  width: 100%;\r\n  z-index: 1;\r\n  box-sizing: border-box;\r\n  border-radius: 2px;\r\n  animation: _83_0pFPws0OPGRRHDRiNR 200ms;\r\n}\r\n\r\n@keyframes _83_0pFPws0OPGRRHDRiNR {\r\n  from { opacity: 0; }\r\n  to { opacity: 1; }\r\n}\r\n\r\n._2BZ6P2ChebiTM94M-OMhZD {\r\n  max-height: 300px;\r\n  overflow-y: auto;\r\n  padding-bottom: 2px;\r\n  padding-top: 2px;\r\n  position: relative;\r\n  box-sizing: border-box;\r\n}\r\n\r\n._1V1IQxhU17EfSxmz_iTN5t {\r\n  color: rgb(153, 153, 153);\r\n  text-align: center;\r\n  box-sizing: border-box;\r\n  padding: 6px 12px;\r\n}\r\n\r\n._1D9Xo5PbA8nnizD0GLeBxM {\r\n  background-color: transparent;\r\n  color: inherit;\r\n  cursor: default;\r\n  display: block;\r\n  font-size: inherit;\r\n  width: 100%;\r\n  user-select: none;\r\n  box-sizing: border-box;\r\n  padding: 4px 12px;\r\n}\r\n\r\n._1D9Xo5PbA8nnizD0GLeBxM._12tsaEmF9_7NK7pihcgxJw {\r\n  background-color: rgb(222, 235, 255);\r\n}\r\n\r\n._3khQpvMiBoqHO8CsroCjVi {\r\n  color: rgb(153, 153, 153);\r\n  cursor: default;\r\n  display: block;\r\n  font-size: 75%;\r\n  font-weight: 500;\r\n  margin-bottom: 0.25em;\r\n  padding: 2px 12px;\r\n  text-transform: uppercase;\r\n  box-sizing: border-box;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n}\r\n\r\n._2fvgAdZ635qKwR24y2XIFT {\r\n  background-color: #EBECF0;\r\n  border-radius: 1em;\r\n  color: #172B4D;\r\n  display: inline-block;\r\n  font-size: 10;\r\n  font-weight: normal;\r\n  line-height: 1;\r\n  text-align: center;\r\n  min-width: 1;\r\n  padding: 0.16666666666667em 0.5em;\r\n}\r\n", ""]);
// Exports
exports.locals = {
	"react-ahead__control-container": "_2dH7OUMw0ESmltDd0ovClD",
	"react-ahead__control-wrapper": "Axrtb5jaHtP98cGxAqRLV",
	"react-ahead__control-active": "_2SUkorElgQ76JGjtyHk4de",
	"react-ahead__input-wrapper": "_1Vnmg2rKay_EA99qawmFda",
	"react-ahead__placeholder": "_2CD9QkPe0_ZMyoTQxtKBm7",
	"react-ahead__placeholder-value-mode": "xLIYtwgLVzX9AyYwVcgLt",
	"react-ahead__selection-container": "_2eDYrfCE1goL3V_2ogtQtz",
	"react-ahead__selection-content": "_1tWm_bFu71IXItBd0OXrpP",
	"react-ahead__selection-removal": "_2jKHZpiKI_7YyEyQXA1yMk",
	"react-ahead__action-icons-container": "_2U9LCKIK4vRQWtopGpYhPl",
	"react-ahead__action-icons": "_25xAyedeXMtrf4T3ed1PJt",
	"react-ahead__action-icon": "k1UudnI1h5npE3btdwIY1",
	"react-ahead__action-icons-separator": "_1fXbnnAsavNrQXwBYoNqlw",
	"react-ahead__menu-wrapper": "_3etkCiSEHj9rBdr3HP7hoI",
	"menu-appear": "_83_0pFPws0OPGRRHDRiNR",
	"react-ahead__menu-content": "_2BZ6P2ChebiTM94M-OMhZD",
	"react-ahead__menu-no-option": "_1V1IQxhU17EfSxmz_iTN5t",
	"react-ahead__menu-option": "_1D9Xo5PbA8nnizD0GLeBxM",
	"react-head__menu-active-option": "_12tsaEmF9_7NK7pihcgxJw",
	"react-ahead__group-label": "_3khQpvMiBoqHO8CsroCjVi",
	"react-ahead__group-label-icon": "_2fvgAdZ635qKwR24y2XIFT"
};
module.exports = exports;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"commonjs":"react","commonjs2":"react","amd":"React","root":"React"}
var external_commonjs_react_commonjs2_react_amd_React_root_React_ = __webpack_require__(0);
var external_commonjs_react_commonjs2_react_amd_React_root_React_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_react_commonjs2_react_amd_React_root_React_);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(1);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__(13);
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// CONCATENATED MODULE: ./src/engine.js
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class engine_NativeEngine {
  constructor(props) {
    _defineProperty(this, "add", data => {
      if (!Array.isArray(data) || !data.length) {
        return;
      }

      this._store.push(...data);
    });

    _defineProperty(this, "query", (val, cb) => {
      if (typeof val !== 'string') {
        val = val.toString();
      }

      let data; //TODO: implement load more option

      if (this._cache.data.hasOwnProperty(val)) {
        data = this._cache.data[val];

        let index = this._cache.last.indexOf(val);

        if (index >= 0) {
          this._cache.last.splice(index, 1);

          this._cache.last.push(val);
        }
      } else if (!this._props.remote) {
        data = this._store.filter(data => data.source && data.source.indexOf(val) >= 0);

        this._cache.last.push(val);

        this._cache.data[val] = data;

        if (this._cache.last.length > this._props.cacheSize) {
          let [delKey] = this._cache.last.splice(0, 1);

          delete this._cache.data[delKey];
        }
      } else {
        const params = {
          q: val
        };
        const {
          dataParser,
          ...settings
        } = this._props.remote;
        axios_default()(Object.assign({}, settings, {
          params
        })).then(resp => {
          // format data if a formatter is passed
          let data = typeof dataParser === 'function' ? dataParser(resp.data) : resp.data;
          cb(data, val);
        }).catch(err => {
          console.error("[error] failed to fetch data from remote server:", err);
        });
        return;
      }

      return cb(data, val);
    });

    _defineProperty(this, "setOptions", options => {
      this._props = options;
    });

    _defineProperty(this, "setOption", (name, option) => {
      this._props[name] = option;
    });

    this._props = props || {};
    this._store = [];
    this._cache = {
      last: [],
      data: {}
    };

    if (!this._props['cacheSize']) {
      this._props['cacheSize'] = 10;
    }
  }

}

class SearchEngine {
  constructor(props) {
    _defineProperty(this, "add", data => {
      if (!data) {
        return;
      }

      if (!Array.isArray(data)) {
        data = [data];
      }

      let d = data.map(item => {
        if (!item) {
          return;
        }

        const type = typeof item;

        if (type === 'number' || type === 'string') {
          return {
            source: item.toString()
          };
        }

        return { ...item,
          source: item['source'].toString()
        };
      });

      this._engine.add(d);
    });

    _defineProperty(this, "find", (val, isRemote, cb) => {
      if (this._debounce) {
        clearTimeout(this._debounce);
        this._debounce = null;
      }

      const timeout = isRemote ? 200 : 40;
      this._debounce = setTimeout(() => {
        clearTimeout(this._debounce);
        this._debounce = null;

        this._engine.query(val, cb);
      }, timeout);
    });

    _defineProperty(this, "setOptions", options => {
      this._engine.setOptions(options);
    });

    _defineProperty(this, "setOption", (name, option) => {
      this._engine.setOption(name, option);
    });

    this._engine = null;
    this._debounce = null;

    if (props && props.engine) {
      this._engine = props.engine;
    } else {
      this._engine = new engine_NativeEngine(props);
    }
  }

}
// EXTERNAL MODULE: ./src/shared.css
var shared = __webpack_require__(2);
var shared_default = /*#__PURE__*/__webpack_require__.n(shared);

// CONCATENATED MODULE: ./src/input.js
function input_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const inputClass = "react-ahead__input-inner-wrapper";
const classNames = {
  inputStyle: shared_default.a[inputClass] || inputClass
};
class input_Input extends external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.Component {
  constructor(props) {
    super(props);

    input_defineProperty(this, "focus", () => {
      this._input && this._input.current && this._input.current.focus();
    });

    input_defineProperty(this, "blur", () => {
      this._input && this._input.current && this._input.current.blur();
    });

    input_defineProperty(this, "clear", () => {
      let width = this.props.inputWidth;

      if (this._div && this._div.current) {
        this._div.current.innerText = '';
        width = this._div.current.offsetWidth;
      }

      return width;
    });

    input_defineProperty(this, "handleTextChange", evt => {
      const val = evt && evt.target && evt.target.value || '';
      let width = this.props.inputWidth;

      if (this._div && this._div.current) {
        this._div.current.innerText = val;
        width = this._div.current.offsetWidth;
      }

      if (this.props.onEntryChange) {
        this.props.onEntryChange(evt, val, width);
      }
    });

    input_defineProperty(this, "handleKeydown", evt => {
      if (!evt) {
        return;
      }

      const {
        keyCode
      } = evt;
      console.log('key pressed:', keyCode);

      switch (keyCode) {
        case 8:
          // backspace
          if (this.props.value === '') {
            this.props.onSpecialKey('backspace');
          }

          break;

        case 9:
          // tab
          if (!evt.shiftKey) {
            this.props.onSpecialKey('tab');
          }

          break;

        case 13:
          // enter: selection
          evt.preventDefault();
          this.props.onSpecialKey('enter');
          break;

        case 27:
          // esc
          evt.preventDefault();
          this.props.onSpecialKey('esc');

        case 38: // arrow up

        case 40:
          // arrow down
          evt.preventDefault();
          this.props.onSpecialKey(keyCode === 38 ? 'up' : 'down');
          break;

        default:
          break;
      }
    });

    this._div = external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createRef();
    this._input = external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createRef();
  }

  render() {
    return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
      style: {
        display: "inline-block"
      },
      className: classNames.inputStyle
    }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("input", {
      autoCapitalize: "none",
      autoComplete: "off",
      autoCorrect: "off",
      spellCheck: "false",
      type: "text",
      ref: this._input,
      style: {
        boxSizing: "content-box",
        color: "inherit",
        fontSize: "inherit",
        fontFamily: "inherit",
        fontWeight: "inherit",
        minWidth: "1px",
        marginTop: "2px",
        width: `${this.props.inputWidth || 2}px`,
        outline: "none",
        border: 0
      },
      onChange: this.handleTextChange,
      onKeyDown: this.handleKeydown,
      value: this.props.value
    }), external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
      ref: this._div,
      style: {
        position: "absolute",
        top: "0px",
        left: "0px",
        visibility: "hidden",
        height: "0px",
        width: "min-content",
        overflow: "auto",
        whiteSpace: "pre",
        fontSize: "inherit",
        fontFamily: "inherit",
        fontWeight: "inherit",
        fontStyle: "normal",
        letterSpacing: "normal",
        textTransform: "none"
      }
    }));
  }

}

input_defineProperty(input_Input, "propTypes", {
  inputWidth: prop_types_default.a.number,
  onEntryChange: prop_types_default.a.func.isRequired,
  onSpecialKey: prop_types_default.a.func.isRequired,
  value: prop_types_default.a.string.isRequired
});

input_defineProperty(input_Input, "defaultProps", {
  inputWidth: 2,
  value: ''
});
// CONCATENATED MODULE: ./src/groupLabel.js



const groupLabelClass = 'react-ahead__group-label';
const groupLabelIconClass = 'react-ahead__group-label-icon';
const groupLabel_classNames = {
  groupStyles: shared_default.a[groupLabelClass] || groupLabelClass,
  groupIconStyles: shared_default.a[groupLabelIconClass] || groupLabelIconClass
};

const GroupLabel = props => {
  return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
    className: groupLabel_classNames.groupStyles
  }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("span", null, props.label || 'Default'), external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("span", {
    className: groupLabel_classNames.groupIconStyles
  }, props.count || 0));
};

GroupLabel.propTypes = {
  label: prop_types_default.a.string,
  count: prop_types_default.a.number
};
/* harmony default export */ var groupLabel = (GroupLabel);
// EXTERNAL MODULE: ./src/utils.js
var utils = __webpack_require__(3);

// CONCATENATED MODULE: ./src/dropdownItem.js
function dropdownItem_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const optionClass = "react-ahead__menu-option";
const activeClass = "react-head__menu-active-option";
const dropdownItem_classNames = {
  active: shared_default.a[activeClass] && `${shared_default.a[activeClass]} ${shared_default.a[optionClass]}` || `${activeClass} ${optionClass}`,
  option: shared_default.a[optionClass] || optionClass
};
class dropdownItem_DropdownItem extends external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.Component {
  constructor(props) {
    super(props);

    dropdownItem_defineProperty(this, "renderItem", () => {
      const {
        display,
        idx,
        isActive,
        item,
        onHighlight,
        onItemSelection
      } = this.props;
      const source = Object(utils["getItemLabel"])(item);
      const content = display ? display(source, item, 'option') : source;
      return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
        ref: this._elem,
        className: isActive ? dropdownItem_classNames.active : dropdownItem_classNames.option,
        tabIndex: -1,
        onMouseOverCapture: evt => onHighlight(evt, idx),
        onClick: evt => onItemSelection(evt, source, item)
      }, content);
    });

    this._elem = external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createRef();
  }

  componentDidUpdate(_prevProps, _prevState) {
    if (this.props.isActive && this.props.onActiveItemRendered) {
      this.props.onActiveItemRendered(this._elem && this._elem.current.offsetTop); //getBoundingClientRect());
    }
  }

  render() {
    const {
      count,
      groupKey
    } = this.props;

    if (count > 0) {
      return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(external_commonjs_react_commonjs2_react_amd_React_root_React_["Fragment"], {
        key: `__option_label_${groupKey}`
      }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(groupLabel, {
        label: groupKey,
        count: count
      }), this.renderItem());
    }

    return this.renderItem();
  }

}

dropdownItem_defineProperty(dropdownItem_DropdownItem, "propTypes", {
  count: prop_types_default.a.number,
  display: prop_types_default.a.func,
  groupKey: prop_types_default.a.string,
  idx: prop_types_default.a.number,
  isActive: prop_types_default.a.bool,
  item: prop_types_default.a.object,
  onHighlight: prop_types_default.a.func,
  onItemSelection: prop_types_default.a.func,
  onActiveItemRendered: prop_types_default.a.func
});
// CONCATENATED MODULE: ./src/dropdown.js
function dropdown_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const wrapperClass = "react-ahead__menu-wrapper";
const contentClass = "react-ahead__menu-content";
const noOptionClass = "react-ahead__menu-no-option";
const dropdown_classNames = {
  wrapper: shared_default.a[wrapperClass] || wrapperClass,
  content: shared_default.a[contentClass] || contentClass,
  noOption: shared_default.a[noOptionClass] || noOptionClass
};
class dropdown_Dropdown extends external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.Component {
  constructor(props) {
    super(props);

    dropdown_defineProperty(this, "state", {
      activeIdx: 0
    });

    dropdown_defineProperty(this, "select", evt => {
      const {
        options
      } = this.props;
      const {
        activeIdx
      } = this.state;

      if (activeIdx >= options.length) {
        return;
      }

      let item = options[activeIdx];
      const source = Object(utils["getItemLabel"])(item);
      this.handleItemSelection(evt, source, item);
    });

    dropdown_defineProperty(this, "handleCursorMove", type => {
      let {
        activeIdx
      } = this.state;

      if (type === 'up') {
        activeIdx--;
      } else {
        activeIdx++;
      }

      if (activeIdx < 0) {
        activeIdx = 0;
      } else if (activeIdx >= this.props.options.length) {
        activeIdx = this.props.options.length - 1;

        if (this.props.onLoadMore) {
          this.props.onLoadMore();
        }
      }

      if (activeIdx !== this.state.activeIdx) {
        this._manualMove = type;
        this.setState({
          activeIdx
        });
      }
    });

    dropdown_defineProperty(this, "handleHighlight", (evt, idx) => {
      if (evt) {
        evt.preventDefault();
      }

      this.setState({
        activeIdx: idx
      });
    });

    dropdown_defineProperty(this, "handleItemSelection", (evt, source, item) => {
      if (!this.props.onSelection || typeof source !== 'string') {
        return;
      } // removing book-keeping data for the created item


      if (item['__itemType'] === 'created') {
        item['source'] = item['__createdValue'] || source.substring(7);
        delete item['__createdValue'];
      }

      this.props.onSelection(evt, source, item);
    });

    dropdown_defineProperty(this, "handleActiveItemRendered", offsetTop => {
      if (this.props.options.length < 8 || !this._manualMove) {
        return;
      }

      let wrapper = this._contentWrapper.current;

      if (!wrapper) {
        this._manualMove = '';
        return;
      }

      let {
        height
      } = wrapper.getBoundingClientRect();

      if (offsetTop > height - 40 && this._manualMove === 'down') {
        wrapper.scrollTo(0, offsetTop + 40 - height);
      } else if (offsetTop < wrapper.scrollTop && this._manualMove === 'up') {
        wrapper.scrollTo(0, wrapper.scrollTop - 30);
      }

      this._manualMove = '';
    });

    dropdown_defineProperty(this, "renderList", options => {
      // the caller has guaranteed that the options is a non-null array
      const {
        display,
        grouped
      } = this.props;
      const {
        activeIdx
      } = this.state;
      this._currGroup = null;

      if (grouped && !this._groups) {
        // get the labels ready for insertion
        this._groups = {};
        options.forEach(option => {
          const key = Object(utils["getGroupKey"])(option);
          this._groups[key] = this._groups.hasOwnProperty(key) ? this._groups[key] + 1 : 1;
        });
      }

      return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(external_commonjs_react_commonjs2_react_amd_React_root_React_["Fragment"], null, options.map((item, idx) => {
        let count = 0;
        let key;

        if (grouped) {
          key = Object(utils["getGroupKey"])(item);

          if (idx === 0 || key !== this._currGroup) {
            this._currGroup = key;
            count = this._groups[key];
          }
        }

        return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(dropdownItem_DropdownItem, {
          key: `__option_item_${idx}`,
          currGroup: this._currGroup,
          count: count,
          display: display,
          idx: idx,
          isActive: activeIdx === idx,
          item: item,
          groupKey: key,
          onHighlight: this.handleHighlight,
          onItemSelection: this.handleItemSelection,
          onActiveItemRendered: this.handleActiveItemRendered
        });
      }));
    });

    dropdown_defineProperty(this, "renderShield", () => {
      if (!this.props.shield) {
        return null;
      }

      return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
        style: {
          position: 'absolute',
          display: 'default',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          textAlign: 'center',
          justifyContent: 'center',
          backgroundColor: '#F5F5F5',
          zIndex: 100000,
          opacity: 0.5,
          userSelect: 'none'
        },
        onClick: this.props.onShieldClick
      }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("h3", {
        style: {
          position: 'absolute',
          top: '50%',
          left: '0',
          textAlign: 'center',
          margin: '-12px 0 0 0',
          padding: 0,
          width: '100%',
          height: '100%'
        }
      }, "Loading ..."));
    });

    this._groups = null;
    this._currGroup = null;
    this._manualMove = '';
    this._contentWrapper = external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    let {
      length
    } = this.props.options;
    let idx = -1;

    if (prevProps.options.length !== length) {
      const item = prevProps.options[prevState.activeIdx];

      if (item) {
        const lastSource = Object(utils["getItemLabel"])(item);

        for (let i = 0; i < length; i++) {
          const source = Object(utils["getItemLabel"])(this.props.options[i]);

          if (source === lastSource) {
            idx = i;
            break;
          }
        }
      }
    }

    if (prevState.activeIdx >= length) {
      idx = length - 1;
    }

    if (idx >= 0) {
      this.setState({
        activeIdx: idx
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.shield !== nextProps.shield) {
      return true;
    }

    if (!nextState || this.state.activeIdx !== nextState.activeIdx) {
      return true;
    }

    if (!nextProps || this.props.options.length !== nextProps.options.length || this.props.open !== nextProps.open) {
      return true;
    }

    if (nextProps.options !== this.props.options) {
      this._groups = null;
      return true;
    }

    return false;
  }

  render() {
    if (!this.props.open) {
      return null;
    }

    let contents;

    if (this.props.options.length > 0) {
      contents = this.renderList(this.props.options);
    } else {
      const message = this.props.showRemoteMessage ? "Type to search" : "No options";
      contents = external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
        className: dropdown_classNames.noOption
      }, message);
    }

    return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
      onClick: this.props.onClick,
      className: dropdown_classNames.wrapper + " " + this.props.className
    }, this.renderShield(), external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
      className: dropdown_classNames.content,
      ref: this._contentWrapper
    }, contents));
  }

}

dropdown_defineProperty(dropdown_Dropdown, "propTypes", {
  display: prop_types_default.a.func,
  grouped: prop_types_default.a.bool,
  open: prop_types_default.a.bool,
  options: prop_types_default.a.arrayOf(prop_types_default.a.object),
  onClick: prop_types_default.a.func,
  onLoadMore: prop_types_default.a.func,
  onShieldClick: prop_types_default.a.func,
  shield: prop_types_default.a.bool,
  showRemoteMessage: prop_types_default.a.bool
});

dropdown_defineProperty(dropdown_Dropdown, "defaultProps", {
  options: []
});
// CONCATENATED MODULE: ./src/placeholder.js


const placeholderClass = "react-ahead__placeholder";
const valueModeClass = "react-ahead__placeholder-value-mode";
const placeholder_classNames = {
  wrapperStyle: shared_default.a[placeholderClass] || placeholderClass,
  valueModeStyle: shared_default.a[valueModeClass] || valueModeClass
};

const Placeholder = props => {
  if (!props.show || !props.text) {
    return null;
  }

  let wrapperStyle = placeholder_classNames.wrapperStyle;

  if (props.valueDisplayMode) {
    wrapperStyle += " " + placeholder_classNames.valueModeStyle;
  }

  return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
    className: wrapperStyle
  }, props.text);
};

/* harmony default export */ var src_placeholder = (Placeholder);
// CONCATENATED MODULE: ./src/icon.js


const iconClass = "react-ahead__action-icon";
const icon_classNames = {
  iconStyle: shared_default.a[iconClass] || iconClass
};

const ControlIcon = props => {
  let {
    size,
    viewBox
  } = props;

  if (!size) {
    size = "16";
  }

  if (!viewBox) {
    viewBox = "0 0 18 18";
  }

  return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
    "aria-hidden": "true",
    className: props.className,
    onClick: props.onClick,
    onKeyDown: props.onKeyDown,
    tabIndex: 0
  }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("svg", {
    x: "0px",
    y: "0px",
    width: size,
    height: size,
    viewBox: viewBox,
    focusable: "false",
    "aria-hidden": "true",
    className: icon_classNames.iconStyle
  }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("path", {
    d: props.path
  })));
};

/* harmony default export */ var icon = (ControlIcon);
// CONCATENATED MODULE: ./src/selection.js
function selection_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const containerClass = "react-ahead__selection-container";
const selection_contentClass = "react-ahead__selection-content";
const removalClass = "react-ahead__selection-removal";
const selection_classNames = {
  containerStyle: shared_default.a[containerClass] || containerClass,
  contentStyle: shared_default.a[selection_contentClass] || selection_contentClass,
  removalStyle: shared_default.a[removalClass] || removalClass
};
class selection_MultiSelection extends external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.Component {
  constructor(props) {
    super(props);

    selection_defineProperty(this, "handleRemovalKeydown", (evt, idx) => {
      if (!evt) {
        return;
      }

      const {
        keyCode
      } = evt;

      if (keyCode === 13 || keyCode === 32) {
        evt.preventDefault();
        this.props.onSelectionRemoval(evt, idx);
      }
    });

    selection_defineProperty(this, "renderItem", (item, idx) => {
      const key = `__sel_item_${idx}`;
      const title = Object(utils["getItemLabel"])(item);
      let content = this.props.display ? this.props.display(item, 'display') : title;

      if (typeof content === 'string' && content.length > 10) {
        content = content.substr(0, 8) + ' ...';
      }

      return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
        style: {
          overflow: "hidden",
          whiteSpace: "nowrap"
        },
        key: key
      }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
        className: selection_classNames.containerStyle
      }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
        title: title,
        className: selection_classNames.contentStyle
      }, content), external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(icon, {
        className: selection_classNames.removalStyle,
        path: "M 14.348 14.849 c -0.469 0.469 -1.229 0.469 -1.697 0 l -2.651 -3.03 l -2.651 3.029 c -0.469 0.469 -1.229 0.469 -1.697 0 c -0.469 -0.469 -0.469 -1.229 0 -1.697 l 2.758 -3.15 l -2.759 -3.152 c -0.469 -0.469 -0.469 -1.228 0 -1.697 s 1.228 -0.469 1.697 0 l 2.652 3.031 l 2.651 -3.031 c 0.469 -0.469 1.228 -0.469 1.697 0 s 0.469 1.229 0 1.697 l -2.758 3.152 l 2.758 3.15 c 0.469 0.469 0.469 1.229 0 1.698 Z",
        size: "12",
        onClick: evt => this.props.onSelectionRemoval(evt, idx),
        onKeyDown: evt => this.handleRemovalKeydown(evt, idx)
      })));
    });
  }

  render() {
    const {
      selection
    } = this.props;

    if (!Array.isArray(selection) || !selection.length) {
      return null;
    } // console.log(selection);


    return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.Fragment, null, selection.map((item, idx) => {
      return this.renderItem(item, idx);
    }));
  }

}

selection_defineProperty(selection_MultiSelection, "propTypes", {
  display: prop_types_default.a.func,
  selection: prop_types_default.a.arrayOf(prop_types_default.a.any),
  onSelectionRemoval: prop_types_default.a.func.isRequired
});
// CONCATENATED MODULE: ./src/actionIcons.js




const actionIcons_containerClass = "react-ahead__action-icons-container";
const separatorClass = "react-ahead__action-icons-separator";
const iconWrapperClass = "react-ahead__action-icons";
const actionIcons_classNames = {
  containerStyle: shared_default.a[actionIcons_containerClass] || actionIcons_containerClass,
  separatorStyle: shared_default.a[separatorClass] || separatorClass,
  iconWrapperStyle: shared_default.a[iconWrapperClass] || iconWrapperClass
};

const ActionIcons = props => {
  const handleKeyDown = (evt, action) => {
    const {
      keyCode
    } = evt || {};

    if (!keyCode) {
      return;
    }

    switch (keyCode) {
      case 13:
      case 32:
        if (action === 'clear') {
          props.onClear && props.onClear();
        } else if (action === 'dropdown') {
          props.onDropdown && props.onDropdown(true);
        }

        break;

      case 38:
      case 40:
        props.onSpecialKey && props.onSpecialKey('move', keyCode === 38 ? 'up' : 'down');
        break;

      case 9:
        if (action !== 'dropdown' || evt.shiftKey) {
          props.onSpecialKey && props.onSpecialKey('tab');
        }

        break;

      default:
        break;
    }
  };

  return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
    className: actionIcons_classNames.containerStyle
  }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(icon, {
    className: actionIcons_classNames.iconWrapperStyle,
    path: "M 14.348 14.849 c -0.469 0.469 -1.229 0.469 -1.697 0 l -2.651 -3.03 l -2.651 3.029 c -0.469 0.469 -1.229 0.469 -1.697 0 c -0.469 -0.469 -0.469 -1.229 0 -1.697 l 2.758 -3.15 l -2.759 -3.152 c -0.469 -0.469 -0.469 -1.228 0 -1.697 s 1.228 -0.469 1.697 0 l 2.652 3.031 l 2.651 -3.031 c 0.469 -0.469 1.228 -0.469 1.697 0 s 0.469 1.229 0 1.697 l -2.758 3.152 l 2.758 3.15 c 0.469 0.469 0.469 1.229 0 1.698 Z",
    onClick: _evt => props.onClear(),
    onKeyDown: evt => handleKeyDown(evt, 'clear')
  }), external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("span", {
    className: actionIcons_classNames.separatorStyle
  }), external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(icon, {
    className: actionIcons_classNames.iconWrapperStyle,
    path: "M 4.516 7.548 c 0.436 -0.446 1.043 -0.481 1.576 0 l 3.908 3.747 l 3.908 -3.747 c 0.533 -0.481 1.141 -0.446 1.574 0 c 0.436 0.445 0.408 1.197 0 1.615 c -0.406 0.418 -4.695 4.502 -4.695 4.502 c -0.217 0.223 -0.502 0.335 -0.787 0.335 s -0.57 -0.112 -0.789 -0.335 c 0 0 -4.287 -4.084 -4.695 -4.502 s -0.436 -1.17 0 -1.615 Z",
    onClick: _evt => props.onDropdown(),
    onKeyDown: evt => handleKeyDown(evt, 'dropdown')
  }));
};

ActionIcons.propTypes = {
  onClear: prop_types_default.a.func,
  onDropdown: prop_types_default.a.func
};
/* harmony default export */ var actionIcons = (ActionIcons);
// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return src_ReactAhead; });
function src_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











const src_containerClass = "react-ahead__control-container";
const src_wrapperClass = "react-ahead__control-wrapper";
const src_activeClass = "react-ahead__control-active";
const inputWrapperClass = "react-ahead__input-wrapper";
const src_classNames = {
  container: shared_default.a[src_containerClass] || src_containerClass,
  wrapper: shared_default.a[src_wrapperClass] || src_wrapperClass,
  active: shared_default.a[src_activeClass] || src_activeClass,
  inputWrapper: shared_default.a[inputWrapperClass] || inputWrapperClass
};
/**
 * The React UI for the auto-complete control
 */

class src_ReactAhead extends external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.Component {
  constructor(props) {
    super(props);

    src_defineProperty(this, "state", {
      dropdownOpen: false,
      inputWidth: 2,
      options: [],
      selection: [],
      shield: false,
      value: ''
    });

    src_defineProperty(this, "getSelection", () => {
      return this.state.selection;
    });

    src_defineProperty(this, "groupOptions", options => {
      if (!Array.isArray(options) || !options.length) {
        return options || [];
      }

      options.sort((a, b) => {
        let ag = a['group'];
        let bg = b['group'];

        if (ag === bg) {
          return 0;
        }

        if (ag === null || ag === undefined) {
          return -1;
        }

        if (bg === null || bg === undefined) {
          return 1;
        }

        if (typeof ag !== 'string') {
          ag = ag.toString();
        }

        if (typeof bg !== 'string') {
          bg = bg.toString();
        }

        if (ag < bg) {
          return -1;
        }

        return 1;
      });
      return options;
    });

    src_defineProperty(this, "getOptions", (options = [], selection, group) => {
      if (!selection) {
        selection = this.state.selection;
      }

      if (options.length === 0) {
        return options;
      }

      if (group) {
        options = this.groupOptions(options);
      }

      if (!selection || !selection.length) {
        return options;
      }

      return options.filter(item => {
        const label = Object(utils["getItemLabel"])(item);
        return !this._selKeys.hasOwnProperty(label);
      });
    });

    src_defineProperty(this, "moveCursor", side => {
      if (!this.state.dropdownOpen || !side) {
        return;
      }

      this._dropdown && this._dropdown.current && this._dropdown.current.handleCursorMove(side);
    });

    src_defineProperty(this, "handleEntryChanged", (_evt, value, width) => {
      // console.log('entry change???', value);
      if (typeof value !== 'string') {
        value = value.toString();
      }

      if (value === this.state.value) {
        // nothing has changed
        if (this.state.shield) {
          this.setState({
            shield: false
          });
        }

        return;
      }

      value = value.trimStart();
      let state = {
        dropdownOpen: true,
        inputWidth: width,
        shield: true,
        value
      };

      if (value !== '') {
        this._engine.find(value.trimEnd(), !!this.props.remote, options => {
          if (this.props.grouped) {
            options = this.groupOptions(options);
          } // cache the original search results, before being filtered


          this._lastSearch = options; // filter: against current selections, and since we've alraedy
          //         handled the grouping use case, always set group parameter 
          //         to false.

          options = this.getOptions(options, this.state.selection, false);
          this._lastVal = {
            value,
            options
          };
          this.setState({
            options,
            shield: false
          });
        });
      } else {
        state['options'] = this.getOptions(this.props.initOptions, null, this.props.grouped);
        this._lastVal = {
          value,
          options: state['options']
        };
        state['shield'] = false;
      }

      this.setState(state);
    });

    src_defineProperty(this, "handleKeepFocus", evt => {
      this._focusType = 2;
      this._initDropdownState = this.state.dropdownOpen;
    });

    src_defineProperty(this, "handleControlFocus", evt => {
      // console.log('focus input ...');
      this._input && this._input.current && this._input.current.focus();
    });

    src_defineProperty(this, "handleKeyAction", (key, info) => {
      switch (key) {
        case 'enter':
          this._dropdown && this._dropdown.current && this._dropdown.current.select();
          break;

        case 'tab':
          this._focusType = 4;
          break;

        case 'up':
        case 'down':
          this.moveCursor(key);
          break;

        case 'move':
          this.handleControlFocus();

          if (this.state.dropdownOpen) {
            // only respect the cursor move if the dropdown is still open
            setTimeout(() => this.moveCursor(info), 0);
          }

          break;

        case 'esc':
          this.setState({
            dropdownOpen: false
          });
          break;

        case 'backspace':
          if (this.props.isMulti && this.state.selection.length > 0) {
            this.handleSelectionRemoval(null, this.state.selection.length - 1, true);
          }

          break;

        default:
          break;
      }
    });

    src_defineProperty(this, "handleGetFocus", evt => {
      // console.log('get focus ... ', this._focusType);
      switch (this._focusType) {
        case 0:
        case 2:
          this._focusType = 1;
          let value,
              options = this.state.options;

          if (this._lastVal) {
            value = this._lastVal['value'];
            options = this._lastVal['options'];
          }

          this.setState({
            value,
            options,
            dropdownOpen: true // open with full values

          });
          break;

        case 1:
          // really losing focus
          this.setState({
            dropdownOpen: true // open with full values

          });
          return;

        case 3:
        case 4:
          //reset focus only
          this._focusType = 1;
          return;

        default:
          break;
      }
    });

    src_defineProperty(this, "handleLoseFocus", evt => {
      // console.log('lose focus ... ', this._focusType);
      switch (this._focusType) {
        case 2:
          // clicked within the control, the focus type will remain
          this._focusType = 1;
          break;

        case 3:
          // clicked within the dropdown menu, make sure the focus will move back
          this._focusType = 1;
          this.handleControlFocus(evt);
          break;

        case 4:
          // moving focus between sub-components
          break;

        default:
          this._focusType = 0;
          this.setState({
            value: '',
            dropdownOpen: false
          });
          break;
      }
    });

    src_defineProperty(this, "handleSelectionAddition", (evt, source, item) => {
      if (!source || this._selKeys.hasOwnProperty(source)) {
        return;
      }

      let {
        selection
      } = this.state;
      this._lastVal = null;

      if (this.props.isCreateable && item['__itemType'] === 'created' && this.props.onItemCreated) {
        // adding any extra information to the created item
        item = Object.assign(item, this.props.onItemCreated(source)); // maintain the 'source' property

        if (item['source'] !== source) {
          item['source'] = source;
        }
      } // add the selection to the list


      if (this.props.isMulti) {
        selection.push(item);
        this._selKeys[source] = null;
      } else {
        selection = [item];
        this._selKeys = {};
        this._selKeys[source] = null;
      } // set focus type to prepare for transferring the focus


      this._focusType = 1;
      this.handleControlFocus(evt); // console.log('addition', selection, source, item, this._selKeys);
      // close the dropdown for now

      this.setState({
        options: this.getOptions(this.props.initOptions, selection, this.props.grouped),
        selection,
        value: ''
      }); // acknowledge the selection change

      this.props.onSelectionChange && this.props.onSelectionChange(selection);
    });

    src_defineProperty(this, "handleSelectionRemoval", (_evt, idx, inPlaceRemoval) => {
      if (!this.props.isMulti) {
        return;
      }

      let {
        selection,
        options,
        value
      } = this.state;

      if (!selection || idx >= selection.length) {
        return;
      }

      let [item] = selection.splice(idx, 1);
      delete this._selKeys[Object(utils["getItemLabel"])(item)];

      if (value !== '') {
        // rerun the value
        options = this.getOptions(this._lastSearch || [], selection);
      } else {
        options = this.getOptions(this.props.initOptions, selection, this.props.grouped);
      } // update stores


      if (!inPlaceRemoval) {
        this._focusType = 4;
      }

      this._lastVal = {
        value,
        options
      }; // update state

      this.setState({
        selection,
        options
      }); // acknowledge the selection change

      this.props.onSelectionChange && this.props.onSelectionChange(selection);
    });

    src_defineProperty(this, "handleClear", () => {
      this._focusType = 2;
      this._lastVal = null;
      this._selKeys = {};
      let state = {
        value: '',
        selection: [],
        options: !this.props.grouped ? this.props.initOptions : this.groupOptions(this.props.initOptions),
        inputWidth: this.state.inputWidth
      };

      if (this.state.value !== '') {
        state.inputWidth = this._input && this._input.current && this._input.current.clear();
      }

      this.handleControlFocus();
      this.setState(state);
    });

    src_defineProperty(this, "handleDropdownOpen", force => {
      // console.log('drop down action:', force, this._initDropdownState);
      if (force) {
        // only happens when clicking / typing on the dropdown menu button
        const {
          dropdownOpen
        } = this.state;
        this.setState({
          dropdownOpen: !dropdownOpen
        });
        return;
      }

      if (this._initDropdownState) {
        let {
          value,
          options
        } = this.state;
        setTimeout(() => {
          this._lastVal = {
            value,
            options
          };
          this.setState({
            value: '',
            dropdownOpen: false
          });
        }, 0);
      }
    });

    src_defineProperty(this, "handleShieldClick", evt => {
      evt && evt.preventDefault();
      this._focusType = 4;
      this.handleControlFocus();
    });

    src_defineProperty(this, "handleLoadMore", () => {//todo: if there are more to load for the options, communicate with the remote
      //      to do so
    });

    src_defineProperty(this, "renderInput", () => {
      const {
        displayFormatter,
        isMulti,
        placeholder
      } = this.props;
      const {
        selection,
        inputWidth,
        value
      } = this.state;
      const singleSelDone = !isMulti && selection.length === 1;
      let text;

      if (singleSelDone) {
        text = Object(utils["getItemLabel"])(selection[0]);

        if (displayFormatter) {
          text = displayFormatter(text, selection[0], 'display');
        }
      } else {
        text = placeholder;
      }

      return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
        className: src_classNames.inputWrapper
      }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(src_placeholder, {
        show: placeholder && selection.length === 0 && !value || singleSelDone && !value,
        text: text,
        valueDisplayMode: singleSelDone
      }), isMulti ? external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(selection_MultiSelection, {
        selection: selection,
        onSelectionRemoval: this.handleSelectionRemoval
      }) : null, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(input_Input, {
        inputWidth: inputWidth,
        ref: this._input,
        onEntryChange: this.handleEntryChanged,
        onSpecialKey: this.handleKeyAction,
        value: value
      }));
    });

    this._input = external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createRef();
    this._dropdown = external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createRef();
    this._focusType = 0;
    this._lastVal = null;
    this._lastSearch = null;
    this._initDropdownState = false;
    this._selKeys = {};
    this._engine = new SearchEngine({
      remote: props.remote
    });

    if (Array.isArray(props.initOptions) && props.initOptions.length > 0) {
      this.state.options = !props.grouped ? props.initOptions : this.groupOptions(props.initOptions);

      this._engine.add(this.state.options);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.grouped !== this.props.grouped && this.props.grouped) {
      let {
        options
      } = this.state;
      this.setState({
        options: this.groupOptions(options)
      });
    }

    if (prevProps.remote !== this.props.remote) {
      this._engine.setOption('remote', remote);
    }
  }

  render() {
    const {
      className,
      customClassNames,
      displayFormatter,
      grouped,
      isCreateable
    } = this.props;
    const {
      dropdownOpen,
      shield,
      value
    } = this.state;
    let options;

    if (isCreateable && this.state.value) {
      options = [...this.state.options]; // don't add the createable if there're exact matches

      let exactMatch = false;

      for (let i = 0; i < options.length; i++) {
        if (this.state.value === options[i]['source']) {
          exactMatch = true;
          break;
        }
      }

      if (!exactMatch) {
        options.push({
          source: `Create ${this.state.value}`,
          __itemType: 'created',
          __createdValue: this.state.value
        });
      }
    } else {
      options = this.state.options || [];
    }

    let wrapperClassName = (className || '') + " " + src_classNames.container;
    let inputClassName = (customClassNames.input || '') + " " + src_classNames.wrapper;

    if (this._focusType !== 0) {
      inputClassName = (customClassNames.active || src_classNames.active) + " " + inputClassName;
    }

    return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
      className: wrapperClassName,
      onMouseDown: this.handleKeepFocus
    }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
      style: {
        display: shield ? 'default' : 'none',
        width: '100%',
        height: '100%',
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100000
      },
      onClick: this.handleShieldClick
    }), external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
      className: inputClassName,
      onClick: this.handleControlFocus,
      onFocus: this.handleGetFocus,
      onBlur: this.handleLoseFocus
    }, this.renderInput(), external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(actionIcons, {
      onClear: this.handleClear,
      onDropdown: this.handleDropdownOpen,
      onSpecialKey: this.handleKeyAction
    })), external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(dropdown_Dropdown, {
      ref: this._dropdown,
      className: customClassNames.dropdown,
      display: displayFormatter,
      grouped: grouped,
      open: dropdownOpen,
      options: options,
      onSelection: this.handleSelectionAddition,
      onLoadMore: this.handleLoadMore,
      onShieldClick: this.handleShieldClick,
      shield: shield,
      showRemoteMessage: !!this.props.remote && !value
    }));
  }

}

src_defineProperty(src_ReactAhead, "propTypes", {
  /**
   * An object containing the custom class names that we shall apply for 
   * each component of the control. Avaliable fields are: 
   * - `input`: for the input control
   * - `active`: for the input control but applied when the control has focus
   * - `dropdown`: for the dropdown menu
   * 
   * Example:
   * <ReactAhead
   *   customClassNames={{
   *     active: "app-control-active",
   *     input: "app-control-input",
   *     dropdown: "app-control-dropdown",
   *   }}
   * />
   */
  customClassNames: prop_types_default.a.object,

  /**
   * The index number of the option that shall be treated as the default value
   * to the control.
   */
  default: prop_types_default.a.number,

  /**
   * A callback function for generating display text for options and values. 
   * 
   * If supplied, it will be invoked on the following occasions to generate 
   * a customizable text (or React component) that shall be used as the 
   * display content to the end user:
   * 
   * a) when rendering options in the dropdown menu;
   * b) when a selection has been made;
   * 
   * The function takes 2 parameters:
   * 
   * 1) `item` -- the item (either string, number, or object, whichever provided
   *              by the `initOption` or fetched from remote) that to be 
   *              rendered.
   * 2) `type` -- enumerate, possible values: 'display' or 'option', the former 
   *              indeicates that the rendered content will be for the selected
   *              item, while the later denotes to the items to be rendered in 
   *              the dropdown options menu.
   */
  displayFormatter: prop_types_default.a.func,

  /**
   * Indicate if we shall display options in the dropdown menu in the grouped
   * mode. Requires `options` data to contain the `group` property.
   */
  grouped: prop_types_default.a.bool,

  /**
   * Indicate if we allow user created options to appear and selectable
   */
  isCreateable: prop_types_default.a.bool,

  /**
   * Indicate if we allow mulitple value selections for the control
   */
  isMulti: prop_types_default.a.bool,

  /**
   * An array of the options to be displayed as the initial values. You must provide
   * either `initOptions`, or the remote option such that we can fetch the options
   * from the remote server
   */
  initOptions: prop_types_default.a.arrayOf(prop_types_default.a.object),

  /**
   * Callback function which will be invoked when a selection change has been made,
   * it can be either an addition or deletion.
   */
  onSelectionChange: prop_types_default.a.func,

  /**
   * An object containing the necessary information to contact a remote server for
   * options. TODO: more info ...
   */
  remote: prop_types_default.a.object
});

src_defineProperty(src_ReactAhead, "defaultProps", {
  customClassNames: {
    input: '',
    dropdown: '',
    active: ''
  }
});

/***/ })
/******/ ]);
});
//# sourceMappingURL=main.js.map