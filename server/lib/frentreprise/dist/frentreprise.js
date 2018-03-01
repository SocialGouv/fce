<<<<<<< Updated upstream
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("frentreprise", [], factory);
	else if(typeof exports === 'object')
		exports["frentreprise"] = factory();
	else
		root["frentreprise"] = factory();
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	// object with all compiled WebAssmbly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/DataSources/ApiGouv.js":
/*!************************************!*\
  !*** ./src/DataSources/ApiGouv.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _axios = __webpack_require__(/*! axios */ \"axios\");\n\nvar _axios2 = _interopRequireDefault(_axios);\n\nvar _DataSource = __webpack_require__(/*! ./DataSource */ \"./src/DataSources/DataSource.js\");\n\nvar _DataSource2 = _interopRequireDefault(_DataSource);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nconst _getAPIParams = self => {\n  return {\n    token: self.token,\n    context: \"Tiers\",\n    recipient: \"Direccte Occitanie\",\n    object: \"FCEE - Direccte Occitanie\"\n  };\n};\n\n// GET /associations/:id\n// GET /documents_associations/:association_id\n// Unknown calls\n\nclass ApiGouv extends _DataSource2.default {\n  constructor(baseURL) {\n    super();\n    this.token = null;\n    this.axios = _axios2.default.create({\n      baseURL: baseURL,\n      timeout: 30000\n    });\n  }\n\n  // GET /etablissements_legacy/:siret\n  // GET /attestations_agefiph/:siret\n  // GET /exercices/:siret\n  getSIRET(SIRET) {\n    var _this = this;\n\n    return _asyncToGenerator(function* () {\n      const api_response = yield _this.axios.get(`etablissements_legacy/${SIRET}`, {\n        params: _getAPIParams(_this)\n      });\n\n      return api_response && typeof api_response === \"object\" && api_response.data && typeof api_response.data === \"object\" && api_response.data.etablissement || {};\n    })();\n  }\n\n  // GET /entreprises_legacy/:siren\n  getSIREN(SIREN) {\n    var _this2 = this;\n\n    return _asyncToGenerator(function* () {\n      const api_response = yield _this2.axios.get(`entreprises_legacy/${SIREN}`, {\n        params: _getAPIParams(_this2)\n      });\n\n      return api_response && typeof api_response === \"object\" && api_response.data && typeof api_response.data === \"object\" && api_response.data.entreprise || {};\n    })();\n  }\n\n  search() {\n    return _asyncToGenerator(function* () {\n      return false;\n    })();\n  }\n}\nexports.default = ApiGouv;\n\n//# sourceURL=webpack://frentreprise/./src/DataSources/ApiGouv.js?");

/***/ }),

/***/ "./src/DataSources/DataSource.js":
/*!***************************************!*\
  !*** ./src/DataSources/DataSource.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _NotImplementedError = __webpack_require__(/*! ../Errors/NotImplementedError */ \"./src/Errors/NotImplementedError.js\");\n\nvar _NotImplementedError2 = _interopRequireDefault(_NotImplementedError);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nclass DataSource {\n  getSIRET() {\n    return _asyncToGenerator(function* () {\n      throw new _NotImplementedError2.default();\n    })();\n  }\n\n  getSIREN() {\n    return _asyncToGenerator(function* () {\n      throw new _NotImplementedError2.default();\n    })();\n  }\n\n  search() {\n    return _asyncToGenerator(function* () {\n      throw new _NotImplementedError2.default();\n    })();\n  }\n}\nexports.default = DataSource;\n\n//# sourceURL=webpack://frentreprise/./src/DataSources/DataSource.js?");

/***/ }),

/***/ "./src/Entreprise/BaseModel.js":
/*!*************************************!*\
  !*** ./src/Entreprise/BaseModel.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nconst _importData = Symbol(\"_importData\");\nconst _data = Symbol(\"_data\");\n\nclass BaseModel {\n  constructor(data) {\n    this[_importData](data, true);\n  }\n\n  updateData(data) {\n    this[_importData](data);\n  }\n\n  replaceData(data) {\n    this[_importData](data, true);\n  }\n\n  [_importData](data, replace = false) {\n    if (typeof data === \"object\") {\n      this[_data] = _extends({}, replace === true ? {} : this[_data], data);\n    }\n\n    // Add missing accessors\n    Object.keys(this[_data]).forEach(key => {\n      if (!this.hasOwnProperty(key)) {\n        Object.defineProperty(this, key, {\n          get: () => {\n            return this[_data][key];\n          }\n        });\n      }\n    }, this);\n  }\n}\nexports.default = BaseModel;\n\n//# sourceURL=webpack://frentreprise/./src/Entreprise/BaseModel.js?");

/***/ }),

/***/ "./src/Entreprise/Entreprise.js":
/*!**************************************!*\
  !*** ./src/Entreprise/Entreprise.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _BaseModel = __webpack_require__(/*! ./BaseModel */ \"./src/Entreprise/BaseModel.js\");\n\nvar _BaseModel2 = _interopRequireDefault(_BaseModel);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst _ets = Symbol(\"_ets\");\n\nclass Entreprise extends _BaseModel2.default {\n  constructor(data) {\n    super(data);\n    this[_ets] = [];\n  }\n\n  get etablissements() {\n    return [...this[_ets]];\n  }\n\n  importEtablissement(etablissement) {\n    this[_ets].push(etablissement);\n  }\n}\nexports.default = Entreprise;\n\n//# sourceURL=webpack://frentreprise/./src/Entreprise/Entreprise.js?");

/***/ }),

/***/ "./src/Entreprise/Etablissement.js":
/*!*****************************************!*\
  !*** ./src/Entreprise/Etablissement.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _BaseModel = __webpack_require__(/*! ./BaseModel */ \"./src/Entreprise/BaseModel.js\");\n\nvar _BaseModel2 = _interopRequireDefault(_BaseModel);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Etablissement extends _BaseModel2.default {}\nexports.default = Etablissement;\n\n//# sourceURL=webpack://frentreprise/./src/Entreprise/Etablissement.js?");

/***/ }),

/***/ "./src/Entreprise/index.js":
/*!*********************************!*\
  !*** ./src/Entreprise/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Etablissement = exports.Entreprise = undefined;\n\nvar _Entreprise = __webpack_require__(/*! ./Entreprise */ \"./src/Entreprise/Entreprise.js\");\n\nObject.defineProperty(exports, \"Entreprise\", {\n  enumerable: true,\n  get: function () {\n    return _interopRequireDefault(_Entreprise).default;\n  }\n});\n\nvar _Etablissement = __webpack_require__(/*! ./Etablissement */ \"./src/Entreprise/Etablissement.js\");\n\nObject.defineProperty(exports, \"Etablissement\", {\n  enumerable: true,\n  get: function () {\n    return _interopRequireDefault(_Etablissement).default;\n  }\n});\n\nvar _Entreprise2 = _interopRequireDefault(_Entreprise);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _Entreprise2.default;\n\n//# sourceURL=webpack://frentreprise/./src/Entreprise/index.js?");

/***/ }),

/***/ "./src/Errors/InvalidIdentifierError.js":
/*!**********************************************!*\
  !*** ./src/Errors/InvalidIdentifierError.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n/**\n * @summary A error thrown when a given SIRET or SIREN is invalid.\n */\nfunction InvalidIdentifierError(message) {\n  this.message = `Invalid SIRET or SIREN. ${message}`;\n}\n\nInvalidIdentifierError.prototype = Object.create(Error.prototype, {\n  constructor: { value: InvalidIdentifierError },\n  name: { value: \"InvalidIdentifierError\" },\n  stack: {\n    get: function () {\n      return new Error().stack;\n    }\n  }\n});\n\nexports.default = InvalidIdentifierError;\n\n//# sourceURL=webpack://frentreprise/./src/Errors/InvalidIdentifierError.js?");

/***/ }),

/***/ "./src/Errors/NotImplementedError.js":
/*!*******************************************!*\
  !*** ./src/Errors/NotImplementedError.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n/**\n * @summary A error thrown when a method is defined but not implemented (yet).\n * @param {any} message An additional message for the error.\n */\nfunction NotImplementedError(message) {\n  ///<summary>The error thrown when the given function isn't implemented.</summary>\n  const sender = new Error().stack.split(\"\\n\")[2].replace(\" at \", \"\");\n\n  this.message = `The method ${sender} isn't implemented.`;\n\n  // Append the message if given.\n  if (message) this.message += ` Message: \"${message}\".`;\n\n  let str = this.message;\n\n  while (str.indexOf(\"  \") > -1) {\n    str = str.replace(\"  \", \" \");\n  }\n\n  this.message = str;\n}\n\nNotImplementedError.prototype = Object.create(Error.prototype, {\n  constructor: { value: NotImplementedError },\n  name: { value: \"NotImplementedError\" },\n  stack: {\n    get: function () {\n      return new Error().stack;\n    }\n  }\n});\n\nexports.default = NotImplementedError;\n\n//# sourceURL=webpack://frentreprise/./src/Errors/NotImplementedError.js?");

/***/ }),

/***/ "./src/Utils/Validator.js":
/*!********************************!*\
  !*** ./src/Utils/Validator.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.validateSIREN = validateSIREN;\nexports.validateSIRET = validateSIRET;\nfunction validateSIREN(SIREN) {\n  // SIREN is 9 numeric characters only\n  if (!/^[0-9]{9}$/.test(SIREN)) return false;\n\n  // SIREN verification works as following :\n  // we reduce digits one by one, respecting the following rules\n  const summed = SIREN.split(\"\").reduce((sum, digit, index) => {\n    digit = +digit;\n    const even = index % 2 === 0;\n\n    // if its array position is even :\n    if (even) {\n      // -> we add it to final sum without modifying it\n      return sum + digit;\n    } else {\n      // if it's odd :\n      // -> we double the digit\n      digit = digit * 2;\n      // -> if the new value is higher than 9, we substract 9\n      // -> we add it to final sum\n      return sum + (digit > 9 ? digit - 9 : digit);\n    }\n  }, 0);\n\n  // final sum must be a multiple of 10\n  return summed % 10 === 0;\n}\n\nfunction validateSIRET(SIRET) {\n  // SIREN is 14 numeric characters only\n  if (!/^[0-9]{14}$/.test(SIRET)) return false;\n\n  // SIREN verification works as following :\n  // we reduce digits one by one, respecting the following rules\n  const summed = SIRET.split(\"\").reduce((sum, digit, index) => {\n    digit = +digit;\n    const odd = index % 2 !== 0;\n\n    // if its array position is odd :\n    if (odd) {\n      // -> we add it to final sum without modifying it\n      return sum + digit;\n    } else {\n      // if it's even :\n      // -> we double the digit\n      digit = digit * 2;\n      // -> if the new value is higher than 9, we substract 9\n      // -> we add it to final sum\n      return sum + (digit > 9 ? digit - 9 : digit);\n    }\n  }, 0);\n\n  // final sum must be a multiple of 10\n  return summed % 10 === 0;\n}\n\n//# sourceURL=webpack://frentreprise/./src/Utils/Validator.js?");

/***/ }),

/***/ "./src/frentreprise.js":
/*!*****************************!*\
  !*** ./src/frentreprise.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _InvalidIdentifierError = __webpack_require__(/*! ./Errors/InvalidIdentifierError */ \"./src/Errors/InvalidIdentifierError.js\");\n\nvar _InvalidIdentifierError2 = _interopRequireDefault(_InvalidIdentifierError);\n\nvar _Validator = __webpack_require__(/*! ./Utils/Validator */ \"./src/Utils/Validator.js\");\n\nvar Validator = _interopRequireWildcard(_Validator);\n\nvar _ApiGouv = __webpack_require__(/*! ./DataSources/ApiGouv */ \"./src/DataSources/ApiGouv.js\");\n\nvar _ApiGouv2 = _interopRequireDefault(_ApiGouv);\n\nvar _Entreprise = __webpack_require__(/*! ./Entreprise */ \"./src/Entreprise/index.js\");\n\nvar _Entreprise2 = _interopRequireDefault(_Entreprise);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nclass frentreprise {\n  constructor() {\n    this.EntrepriseModel = _Entreprise2.default;\n    this.EtablissementModel = _Entreprise2.default;\n    this.dataSources = [];\n    this.addDataSource({\n      name: \"ApiGouv\",\n      priority: 100, // higher prevail\n      source: new _ApiGouv2.default(\"https://entreprise.api.gouv.fr/v2/\")\n    });\n  }\n\n  getEntreprise(SiretOrSiren) {\n    var _this = this;\n\n    return _asyncToGenerator(function* () {\n      SiretOrSiren = SiretOrSiren + \"\";\n\n      const gotSIREN = Validator.validateSIREN(SiretOrSiren);\n      const gotSIRET = Validator.validateSIRET(SiretOrSiren);\n\n      if (!gotSIREN && !gotSIRET) {\n        throw new _InvalidIdentifierError2.default(SiretOrSiren);\n      }\n\n      const SIREN = gotSIREN ? SiretOrSiren : SiretOrSiren.substr(0, 9);\n\n      const dataSources = _this.getDataSources();\n\n      let etData = {};\n\n      for (let i = 0; i < _this.dataSources.length; i++) {\n        const dataSource = _this.dataSources[i].source;\n        etData = _extends({}, etData, (yield dataSource.getSIREN(SIREN)));\n      }\n\n      const entreprise = new _this.EntrepriseModel(etData);\n\n      if (gotSIRET) {\n        let etsData = {};\n\n        for (let i = 0; i < _this.dataSources.length; i++) {\n          const dataSource = _this.dataSources[i].source;\n          etsData = _extends({}, etsData, (yield dataSource.getSIRET(SiretOrSiren)));\n        }\n\n        entreprise.importEtablissement(new _this.EtablissementModel(etsData));\n      }\n\n      return entreprise;\n    })();\n  }\n\n  search() {\n    return [];\n  }\n\n  getDataSources() {\n    return [...this.dataSources].sort((a, b) => {\n      a = +(a && a.priority);\n      b = +(b && b.priority);\n\n      return a > b ? 1 : a < b ? -1 : 0;\n    });\n  }\n\n  getDataSource(name) {\n    return this.dataSources.find(ds => ds.name === name);\n  }\n\n  addDataSource(dataSource) {\n    if (!this.dataSources.includes(dataSource)) {\n      this.dataSources.push(dataSource);\n    }\n  }\n\n  removeDataSource(dataSource) {\n    this.dataSources.slice(this.dataSources.indexOf(dataSource), 1);\n  }\n}\n\nmodule.exports = new frentreprise();\nmodule.exports.Entreprise = _Entreprise2.default;\nmodule.exports.Etablissement = _Entreprise2.default;\nmodule.exports.isSIRET = Validator.validateSIRET;\nmodule.exports.isSIREN = Validator.validateSIREN;\n\n//# sourceURL=webpack://frentreprise/./src/frentreprise.js?");

/***/ }),

/***/ 0:
/*!***********************************!*\
  !*** multi ./src/frentreprise.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/frentreprise.js */\"./src/frentreprise.js\");\n\n\n//# sourceURL=webpack://frentreprise/multi_./src/frentreprise.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack://frentreprise/external_%22axios%22?");

/***/ })

/******/ });
});
=======
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("frentreprise",[],t):"object"==typeof exports?exports.frentreprise=t():e.frentreprise=t()}(global,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r.w={},r(r.s=11)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};const o=Symbol("_importData"),a=Symbol("_data");t.default=class{constructor(e){this[o](e,!0)}updateData(e){this[o](e)}replaceData(e){this[o](e,!0)}[o](e,t=!1){"object"==typeof e&&(this[a]=n({},!0===t?{}:this[a],e)),Object.keys(this[a]).forEach(e=>{this.hasOwnProperty(e)||Object.defineProperty(this,e,{get:()=>this[a][e]})},this)}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,o=r(0),a=(n=o)&&n.__esModule?n:{default:n};t.default=class extends a.default{}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,o=r(0),a=(n=o)&&n.__esModule?n:{default:n};const i=Symbol("_ets");t.default=class extends a.default{constructor(e){super(e),this[i]=[]}get etablissements(){return[...this[i]]}importEtablissement(e){this[i].push(e)}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Etablissement=t.Entreprise=void 0;var n=r(2);Object.defineProperty(t,"Entreprise",{enumerable:!0,get:function(){return i(n).default}});var o=r(1);Object.defineProperty(t,"Etablissement",{enumerable:!0,get:function(){return i(o).default}});var a=i(n);function i(e){return e&&e.__esModule?e:{default:e}}t.default=a.default},function(e,t,r){"use strict";function n(e){const t=(new Error).stack.split("\n")[2].replace(" at ","");this.message=`The method ${t} isn't implemented.`,e&&(this.message+=` Message: "${e}".`);let r=this.message;for(;r.indexOf("  ")>-1;)r=r.replace("  "," ");this.message=r}Object.defineProperty(t,"__esModule",{value:!0}),n.prototype=Object.create(Error.prototype,{constructor:{value:n},name:{value:"NotImplementedError"},stack:{get:function(){return(new Error).stack}}}),t.default=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,o=r(4),a=(n=o)&&n.__esModule?n:{default:n};function i(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){return function n(o,a){try{var i=t[o](a),s=i.value}catch(e){return void r(e)}if(!i.done)return Promise.resolve(s).then(function(e){n("next",e)},function(e){n("throw",e)});e(s)}("next")})}}t.default=class{getSIRET(){return i(function*(){throw new a.default})()}getSIREN(){return i(function*(){throw new a.default})()}search(){return i(function*(){throw new a.default})()}}},function(e,t){e.exports=require("axios")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(r(6)),o=a(r(5));function a(e){return e&&e.__esModule?e:{default:e}}function i(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){return function n(o,a){try{var i=t[o](a),s=i.value}catch(e){return void r(e)}if(!i.done)return Promise.resolve(s).then(function(e){n("next",e)},function(e){n("throw",e)});e(s)}("next")})}}const s=e=>({token:e.token,context:"Tiers",recipient:"Direccte Occitanie",object:"FCEE - Direccte Occitanie"}),u=Symbol("_convertDate");t.default=class extends o.default{constructor(e){super(),this.token=null,this.axios=n.default.create({baseURL:e,timeout:3e4})}getSIRET(e){var t=this;return i(function*(){console.log(SIREN);const r=yield t.axios.get(`etablissements_legacy/${e}`,{params:s(t)});return r&&"object"==typeof r&&r.data&&"object"==typeof r.data&&r.data.etablissement||{}})()}getSIREN(e){var t=this;return i(function*(){console.log(e);let r=null;try{r=yield t.axios.get(`entreprises_legacy/${e}`,{params:s(t)})}catch(e){console.log(e)}const n={};if(r&&"object"==typeof r&&r.data&&"object"==typeof r.data&&r.data.entreprise){const e=r.data.entreprise;["siret","raison_sociale","categorie_entreprise"].forEach(function(t){n[t]=e[t]}),n.categorie_juridique=e.forme_juridique,n.date_de_creation=t[u](e.date_creation),n.date_de_radiation=t[u](e.date_radiation),e.etat_administratif&&"object"==typeof e.etat_administratif||(e.etat_administratif={}),n.etat_entreprise={label:e.etat_administratif.value||"N/A",date:t[u](e.etat_administratif.date_mise_a_jour)}}let o=null;try{o=yield t.axios.get(`entreprises/${e}`,{params:s(t)})}catch(e){console.log(e)}if(console.log(legacy_ent),o&&"object"==typeof o&&o.data&&"object"==typeof o.data&&o.data.entreprise){const e=o.data.entreprise;console.log(e),["categorie_entreprise"].forEach(function(t){n[t]=e[t]})}return n})()}[u](e){return e&&new Date(1e3*e)||null}search(){return i(function*(){return!1})()}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.validateSIREN=function(e){if(!/^[0-9]{9}$/.test(e))return!1;return e.split("").reduce((e,t,r)=>{t=+t;const n=r%2==0;return n?e+t:e+((t*=2)>9?t-9:t)},0)%10==0},t.validateSIRET=function(e){if(!/^[0-9]{14}$/.test(e))return!1;return e.split("").reduce((e,t,r)=>{t=+t;const n=r%2!=0;return n?e+t:e+((t*=2)>9?t-9:t)},0)%10==0}},function(e,t,r){"use strict";function n(e){this.message=`Invalid SIRET or SIREN. ${e}`}Object.defineProperty(t,"__esModule",{value:!0}),n.prototype=Object.create(Error.prototype,{constructor:{value:n},name:{value:"InvalidIdentifierError"},stack:{get:function(){return(new Error).stack}}}),t.default=n},function(e,t,r){"use strict";var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o=u(r(9)),a=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(r(8)),i=u(r(7)),s=u(r(3));function u(e){return e&&e.__esModule?e:{default:e}}e.exports=new class{constructor(){this.EntrepriseModel=s.default,this.EtablissementModel=s.default,this.dataSources=[],this.addDataSource({name:"ApiGouv",priority:100,source:new i.default("https://entreprise.api.gouv.fr/v2/")})}getEntreprise(e){var t,r=this;return(t=function*(){e+="";const t=a.validateSIREN(e),i=a.validateSIRET(e);if(!t&&!i)throw new o.default(e);const s=t?e:e.substr(0,9);r.getDataSources();let u={};for(let e=0;e<r.dataSources.length;e++){const t=r.dataSources[e].source;u=n({},u,yield t.getSIREN(s))}const c=new r.EntrepriseModel(u);if(i){let t={};for(let o=0;o<r.dataSources.length;o++){const a=r.dataSources[o].source;t=n({},t,yield a.getSIRET(e))}c.importEtablissement(new r.EtablissementModel(t))}return c},function(){var e=t.apply(this,arguments);return new Promise(function(t,r){return function n(o,a){try{var i=e[o](a),s=i.value}catch(e){return void r(e)}if(!i.done)return Promise.resolve(s).then(function(e){n("next",e)},function(e){n("throw",e)});t(s)}("next")})})()}search(){return[]}getDataSources(){return[...this.dataSources].sort((e,t)=>(e=+(e&&e.priority))>(t=+(t&&t.priority))?1:e<t?-1:0)}getDataSource(e){return this.dataSources.find(t=>t.name===e)}addDataSource(e){this.dataSources.includes(e)||this.dataSources.push(e)}removeDataSource(e){this.dataSources.slice(this.dataSources.indexOf(e),1)}},e.exports.Entreprise=s.default,e.exports.Etablissement=s.default,e.exports.isSIRET=a.validateSIRET,e.exports.isSIREN=a.validateSIREN},function(e,t,r){e.exports=r(10)}])});
>>>>>>> Stashed changes
