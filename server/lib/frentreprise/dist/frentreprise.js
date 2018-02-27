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

/***/ "./src/Entreprise/Entreprise.js":
/*!**************************************!*\
  !*** ./src/Entreprise/Entreprise.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _Etablissement = __webpack_require__(/*! ./Etablissement */ \"./src/Entreprise/Etablissement.js\");\n\nvar _Etablissement2 = _interopRequireDefault(_Etablissement);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst _data = Symbol.for(\"_data\");\nconst _ets = Symbol.for(\"_ets\");\n\nclass Entreprise {\n  constructor(data) {\n    this[_data] = {};\n    this[_ets] = [];\n    if (typeof data === \"object\") {\n      this[_data] = data;\n    }\n  }\n\n  get siren() {\n    return this[_data][\"siren\"];\n  }\n\n  get capital_social() {\n    return this[_data][\"capital_social\"];\n  }\n\n  get numero_tva_intracommunautaire() {\n    return this[_data][\"numero_tva_intracommunautaire\"];\n  }\n\n  get forme_juridique() {\n    return this[_data][\"forme_juridique\"];\n  }\n\n  get forme_juridique_code() {\n    return this[_data][\"forme_juridique_code\"];\n  }\n\n  get nombre_etablissements_actifs() {\n    return this[_data][\"nombre_etablissements_actifs\"];\n  }\n\n  get nom_commercial() {\n    return this[_data][\"nom_commercial\"];\n  }\n\n  get procedure_collective() {\n    return this[_data][\"procedure_collective\"];\n  }\n\n  get raison_sociale() {\n    return this[_data][\"raison_sociale\"];\n  }\n\n  get siret_siege_social() {\n    return this[_data][\"siret_siege_social\"];\n  }\n\n  get code_effectif_entreprise() {\n    return this[_data][\"code_effectif_entreprise\"];\n  }\n\n  get date_creation() {\n    return this[_data][\"date_creation\"];\n  }\n\n  get nom() {\n    return this[_data][\"nom\"];\n  }\n\n  get prenom() {\n    return this[_data][\"prenom\"];\n  }\n\n  get etat_administratif() {\n    return this[_data][\"etat_administratif\"];\n  }\n\n  get date_radiation() {\n    return this[_data][\"date_radiation\"];\n  }\n\n  get mandataires_sociaux() {\n    return this[_data][\"mandataires_sociaux\"];\n  }\n\n  get etablissements() {\n    return [...this[_ets]];\n  }\n\n  importEtablissement(etsData) {\n    this[_ets].push(new _Etablissement2.default(etsData));\n  }\n\n  export() {\n    const data = {};\n    const export_keys = [\"siren\", \"capital_social\", \"numero_tva_intracommunautaire\", \"forme_juridique\", \"forme_juridique_code\", \"nombre_etablissements_actifs\", \"nom_commercial\", \"procedure_collective\", \"raison_sociale\", \"siret_siege_social\", \"code_effectif_entreprise\", \"date_creation\", \"nom\", \"prenom\", \"etat_administratif\", \"date_radiation\", \"mandataires_sociaux\"];\n\n    export_keys.forEach(key => {\n      console.log(key, data, this);\n      data[key] = this[key];\n    }, this);\n\n    data[\"etablissements\"] = [this.etablissements.map(ets => ets.export())];\n\n    return data;\n  }\n}\nexports.default = Entreprise;\n\n//# sourceURL=webpack://frentreprise/./src/Entreprise/Entreprise.js?");

/***/ }),

/***/ "./src/Entreprise/Etablissement.js":
/*!*****************************************!*\
  !*** ./src/Entreprise/Etablissement.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nconst _data = Symbol.for(\"_data\");\n\nclass Etablissement {\n  constructor(data) {\n    this[_data] = {};\n    if (typeof data === \"object\") {\n      this[_data] = data;\n    }\n  }\n\n  get siege_social() {\n    return this[_data][\"siege_social\"];\n  }\n\n  get siret() {\n    return this[_data][\"siret\"];\n  }\n\n  get naf() {\n    return this[_data][\"naf\"];\n  }\n\n  get libelle_naf() {\n    return this[_data][\"libelle_naf\"];\n  }\n\n  get date_mise_a_jour() {\n    return this[_data][\"date_mise_a_jour\"];\n  }\n\n  get etat_administratif_etablissement() {\n    return this[_data][\"etat_administratif_etablissement\"];\n  }\n\n  get adresse() {\n    return this[_data][\"adresse\"];\n  }\n\n  export() {\n    const data = {};\n    const export_keys = [\"siege_social\", \"siret\", \"naf\", \"libelle_naf\", \"date_mise_a_jour\", \"etat_administratif_etablissement\", \"adresse\"];\n\n    export_keys.forEach(key => {\n      console.log(key, data, this);\n      data[key] = this[key];\n    }, this);\n\n    return data;\n  }\n}\nexports.default = Etablissement;\n\n//# sourceURL=webpack://frentreprise/./src/Entreprise/Etablissement.js?");

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
eval("\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _InvalidIdentifierError = __webpack_require__(/*! ./Errors/InvalidIdentifierError */ \"./src/Errors/InvalidIdentifierError.js\");\n\nvar _InvalidIdentifierError2 = _interopRequireDefault(_InvalidIdentifierError);\n\nvar _Validator = __webpack_require__(/*! ./Utils/Validator */ \"./src/Utils/Validator.js\");\n\nvar Validator = _interopRequireWildcard(_Validator);\n\nvar _Entreprise = __webpack_require__(/*! ./Entreprise */ \"./src/Entreprise/index.js\");\n\nvar _Entreprise2 = _interopRequireDefault(_Entreprise);\n\nvar _ApiGouv = __webpack_require__(/*! ./DataSources/ApiGouv */ \"./src/DataSources/ApiGouv.js\");\n\nvar _ApiGouv2 = _interopRequireDefault(_ApiGouv);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nclass frentreprise {\n  constructor() {\n    this.dataSources = [];\n    this.addDataSource({\n      name: \"ApiGouv\",\n      priority: 100, // higher prevail\n      source: new _ApiGouv2.default(\"https://entreprise.api.gouv.fr/v2/\")\n    });\n  }\n\n  getEntreprise(SiretOrSiren) {\n    var _this = this;\n\n    return _asyncToGenerator(function* () {\n      SiretOrSiren = SiretOrSiren + \"\";\n\n      const gotSIREN = Validator.validateSIREN(SiretOrSiren);\n      const gotSIRET = Validator.validateSIRET(SiretOrSiren);\n\n      if (!gotSIREN && !gotSIRET) {\n        throw new _InvalidIdentifierError2.default(SiretOrSiren);\n      }\n\n      const SIREN = gotSIREN ? SiretOrSiren : SiretOrSiren.substr(0, 9);\n\n      const dataSources = _this.getDataSources();\n\n      let etData = {};\n\n      for (let i = 0; i < _this.dataSources.length; i++) {\n        const dataSource = _this.dataSources[i].source;\n        etData = _extends({}, etData, (yield dataSource.getSIREN(SIREN)));\n      }\n\n      const entreprise = new _Entreprise2.default(etData);\n\n      if (gotSIRET) {\n        let etsData = {};\n\n        for (let i = 0; i < _this.dataSources.length; i++) {\n          const dataSource = _this.dataSources[i].source;\n          etsData = _extends({}, etsData, (yield dataSource.getSIRET(SiretOrSiren)));\n        }\n\n        entreprise.importEtablissement(etsData);\n      }\n\n      return entreprise;\n    })();\n  }\n\n  search() {\n    return [];\n  }\n\n  getDataSources() {\n    return [...this.dataSources].sort((a, b) => {\n      a = +(a && a.priority);\n      b = +(b && b.priority);\n\n      return a > b ? 1 : a < b ? -1 : 0;\n    });\n  }\n\n  getDataSource(name) {\n    return this.dataSources.find(ds => ds.name === name);\n  }\n\n  addDataSource(dataSource) {\n    if (!this.dataSources.includes(dataSource)) {\n      this.dataSources.push(dataSource);\n    }\n  }\n\n  removeDataSource(dataSource) {\n    this.dataSources.slice(this.dataSources.indexOf(dataSource), 1);\n  }\n}\n\nmodule.exports = new frentreprise();\n\n//# sourceURL=webpack://frentreprise/./src/frentreprise.js?");

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