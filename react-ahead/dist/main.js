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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
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
  module.exports = __webpack_require__(4)();
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(6);
            var content = __webpack_require__(7);

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

const getItemLabel = item => {
  let src = typeof item === 'object' ? item['source'] : item;

  if (typeof src !== 'string') {
    src = src.toString();
  }

  return src;
};

module.exports = {
  getItemLabel
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(5);

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
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "._2dH7OUMw0ESmltDd0ovClD {\r\n  position: relative;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.Axrtb5jaHtP98cGxAqRLV {\r\n  -webkit-box-align: center;\r\n  -webkit-box-pack: justify;\r\n  padding-left: 6px;\r\n  padding-right: 2px;\r\n  min-height: 38px;\r\n  align-items: center;\r\n  background-color: rgb(255, 255, 255);\r\n  border-radius: 2px;\r\n  border: 1px solid rgb(204, 204, 204);\r\n  cursor: default;\r\n  position: relative;\r\n  box-sizing: border-box;\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  justify-content: space-between;\r\n  transition: all 100ms ease 0s;\r\n  outline: 0px !important;\r\n}\r\n\r\n._2SUkorElgQ76JGjtyHk4de {\r\n  border: 1px solid blue;\r\n}\r\n\r\n._1Vnmg2rKay_EA99qawmFda {\r\n  padding: 2px;\r\n  color: rgb(51, 51, 51);\r\n  position: relative;\r\n  display: flex;\r\n  flex: 1 1 0%;\r\n  flex-wrap: wrap;\r\n  box-sizing: border-box;\r\n  overflow: hidden;\r\n  visibility: visible;\r\n  box-sizing: border-box;\r\n  width: 100%;\r\n}\r\n\r\n._2CD9QkPe0_ZMyoTQxtKBm7 {\r\n  position: absolute;\r\n  top: 50%;\r\n  color: rgb(128, 128, 128);\r\n  margin: 0;\r\n  transform: translateY(-50%);\r\n  box-sizing: border-box;\r\n}\r\n\r\n.xLIYtwgLVzX9AyYwVcgLt {\r\n  color: inherit;\r\n}\r\n\r\n._1Vnmg2rKay_EA99qawmFda {  \r\n  cursor: text;\r\n  width: 100%;\r\n}\r\n\r\n._2eDYrfCE1goL3V_2ogtQtz {\r\n  background-color: rgb(230, 230, 230);\r\n  display: flex;\r\n  min-width: 0px;\r\n  box-sizing: border-box;\r\n  border-radius: 2px;\r\n  margin: 2px 4px 2px 0;\r\n}\r\n\r\n._1tWm_bFu71IXItBd0OXrpP {\r\n  color: rgb(51, 51, 51);\r\n  font-size: 85%;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  box-sizing: border-box;\r\n  border-radius: 2px;\r\n  overflow: hidden;\r\n  padding: 2px 3px 4px 6px;\r\n}\r\n\r\n._2jKHZpiKI_7YyEyQXA1yMk {\r\n  -webkit-box-align: center;\r\n  align-items: center;\r\n  cursor: pointer;\r\n  display: flex;\r\n  padding-left: 4px;\r\n  padding-right: 4px;\r\n  box-sizing: border-box;\r\n  border-radius: 2px;\r\n}\r\n\r\n._2jKHZpiKI_7YyEyQXA1yMk:hover {\r\n  background-color: rgb(255, 189, 173);\r\n  color: rgb(222, 53, 11);\r\n}\r\n\r\n._2U9LCKIK4vRQWtopGpYhPl {\r\n  -webkit-box-align: center;\r\n  align-items: center;\r\n  align-self: stretch;\r\n  display: flex;\r\n  flex-shrink: 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\n._25xAyedeXMtrf4T3ed1PJt {\r\n  color: rgb(204, 204, 204);\r\n  display: flex;\r\n  box-sizing: border-box;\r\n  padding: 10px 6px;\r\n  transition: color 150ms ease 0s;\r\n}\r\n\r\n._25xAyedeXMtrf4T3ed1PJt:hover {\r\n  cursor: pointer;\r\n  color: rgb(153, 153, 153);\r\n}\r\n\r\n._25xAyedeXMtrf4T3ed1PJt:focus {\r\n  color: rgb(153, 153, 153);\r\n  outline: 2px dotted gray;\r\n}\r\n\r\n.k1UudnI1h5npE3btdwIY1 {\r\n  display: inline-block;\r\n  fill: currentcolor;\r\n  line-height: 1;\r\n  stroke: currentcolor;\r\n  stroke-width: 0;\r\n}\r\n\r\n._1fXbnnAsavNrQXwBYoNqlw {\r\n  align-self: stretch;\r\n  background-color: rgb(204, 204, 204);\r\n  margin-bottom: 8px;\r\n  margin-top: 8px;\r\n  width: 1px;\r\n  box-sizing: border-box;\r\n}\r\n\r\n._3etkCiSEHj9rBdr3HP7hoI {\r\n  top: 100%;\r\n  background-color: rgb(255, 255, 255);\r\n  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 11px;\r\n  margin-bottom: 1px;\r\n  margin-top: 1px;\r\n  position: absolute;\r\n  width: 100%;\r\n  z-index: 1;\r\n  box-sizing: border-box;\r\n  border-radius: 2px;\r\n}\r\n\r\n._2BZ6P2ChebiTM94M-OMhZD {\r\n  max-height: 300px;\r\n  overflow-y: auto;\r\n  padding-bottom: 2px;\r\n  padding-top: 2px;\r\n  position: relative;\r\n  box-sizing: border-box;\r\n}\r\n\r\n._1V1IQxhU17EfSxmz_iTN5t {\r\n  color: rgb(153, 153, 153);\r\n  text-align: center;\r\n  box-sizing: border-box;\r\n  padding: 6px 12px;\r\n}\r\n\r\n._1D9Xo5PbA8nnizD0GLeBxM {\r\n  background-color: transparent;\r\n  color: inherit;\r\n  cursor: default;\r\n  display: block;\r\n  font-size: inherit;\r\n  width: 100%;\r\n  user-select: none;\r\n  box-sizing: border-box;\r\n  padding: 4px 12px;\r\n}\r\n\r\n._12tsaEmF9_7NK7pihcgxJw {\r\n  background-color: rgb(222, 235, 255);\r\n}\r\n\r\n._3khQpvMiBoqHO8CsroCjVi {\r\n  color: rgb(153, 153, 153);\r\n  cursor: default;\r\n  display: block;\r\n  font-size: 75%;\r\n  font-weight: 500;\r\n  margin-bottom: 0.25em;\r\n  padding: 2px 12px;\r\n  text-transform: uppercase;\r\n  box-sizing: border-box;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n}\r\n\r\n._2fvgAdZ635qKwR24y2XIFT {\r\n  background-color: #EBECF0;\r\n  border-radius: 1em;\r\n  color: #172B4D;\r\n  display: inline-block;\r\n  font-size: 10;\r\n  font-weight: normal;\r\n  line-height: 1;\r\n  text-align: center;\r\n  min-width: 1;\r\n  padding: 0.16666666666667em 0.5em;\r\n}\r\n", ""]);
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
	"react-ahead__menu-content": "_2BZ6P2ChebiTM94M-OMhZD",
	"react-ahead__menu-no-option": "_1V1IQxhU17EfSxmz_iTN5t",
	"react-ahead__menu-option": "_1D9Xo5PbA8nnizD0GLeBxM",
	"react-head__menu-active-option": "_12tsaEmF9_7NK7pihcgxJw",
	"react-ahead__group-label": "_3khQpvMiBoqHO8CsroCjVi",
	"react-ahead__group-label-icon": "_2fvgAdZ635qKwR24y2XIFT"
};
module.exports = exports;


/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"commonjs":"react","commonjs2":"react","amd":"React","root":"React"}
var external_commonjs_react_commonjs2_react_amd_React_root_React_ = __webpack_require__(0);
var external_commonjs_react_commonjs2_react_amd_React_root_React_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_react_commonjs2_react_amd_React_root_React_);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(1);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// CONCATENATED MODULE: ./src/engine.js
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NativeEngine {
  constructor(props) {
    _defineProperty(this, "add", data => {
      if (!Array.isArray(data) || !data.length) {
        return;
      }

      this._store.push(...data);
    });

    _defineProperty(this, "query", val => {
      if (typeof val !== 'string') {
        val = val.toString();
      }

      return this._store.filter(data => data.source && data.source.indexOf(val) >= 0);
    });

    this._props = props;
    this._store = [];
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

    _defineProperty(this, "find", (val, cb) => {
      if (this._debounce) {
        clearTimeout(this._debounce);
        this._debounce = null;
      }

      this._debounce = setTimeout(() => {
        clearTimeout(this._debounce);
        this._debounce = null;
        cb(this._engine.query(val));
      }, 36);
    });

    this._engine = null;
    this._debounce = null;

    if (props && props.engine) {
      this._engine = props.engine;
    } else {
      this._engine = new NativeEngine(props);
    }
  }

}
// EXTERNAL MODULE: ./src/shared.css
var shared = __webpack_require__(2);
var shared_default = /*#__PURE__*/__webpack_require__.n(shared);

// CONCATENATED MODULE: ./src/input.js
function input_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const inputClass = "react-ahead__input-inner-wrapper";
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
          this.props.onSelectionMove(evt, keyCode === 38 ? "up" : "down");
          break;

        default:
          break;
      }
    });

    this._div = external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createRef();
    this._input = external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createRef();
    this._inputStyle = shared_default.a[inputClass] || inputClass;
  }

  render() {
    return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
      style: {
        display: "inline-block"
      },
      className: this._inputStyle
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
  onSelectionMove: prop_types_default.a.func.isRequired,
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

const GroupLabel = props => {
  const groupStyles = shared_default.a[groupLabelClass] || groupLabelClass;
  const groupIconStyles = shared_default.a[groupLabelIconClass] || groupLabelIconClass;
  return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
    className: groupStyles
  }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("span", null, props.label || 'Default'), external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("span", {
    className: groupIconStyles
  }, props.count || 0));
};

/* harmony default export */ var groupLabel = (GroupLabel);
// EXTERNAL MODULE: ./src/utils.js
var utils = __webpack_require__(3);

// CONCATENATED MODULE: ./src/dropdown.js
function dropdown_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const wrapperClass = "react-ahead__menu-wrapper";
const contentClass = "react-ahead__menu-content";
const noOptionClass = "react-ahead__menu-no-option";
const optionClass = "react-ahead__menu-option";
const activeClass = "react-head__menu-active-option";
const defaultGroupName = 'default';
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

    dropdown_defineProperty(this, "getGroupKey", item => {
      let groupKey = typeof item === 'object' ? item['group'] : defaultGroupName;

      if (typeof groupKey !== 'string' && typeof groupKey !== 'number') {
        groupKey = defaultGroupName;
      }

      groupKey = groupKey.toString() || defaultGroupName;
      return groupKey.toUpperCase();
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
      let groups = {};
      let currGroup;

      if (grouped) {
        // get the labels ready for insertion
        options.forEach(option => {
          const key = this.getGroupKey(option);
          groups[key] = groups.hasOwnProperty(key) ? groups[key] + 1 : 1;
        });
      }

      return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(external_commonjs_react_commonjs2_react_amd_React_root_React_["Fragment"], null, options.map((item, idx) => {
        const source = Object(utils["getItemLabel"])(item);
        const content = display ? display(item, 'option') : source;
        const optionItem = external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
          className: activeIdx === idx ? this._classNames.active : this._classNames.option,
          key: `__option_item_${source + idx}`,
          tabIndex: -1,
          onMouseOverCapture: evt => this.handleHighlight(evt, idx),
          onClick: evt => this.handleItemSelection(evt, source, item)
        }, content);

        if (grouped) {
          const key = this.getGroupKey(item);

          if (idx === 0 || key !== currGroup) {
            currGroup = key;
            return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(external_commonjs_react_commonjs2_react_amd_React_root_React_["Fragment"], {
              key: `__option_label_${key}`
            }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(groupLabel, {
              label: key,
              count: groups[key]
            }), optionItem);
          }
        }

        return optionItem;
      }));
    });

    this._classNames = {
      wrapper: shared_default.a[wrapperClass] || wrapperClass,
      content: shared_default.a[contentClass] || contentClass,
      noOption: shared_default.a[noOptionClass] || noOptionClass,
      option: shared_default.a[optionClass] || optionClass,
      active: shared_default.a[activeClass] && `${shared_default.a[activeClass]} ${shared_default.a[optionClass]}` || `${activeClass} ${optionClass}`
    };
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
    if (!nextState || this.state.activeIdx !== nextState.activeIdx) {
      return true;
    }

    if (!nextProps || this.props.options.length !== nextProps.options.length || this.props.open !== nextProps.open) {
      return true;
    }

    for (let i = 0; i < this.props.options.length; i++) {
      if (this.props.options[i] !== nextProps.options[i]) {
        return true;
      }
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
      contents = external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
        className: this._classNames.noOption
      }, "No options");
    }

    return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
      onClick: this.props.onClick,
      className: this._classNames.wrapper + " " + this.props.className
    }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
      style: {
        display: this.props.shield ? 'default' : 'none',
        width: '100%',
        height: '100%',
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100000
      }
    }), external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
      className: this._classNames.content
    }, contents));
  }

}

dropdown_defineProperty(dropdown_Dropdown, "propTypes", {
  display: prop_types_default.a.func,
  grouped: prop_types_default.a.bool,
  isCreateable: prop_types_default.a.bool,
  options: prop_types_default.a.arrayOf(prop_types_default.a.object),
  onClick: prop_types_default.a.func,
  onLoadMore: prop_types_default.a.func,
  shield: prop_types_default.a.bool
});

dropdown_defineProperty(dropdown_Dropdown, "defaultProps", {
  options: []
});
// CONCATENATED MODULE: ./src/placeholder.js


const placeholderClass = "react-ahead__placeholder";
const valueModeClass = "react-ahead__placeholder-value-mode";

const Placeholder = props => {
  if (!props.show || !props.text) {
    return null;
  }

  let wrapperStyle = shared_default.a[placeholderClass] || placeholderClass;

  if (props.valueDisplayMode) {
    wrapperStyle += " " + (shared_default.a[valueModeClass] || valueModeClass);
  }

  return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
    className: wrapperStyle
  }, props.text);
};

/* harmony default export */ var src_placeholder = (Placeholder);
// CONCATENATED MODULE: ./src/icon.js


const iconClass = "react-ahead__action-icon";

const ControlIcon = props => {
  const iconStyle = shared_default.a[iconClass] || iconClass;
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
    className: iconStyle
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
        className: this._containerStyle
      }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
        title: title,
        className: this._contentStyle
      }, content), external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(icon, {
        className: this._removalStyle,
        path: "M 14.348 14.849 c -0.469 0.469 -1.229 0.469 -1.697 0 l -2.651 -3.03 l -2.651 3.029 c -0.469 0.469 -1.229 0.469 -1.697 0 c -0.469 -0.469 -0.469 -1.229 0 -1.697 l 2.758 -3.15 l -2.759 -3.152 c -0.469 -0.469 -0.469 -1.228 0 -1.697 s 1.228 -0.469 1.697 0 l 2.652 3.031 l 2.651 -3.031 c 0.469 -0.469 1.228 -0.469 1.697 0 s 0.469 1.229 0 1.697 l -2.758 3.152 l 2.758 3.15 c 0.469 0.469 0.469 1.229 0 1.698 Z",
        size: "12",
        onClick: evt => this.props.onSelectionRemoval(evt, idx),
        onKeyDown: evt => this.handleRemovalKeydown(evt, idx)
      })));
    });

    this._containerStyle = shared_default.a[containerClass] || containerClass;
    this._contentStyle = shared_default.a[selection_contentClass] || selection_contentClass;
    this._removalStyle = shared_default.a[removalClass] || removalClass;
  }

  render() {
    const {
      selection
    } = this.props;

    if (!Array.isArray(selection) || !selection.length) {
      return null;
    }

    console.log(selection);
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

const ActionIcons = props => {
  const containerStyle = shared_default.a[actionIcons_containerClass] || actionIcons_containerClass;
  const separatorStyle = shared_default.a[separatorClass] || separatorClass;
  const iconWrapperStyle = shared_default.a[iconWrapperClass] || iconWrapperClass;

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
        props.onSpecialKey && props.onSpecialKey('move', keyCode === 38);
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
    className: containerStyle
  }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(icon, {
    className: iconWrapperStyle,
    path: "M 14.348 14.849 c -0.469 0.469 -1.229 0.469 -1.697 0 l -2.651 -3.03 l -2.651 3.029 c -0.469 0.469 -1.229 0.469 -1.697 0 c -0.469 -0.469 -0.469 -1.229 0 -1.697 l 2.758 -3.15 l -2.759 -3.152 c -0.469 -0.469 -0.469 -1.228 0 -1.697 s 1.228 -0.469 1.697 0 l 2.652 3.031 l 2.651 -3.031 c 0.469 -0.469 1.228 -0.469 1.697 0 s 0.469 1.229 0 1.697 l -2.758 3.152 l 2.758 3.15 c 0.469 0.469 0.469 1.229 0 1.698 Z",
    onClick: _evt => props.onClear(),
    onKeyDown: evt => handleKeyDown(evt, 'clear')
  }), external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("span", {
    className: separatorStyle
  }), external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(icon, {
    className: iconWrapperStyle,
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

    src_defineProperty(this, "getOptions", (options, selection, group) => {
      if (!selection) {
        selection = this.state.selection;
      }

      if (group) {
        options = this.groupOptions(options);
      }

      if (!selection || !selection.length) {
        return options;
      }

      return options.filter(item => {
        if (typeof item === 'object') {
          return !this._selKeys.hasOwnProperty(item['source']);
        }

        return !this._selKeys.hasOwnProperty(item);
      });
    });

    src_defineProperty(this, "handleEntryChanged", (_evt, value, width) => {
      // console.log('entry change???', value);
      if (typeof value !== 'string') {
        value = value.toString();
      }

      if (value === this.state.value) {
        // nothing has changed
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
        this._engine.find(value.trimEnd(), options => {
          // cache the original search results, before being filtered
          this._lastSearch = options; // filter 

          options = this.getOptions(options);
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
      }

      this.setState(state);
    });

    src_defineProperty(this, "handleSelectionMove", (_evt, side) => {
      if (!this.state.dropdownOpen) {
        return;
      }

      this._dropdown && this._dropdown.current && this._dropdown.current.handleCursorMove(side);
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

        case 'move':
          this.handleControlFocus();

          if (this.state.dropdownOpen) {
            // only respect the cursor move if the dropdown is still open
            setTimeout(() => this.handleSelectionMove(info ? 'up' : 'down'), 0);
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
      this.handleControlFocus(evt);
      console.log('addition', selection, source, item, this._selKeys); // close the dropdown for now

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
      };
      console.log('remove', selection); // update state

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
      console.log('drop down action:', force, this._initDropdownState);

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
        text = selection[0];

        if (typeof text === 'object') {
          text = text['source'].toString();
        } else {
          text = text.toString();
        }

        if (displayFormatter) {
          text = displayFormatter(text, 'display');
        }
      } else {
        text = placeholder;
      }

      return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
        className: this._classNames.inputWrapper
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
        onSelectionMove: this.handleSelectionMove,
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
    this._engine = new SearchEngine();

    if (Array.isArray(props.initOptions) && props.initOptions.length > 0) {
      this.state.options = !props.grouped ? props.initOptions : this.groupOptions(props.initOptions);

      this._engine.add(this.state.options);
    }

    this._classNames = {
      container: shared_default.a[src_containerClass] || src_containerClass,
      wrapper: shared_default.a[src_wrapperClass] || src_wrapperClass,
      active: shared_default.a[src_activeClass] || src_activeClass,
      inputWrapper: shared_default.a[inputWrapperClass] || inputWrapperClass
    };
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
      shield
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

    let wrapperClassName = (className || '') + " " + this._classNames.container;
    let inputClassName = (customClassNames.input || '') + " " + this._classNames.wrapper;

    if (this._focusType !== 0) {
      inputClassName = (customClassNames.active || this._classNames.active) + " " + inputClassName;
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
      }
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
      shield: shield
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