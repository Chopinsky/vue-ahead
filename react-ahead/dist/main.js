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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(5);
            var content = __webpack_require__(6);

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
/* 2 */
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
  module.exports = __webpack_require__(3)();
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(4);

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
/* 4 */
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
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(7);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "._2dH7OUMw0ESmltDd0ovClD {\r\n  position: relative;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.Axrtb5jaHtP98cGxAqRLV {\r\n  -webkit-box-align: center;\r\n  -webkit-box-pack: justify;\r\n  padding-left: 6px;\r\n  padding-right: 2px;\r\n  min-height: 38px;\r\n  align-items: center;\r\n  background-color: rgb(255, 255, 255);\r\n  border-radius: 2px;\r\n  border: 1px solid rgb(204, 204, 204);\r\n  cursor: default;\r\n  position: relative;\r\n  box-sizing: border-box;\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  justify-content: space-between;\r\n  transition: all 100ms ease 0s;\r\n  outline: 0px !important;\r\n}\r\n\r\n._1Vnmg2rKay_EA99qawmFda {\r\n  padding: 2px;\r\n  color: rgb(51, 51, 51);\r\n  position: relative;\r\n  display: flex;\r\n  flex: 1 1 0%;\r\n  flex-wrap: wrap;\r\n  box-sizing: border-box;\r\n  overflow: hidden;\r\n  visibility: visible;\r\n  box-sizing: border-box;\r\n  width: 100%;\r\n}\r\n\r\n._2CD9QkPe0_ZMyoTQxtKBm7 {\r\n  position: absolute;\r\n  top: 50%;\r\n  color: rgb(128, 128, 128);\r\n  margin: 0;\r\n  transform: translateY(-50%);\r\n  box-sizing: border-box;\r\n}\r\n\r\n.xLIYtwgLVzX9AyYwVcgLt {\r\n  color: inherit;\r\n}\r\n\r\n._1Vnmg2rKay_EA99qawmFda {  \r\n  cursor: text;\r\n  width: 100%;\r\n}\r\n\r\n._2eDYrfCE1goL3V_2ogtQtz {\r\n  background-color: rgb(230, 230, 230);\r\n  display: flex;\r\n  min-width: 0px;\r\n  box-sizing: border-box;\r\n  border-radius: 2px;\r\n  margin: 2px;\r\n}\r\n\r\n.f3JQilMsEX8OORf4P64Je {\r\n  -webkit-box-align: center;\r\n  align-items: center;\r\n  align-self: stretch;\r\n  display: flex;\r\n  flex-shrink: 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.VCVVJzKJ2WKTbtqdDC8bs {\r\n  color: rgb(204, 204, 204);\r\n  display: flex;\r\n  box-sizing: border-box;\r\n  padding: 10px 6px;\r\n  transition: color 150ms ease 0s;\r\n}\r\n\r\n.VCVVJzKJ2WKTbtqdDC8bs:hover {\r\n  cursor: pointer;\r\n  color: rgb(153, 153, 153);\r\n}\r\n\r\n.VCVVJzKJ2WKTbtqdDC8bs:focus {\r\n  color: rgb(153, 153, 153);\r\n  outline: 0px solid transparent;\r\n}\r\n\r\n._1CVLtK-SeWREdFbtMfsFr6 {\r\n  display: inline-block;\r\n  fill: currentcolor;\r\n  line-height: 1;\r\n  stroke: currentcolor;\r\n  stroke-width: 0;\r\n}\r\n\r\n.siGZdSGJ2DsmuVUPdLj1S {\r\n  align-self: stretch;\r\n  background-color: rgb(204, 204, 204);\r\n  margin-bottom: 8px;\r\n  margin-top: 8px;\r\n  width: 1px;\r\n  box-sizing: border-box;\r\n}\r\n\r\n._3etkCiSEHj9rBdr3HP7hoI {\r\n  top: 100%;\r\n  background-color: rgb(255, 255, 255);\r\n  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 11px;\r\n  margin-bottom: 8px;\r\n  margin-top: 8px;\r\n  position: absolute;\r\n  width: 100%;\r\n  z-index: 1;\r\n  box-sizing: border-box;\r\n  border-radius: 2px;\r\n}\r\n\r\n._2BZ6P2ChebiTM94M-OMhZD {\r\n  max-height: 300px;\r\n  overflow-y: auto;\r\n  padding-bottom: 4px;\r\n  padding-top: 4px;\r\n  position: relative;\r\n  box-sizing: border-box;\r\n}\r\n", ""]);
// Exports
exports.locals = {
	"react-ahead__control-container": "_2dH7OUMw0ESmltDd0ovClD",
	"react-ahead__control-wrapper": "Axrtb5jaHtP98cGxAqRLV",
	"react-ahead__input-wrapper": "_1Vnmg2rKay_EA99qawmFda",
	"react-ahead__placeholder": "_2CD9QkPe0_ZMyoTQxtKBm7",
	"react-ahead__placeholder-value-mode": "xLIYtwgLVzX9AyYwVcgLt",
	"react-ahead__selection-container": "_2eDYrfCE1goL3V_2ogtQtz",
	"react-ahead__dropdown-wrapper": "f3JQilMsEX8OORf4P64Je",
	"react-ahead__dropdown-icon-wrapper": "VCVVJzKJ2WKTbtqdDC8bs",
	"react-ahead__dropdown-icon": "_1CVLtK-SeWREdFbtMfsFr6",
	"react-ahead__dropdown-separator": "siGZdSGJ2DsmuVUPdLj1S",
	"react-ahead__menu-wrapper": "_3etkCiSEHj9rBdr3HP7hoI",
	"react-ahead__menu-content": "_2BZ6P2ChebiTM94M-OMhZD"
};
module.exports = exports;


/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"commonjs":"react","commonjs2":"react","amd":"React","root":"React"}
var external_commonjs_react_commonjs2_react_amd_React_root_React_ = __webpack_require__(0);
var external_commonjs_react_commonjs2_react_amd_React_root_React_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_react_commonjs2_react_amd_React_root_React_);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(2);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./src/shared.css
var shared = __webpack_require__(1);
var shared_default = /*#__PURE__*/__webpack_require__.n(shared);

// CONCATENATED MODULE: ./src/input.js
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const inputClass = "react-ahead__input-inner-wrapper";
class input_Input extends external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "state", {
      width: 0
    });

    _defineProperty(this, "focus", () => {
      if (this._input && this._input.current) {
        this._input.current.focus();
      }
    });

    _defineProperty(this, "handleTextChange", (evt, forceUpdate) => {
      const val = evt && evt.target && evt.target.value || forceUpdate && forceUpdate.value || '';
      let {
        width
      } = this.state;

      if (this._div && this._div.current) {
        this._div.current.innerText = val;
        width = this._div.current.offsetWidth;
      }

      if (!forceUpdate && this.props.onEntryChange) {
        this.props.onEntryChange(evt, val);
      }

      this.setState({
        width
      });
    });

    _defineProperty(this, "handleKeydown", evt => {
      if (!evt) {
        return;
      }

      const {
        keyCode
      } = evt;

      if (keyCode === 38 || keyCode === 40) {
        evt.preventDefault();

        if (typeof this.props.onSelectionMove === 'function') {
          this.props.onSelectionMove(evt, keyCode === 38 ? "up" : "down");
        }
      }

      return;
    });

    this._div = external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createRef();
    this._input = external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createRef();
    this._inputStyle = shared_default.a[inputClass] || inputClass;
  }

  componentDidUpdate(prevProps, _prevState, _snapshot) {// if (prevProps.value !== this.props.value) {
    //   if (this._div && this._div.current) {
    //     this._div.current.innerText = val;
    //     width = this._div.current.offsetWidth;
    //   }
    // }
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
        width: `${this.state.width || 2}px`,
        outline: "none",
        border: 0
      },
      onChange: this.handleTextChange,
      onKeyDown: this.handleKeydown // onBlur={evt => evt.stopPropagation()}
      ,
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

_defineProperty(input_Input, "propTypes", {
  onEntryChange: prop_types_default.a.func,
  onSelectionMove: prop_types_default.a.func,
  value: prop_types_default.a.value
});
// CONCATENATED MODULE: ./src/dropdown.js
function dropdown_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const menuWrapperClass = "react-ahead__menu-wrapper";
const menuContentClass = "react-ahead__menu-content";
class dropdown_Dropdown extends external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.Component {
  constructor(props) {
    super(props);
    this._wrapperClass = shared_default.a[menuWrapperClass] || menuWrapperClass;
    this._contentClass = shared_default.a[menuContentClass] || menuContentClass;
  }

  render() {
    if (this.props.open) {
      return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
        className: this._wrapperClass + " " + this.props.className,
        style: {
          height: "100px"
        }
      }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
        className: this._contentClass
      }));
    }

    return null;
  }

}

dropdown_defineProperty(dropdown_Dropdown, "propTypes", {});
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

/* harmony default export */ var placeholder = (Placeholder);
// CONCATENATED MODULE: ./src/selection.js
function selection_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const containerClass = "react-ahead__selection-container";
class selection_Selection extends external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.Component {
  constructor(props) {
    super(props);
    this._containerStyle = shared_default.a[containerClass] || containerClass;
  }

  render() {
    if (!this.props.selection || !this.props.selection.length) {
      return null;
    }

    return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.Fragment, null, this.props.selection.map(item => {
      return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
        style: {
          overflow: hidden,
          whiteSpace: "nowrap"
        }
      }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
        className: this._containerStyle
      }));
    }));
  }

}

selection_defineProperty(selection_Selection, "propTypes", {
  onSelectionRemoval: prop_types_default.a.func.isRequired
});
// CONCATENATED MODULE: ./src/icons/clear.js


const iconClass = "react-ahead__dropdown-icon";

const ClearIcon = _props => {
  const iconStyle = shared_default.a[iconClass] || iconClass;
  return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("svg", {
    x: "0px",
    y: "0px",
    width: "16",
    height: "16",
    focusable: "false",
    viewBox: "0 0 18 18",
    className: iconStyle,
    "aria-hidden": "true"
  }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("path", {
    d: "M 14.348 14.849 c -0.469 0.469 -1.229 0.469 -1.697 0 l -2.651 -3.03 l -2.651 3.029 c -0.469 0.469 -1.229 0.469 -1.697 0 c -0.469 -0.469 -0.469 -1.229 0 -1.697 l 2.758 -3.15 l -2.759 -3.152 c -0.469 -0.469 -0.469 -1.228 0 -1.697 s 1.228 -0.469 1.697 0 l 2.652 3.031 l 2.651 -3.031 c 0.469 -0.469 1.228 -0.469 1.697 0 s 0.469 1.229 0 1.697 l -2.758 3.152 l 2.758 3.15 c 0.469 0.469 0.469 1.229 0 1.698 Z"
  }));
};

/* harmony default export */ var clear = (ClearIcon);
// CONCATENATED MODULE: ./src/icons/drop.js


const drop_iconClass = "react-ahead__dropdown-icon";

const DropIcon = _props => {
  const iconStyle = shared_default.a[drop_iconClass] || drop_iconClass;
  return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("svg", {
    x: "0px",
    y: "0px",
    width: "16",
    height: "16",
    focusable: "false",
    viewBox: "0 0 18 18",
    className: iconStyle,
    "aria-hidden": "true"
  }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("path", {
    d: "M 4.516 7.548 c 0.436 -0.446 1.043 -0.481 1.576 0 l 3.908 3.747 l 3.908 -3.747 c 0.533 -0.481 1.141 -0.446 1.574 0 c 0.436 0.445 0.408 1.197 0 1.615 c -0.406 0.418 -4.695 4.502 -4.695 4.502 c -0.217 0.223 -0.502 0.335 -0.787 0.335 s -0.57 -0.112 -0.789 -0.335 c 0 0 -4.287 -4.084 -4.695 -4.502 s -0.436 -1.17 0 -1.615 Z"
  }));
};

/* harmony default export */ var drop = (DropIcon);
// CONCATENATED MODULE: ./src/icon.js





const dropdownClass = "react-ahead__dropdown-wrapper";
const iconWrapperClass = "react-ahead__dropdown-icon-wrapper";
const separatorClass = "react-ahead__dropdown-separator";

const DropdownIcon = props => {
  const dropdownWrapperStyle = shared_default.a[dropdownClass] || dropdownClass;
  const iconWrapperStyle = shared_default.a[iconWrapperClass] || iconWrapperClass;
  const separatorStyle = shared_default.a[separatorClass] || separatorClass;
  return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
    className: dropdownWrapperStyle
  }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
    className: iconWrapperStyle,
    "aria-hidden": "true",
    onClick: props.onClear,
    tabIndex: 0
  }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(clear, null)), external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("span", {
    className: separatorStyle
  }), external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
    className: iconWrapperStyle,
    "aria-hidden": "true",
    onClick: props.onDropdown,
    tabIndex: 0
  }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(drop, null)));
};

DropdownIcon.propTypes = {
  onClear: prop_types_default.a.func,
  onDropdown: prop_types_default.a.func
};
/* harmony default export */ var icon = (DropdownIcon);
// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return src_ReactAhead; });
function src_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









const src_containerClass = "react-ahead__control-container";
const wrapperClass = "react-ahead__control-wrapper";
const inputWrapperClass = "react-ahead__input-wrapper";
class src_ReactAhead extends external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.Component {
  constructor(props) {
    super(props);

    src_defineProperty(this, "state", {
      cursorIndex: 0,
      dropdownOpen: false,
      options: [],
      selection: [],
      value: ''
    });

    src_defineProperty(this, "handleEntryChanged", (_evt, value) => {
      let targetState = {
        value
      };

      if (!this.state.dropdownOpen) {
        // the dropdown shall remain open even if all text are cleared
        targetState.dropdownOpen = true;
      } //todo: do the search with the vlaue


      this.setState(targetState);
    });

    src_defineProperty(this, "handleSelectionMove", (_evt, side) => {
      let {
        cursorIndex
      } = this.state;

      if (side === 'up' && cursorIndex >= 0) {
        cursorIndex--;
      } else if (side === 'down') {
        if (cursorIndex === this.state.options.length - 1) {//todo: send query for more options, then add them to the list
        } else {
          cursorIndex--;
        }
      }

      if (cursorIndex !== this.state.cursorIndex) {
        this.setState({
          cursorIndex
        });
      }
    });

    src_defineProperty(this, "handleSelectionChoice", val => {
      if (!val) {
        return;
      }

      let {
        selection
      } = this.state;

      if (this.props.multiSel) {
        selection.push(val);
      } else {
        selection = [val];
      }

      this.handleFocusMove(null);
      this.setState({
        selection,
        value: ''
      });
    });

    src_defineProperty(this, "handleKeepFocus", evt => {
      console.log("keep focus...");
      this._focusType = 2;
    });

    src_defineProperty(this, "handleFocusMove", evt => {
      if (this._input && this._input.current) {
        this._input.current.focus();
      }
    });

    src_defineProperty(this, "handleGetFocus", evt => {
      if (this._focusType !== 1) {
        this._focusType = 1; //todo: do the search on opening the dropdown menu  

        this.setState({
          dropdownOpen: true // open with full values

        });
      }
    });

    src_defineProperty(this, "handleLoseFocus", evt => {
      if (this._focusType === 2) {
        // the focus type will remain
        this._focusType = 1;
      } else {
        this._focusType = 0;
        this.setState({
          value: '',
          dropdownOpen: false
        });
      }
    });

    src_defineProperty(this, "handleSelectionRemoval", val => {});

    src_defineProperty(this, "handleClear", () => {
      this._focusType = 2;

      if (this._input && this._input.current) {
        this._input.current.handleTextChange(null, {
          value: ''
        });
      }

      this.setState({
        value: '',
        selection: []
      });
    });

    src_defineProperty(this, "handleDropdownOpen", () => {
      this._focusType = 2;
      this.setState({
        dropdownOpen: true
      });
    });

    src_defineProperty(this, "renderInput", () => {
      const singleSelDone = !this.props.isMulti && this.state.selection.length === 1;
      return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
        className: this._classNames.inputWrapper
      }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(placeholder, {
        show: this.props.placeholder && this.state.selection.length === 0 && !this.state.value || singleSelDone && !this.state.value,
        text: singleSelDone ? this.state.selection[0] : this.props.placeholder,
        valueDisplayMode: singleSelDone
      }), external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(selection_Selection, {
        isMulti: this.props.isMulti,
        selection: this.state.selection,
        onSelectionRemoval: this.handleSelectionRemoval
      }), external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(input_Input, {
        ref: this._input,
        onEntryChange: this.handleEntryChanged,
        onSelectionMove: this.handleSelectionMove,
        value: this.state.value
      }));
    });

    this._input = external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createRef();
    this._focusType = 0;

    if (Array.isArray(props.initOptions) && props.initOptions.length > 0) {
      this.state.options = props.initOptions;
    }

    this._classNames = {
      container: shared_default.a[src_containerClass] || src_containerClass,
      wrapper: shared_default.a[wrapperClass] || wrapperClass,
      inputWrapper: shared_default.a[inputWrapperClass] || inputWrapperClass
    };
  }

  render() {
    const {
      className,
      customClassNames,
      options
    } = this.props;
    const {
      cursorIndex,
      dropdownOpen
    } = this.state;
    return external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
      className: (className || '') + " " + this._classNames.container
    }, external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
      className: (customClassNames.input || '') + " " + this._classNames.wrapper,
      onMouseDown: this.handleKeepFocus,
      onClick: this.handleFocusMove,
      onFocus: this.handleGetFocus,
      onBlur: this.handleLoseFocus
    }, this.renderInput(), external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(icon, {
      onClear: this.handleClear,
      onDropdown: this.handleDropdownOpen
    })), external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(dropdown_Dropdown, {
      className: customClassNames.dropdown,
      open: dropdownOpen,
      options: options,
      cursorIndex: cursorIndex,
      onSelection: this.handleSelectionChoice
    }));
  }

}

src_defineProperty(src_ReactAhead, "propTypes", {
  isMulti: prop_types_default.a.bool,
  initOptions: prop_types_default.a.arrayOf(prop_types_default.a.object),
  customClassNames: prop_types_default.a.object
});

src_defineProperty(src_ReactAhead, "defaultProps", {
  customClassNames: {
    input: '',
    dropdown: ''
  }
});

/***/ })
/******/ ]);
});
//# sourceMappingURL=main.js.map