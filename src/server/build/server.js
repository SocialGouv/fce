/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api/entities.js":
/*!*****************************!*\
  !*** ./src/api/entities.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\nconst CommuneModel = __webpack_require__(/*! ../models/CommuneModel */ \"./src/models/CommuneModel.js\");\nconst DepartementModel = __webpack_require__(/*! ../models/DepartementModel */ \"./src/models/DepartementModel.js\");\nconst CodePostalModel = __webpack_require__(/*! ../models/CodePostalModel */ \"./src/models/CodePostalModel.js\");\nconst NomenclatureModel = __webpack_require__(/*! ../models/NomenclatureModel */ \"./src/models/NomenclatureModel.js\");\n\nconst getAllEntities = model => {\n  let responseData = {};\n  const logError = err => {\n    console.error(err);\n    responseData.error = true;\n    try {\n      responseData.message = err.toString();\n      return responseData;\n    } catch (Exception) {}\n  };\n\n  return model.find().then(results => {\n    responseData.results = results;\n  }, logError).then(() => {\n    return responseData;\n  });\n};\n\nrouter.get(\"/entities\", function (req, res) {\n  let responseData = { results: {} };\n\n  return CommuneModel.find().then(data => {\n    const cleanData = data.filter(commune => {\n      return commune.libelle_commune.match(/^[a-zA-Z]/g);\n    });\n    responseData.results.communes = cleanData;\n    return DepartementModel.find();\n  }).then(data => {\n    const cleanData = data.filter(departement => {\n      return departement.code_departement.match(/[0-9]{2}/g);\n    });\n    responseData.results.departements = cleanData;\n    return CodePostalModel.find();\n  }).then(data => {\n    const cleanData = data.filter(postalCode => {\n      if (postalCode.code_postal === \"00000\") {\n        return false;\n      }\n      return postalCode.code_postal.match(/[0-9]{5}/g);\n    });\n    responseData.results.postalCodes = cleanData;\n    return NomenclatureModel.findByCategory(\"code_activite_naf\");\n  }).then(data => {\n    responseData.results.nafCodes = data;\n    responseData.success = true;\n\n    res.send(responseData);\n  });\n});\n\nrouter.get(\"/communes\", function (req, res) {\n  return getAllEntities(CommuneModel).then(data => {\n    res.send(data);\n  });\n});\n\nrouter.get(\"/departements\", function (req, res) {\n  return getAllEntities(DepartementModel).then(data => {\n    res.send(data);\n  });\n});\n\nrouter.get(\"/postalCodes\", function (req, res) {\n  return getAllEntities(CodePostalModel).then(data => {\n    res.send(data);\n  });\n});\n\nrouter.get(\"/nafCodes\", function (req, res) {\n  let responseData = { results: {} };\n\n  return NomenclatureModel.findByCategory(\"code_activite_naf\").then(data => {\n    responseData.results = data;\n    responseData.success = true;\n    res.send(responseData);\n  });\n});\n\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/api/entities.js?");

/***/ }),

/***/ "./src/api/index.js":
/*!**************************!*\
  !*** ./src/api/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst path = __webpack_require__(/*! path */ \"path\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\n\nconst searchRouter = __webpack_require__(/*! ./search */ \"./src/api/search.js\");\nconst uploadRouter = __webpack_require__(/*! ./upload */ \"./src/api/upload.js\");\nconst entitiesRouter = __webpack_require__(/*! ./entities */ \"./src/api/entities.js\");\nconst interactionsRouter = __webpack_require__(/*! ./interactions */ \"./src/api/interactions.js\");\nconst login = __webpack_require__(/*! ./login */ \"./src/api/login.js\");\n\nrouter.use(\"\", searchRouter);\nrouter.use(\"\", uploadRouter);\nrouter.use(\"\", entitiesRouter);\nrouter.use(\"/interactions\", interactionsRouter);\nrouter.use(\"\", login);\n\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/api/index.js?");

/***/ }),

/***/ "./src/api/interactions.js":
/*!*********************************!*\
  !*** ./src/api/interactions.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\nconst InteractionModel = __webpack_require__(/*! ../models/InteractionModel */ \"./src/models/InteractionModel.js\");\n\nrouter.get(\"/:siret\", function (req, res) {\n  let responseData = {};\n\n  const logError = err => {\n    console.error(err);\n    responseData.error = true;\n    try {\n      responseData.message = err.toString();\n      return responseData;\n    } catch (Exception) {}\n  };\n\n  const siret = req.params.siret;\n  if (!siret || siret.length === 0) {\n    logError(\"Siret is not defined.\");\n    res.status(400);\n    res.send(responseData);\n  }\n\n  return InteractionModel.findBySIRET(siret).then(results => {\n    responseData.results = results;\n    responseData.success = true;\n  }, logError).then(() => {\n    res.send(responseData);\n  });\n});\n\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/api/interactions.js?");

/***/ }),

/***/ "./src/api/login.js":
/*!**************************!*\
  !*** ./src/api/login.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar express = __webpack_require__(/*! express */ \"express\");\nvar router = express.Router();\n\nrouter.post(\"/login\", function (req, res) {\n  let user = null;\n\n  if (req.body && req.body.password) {\n    switch (req.body.password) {\n      case \"D1r€cct€\":\n        user = {\n          username: \"user\",\n          isAdmin: false\n        };\n        break;\n\n      case \"@dm1nD1r€cct€\":\n        user = {\n          username: \"admin\",\n          isAdmin: true\n        };\n        break;\n    }\n  }\n  res.send({\n    user\n  });\n});\n\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/api/login.js?");

/***/ }),

/***/ "./src/api/search.js":
/*!***************************!*\
  !*** ./src/api/search.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nconst express = __webpack_require__(/*! express */ \"express\");\nconst XLSX = __webpack_require__(/*! xlsx */ \"xlsx\");\nconst router = express.Router();\n\nconst EtablissementModel = __webpack_require__(/*! ../models/EtablissementModel */ \"./src/models/EtablissementModel.js\");\nconst deleteKeyIfNotDefinedOrEmpty = __webpack_require__(/*! ../utils/ObjectManipulations */ \"./src/utils/ObjectManipulations.js\").deleteKeyIfNotDefinedOrEmpty;\n\nconst frentreprise = __webpack_require__(/*! frentreprise */ \"frentreprise\");\n\nconst logError = (data, err) => {\n  console.error(err);\n  data.error = true;\n  try {\n    undefined.data.message = err.toString();\n  } catch (Exception) {}\n};\n\nrouter.get(\"/search(.:format)?\", function (req, res) {\n  const query = (req.query[\"q\"] || \"\").trim();\n  const data = {\n    query: {\n      search: \"simple\",\n      format: req.params[\"format\"] || \"json\",\n      q: query,\n      isSIRET: frentreprise.isSIRET(query),\n      isSIREN: frentreprise.isSIREN(query)\n    }\n  };\n\n  let freCall;\n\n  if (data.query.isSIREN || data.query.isSIRET) {\n    freCall = frentreprise.getEntreprise(data.query.q).then(entreprise => {\n      data.results = [entreprise.export()];\n    }, logError.bind(this, data));\n  } else {\n    freCall = frentreprise.search(data.query.q).then(results => {\n      data.results = results.map(ent => ent.export());\n    }, logError.bind(this, data));\n  }\n\n  freCall.then(() => {\n    data.size = data.results && data.results.length || 0;\n    sendResult(data, res);\n  });\n});\n\nrouter.get(\"/advancedSearch(.:format)?\", function (req, res) {\n  const code_activite = (req.query[\"naf\"] || \"\").trim();\n  const libelle_commune = (req.query[\"commune\"] || \"\").trim();\n  const code_postal = (req.query[\"codePostal\"] || \"\").trim();\n  const code_departement = (req.query[\"departement\"] || \"\").trim();\n  const raison_sociale = (req.query[\"raisonSociale\"] || \"\").trim();\n  const siren = (req.query[\"siren\"] || \"\").trim();\n  const siege_social = (req.query[\"siegeSocial\"] || \"\").trim();\n  const interactions = (req.query[\"interactions\"] || []).map(interaction => {\n    try {\n      return JSON.parse(interaction).value;\n    } catch (e) {\n      console.error(e);\n    }\n  });\n\n  let data = {\n    query: {\n      search: \"advanced\",\n      format: req.params[\"format\"] || \"json\",\n      params: {\n        code_activite,\n        libelle_commune,\n        code_postal,\n        code_departement,\n        raison_sociale,\n        siren,\n        siege_social,\n        interactions\n      }\n    }\n  };\n\n  frentreprise.search(data.query.params).then(results => {\n    try {\n      results = results.map(ent => ent.export());\n    } catch (e) {\n      results = false;\n    }\n    data.results = results;\n    data.size = data.results && data.results.length;\n    sendResult(data, res);\n  }, logError.bind(this, data));\n});\n\nconst sendResult = (data, response) => {\n  if (data.query.format === \"xlsx\") {\n    sendResultXlsx(data, response);\n  } else {\n    response.send(data);\n  }\n};\n\nconst sendResultXlsx = (data, response) => {\n  let flattenResults = [];\n\n  data.results.forEach(enterprise => {\n    if (Array.isArray(enterprise.etablissements)) {\n      enterprise.etablissements.forEach(establishment => {\n        flattenResults.push(_extends({}, enterprise, { etablissement: establishment }));\n      });\n    }\n  });\n\n  let dataToExport = [];\n  let filename = \"export\";\n\n  if (data.query.isSIREN || data.query.isSIRET) {\n    // Common etablissement and entreprise fields\n\n    if (data.query.isSIREN) {\n      // Entreprise fields\n    } else if (data.query.isSIRET) {\n      // Etablissement fields\n    }\n  } else {\n    // Search\n    filename = \"recherche\";\n    if (data.query.search === \"advanced\") {\n      filename += \"_avancee\";\n    }\n\n    dataToExport = flattenResults.map(entreprise => {\n      const etablissement = entreprise.etablissement;\n\n      return {\n        SIRET: etablissement.siret,\n        SIREN: entreprise.siren,\n        \"Raison Sociale\": entreprise.raison_sociale,\n        Etat: etablissement.etat_etablissement && etablissement.etat_etablissement.label,\n        Commune: etablissement.adresse_components && etablissement.adresse_components.localite,\n        \"Code Postal\": etablissement.adresse_components && etablissement.adresse_components.code_postal,\n        Département: etablissement.adresse_components && etablissement.adresse_components.code_postal && etablissement.adresse_components.code_postal.substr(0, 2),\n        Activité: etablissement.activite,\n        \"Catégorie Etablissement\": etablissement.categorie_etablissement,\n        Intéractions: Array.isArray(etablissement.direccte) ? etablissement.direccte.length : \"\"\n      };\n    });\n  }\n  const wb = { SheetNames: [], Sheets: {} };\n  wb.Props = {\n    Title: filename,\n    Author: \"Direccte\"\n  };\n\n  const ws = XLSX.utils.json_to_sheet(dataToExport);\n  const wsName = \"Export\";\n  XLSX.utils.book_append_sheet(wb, ws, wsName);\n\n  const wbout = new Buffer(XLSX.write(wb, { bookType: \"xlsx\", type: \"buffer\" }));\n\n  const date = new Date().toISOString().replace(/T/, \"_\").replace(/\\..+/, \"\").replace(/:/g, \"-\");\n\n  response.setHeader(\"Content-Disposition\", `attachment; filename=${filename}_${date}.xlsx`);\n  response.type(\"application/octet-stream\");\n  response.send(wbout);\n};\n\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/api/search.js?");

/***/ }),

/***/ "./src/api/upload.js":
/*!***************************!*\
  !*** ./src/api/upload.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst path = __webpack_require__(/*! path */ \"path\");\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\nconst multer = __webpack_require__(/*! multer */ \"multer\");\nconst PoleCIngestor = __webpack_require__(/*! ../dataIngestors/interactions/PoleCIngestor */ \"./src/dataIngestors/interactions/PoleCIngestor.js\");\nconst PoleTIngestor = __webpack_require__(/*! ../dataIngestors/interactions/PoleTIngestor */ \"./src/dataIngestors/interactions/PoleTIngestor.js\");\nconst Pole3EIngestor = __webpack_require__(/*! ../dataIngestors/interactions/Pole3EIngestor */ \"./src/dataIngestors/interactions/Pole3EIngestor.js\");\nconst EtablissementsStreamIngestor = __webpack_require__(/*! ../dataIngestors/EtablissementsStreamIngestor */ \"./src/dataIngestors/EtablissementsStreamIngestor.js\");\nconst NomenclaturesIngestor = __webpack_require__(/*! ../dataIngestors/NomenclaturesIngestor */ \"./src/dataIngestors/NomenclaturesIngestor.js\");\nconst SESEParamsIngestor = __webpack_require__(/*! ../dataIngestors/SESEParamsIngestor */ \"./src/dataIngestors/SESEParamsIngestor.js\");\n/*\nWikiT.xls\nEOS.xls\nSORA.xls\n*/\n\nconst destinationFolder = path.resolve(__dirname, ( false ? undefined : \"..\") + \"/uploads\");\n\nfs.existsSync(destinationFolder) || fs.mkdirSync(destinationFolder);\n\nconst storage = multer.diskStorage({\n  destination: function (req, file, cb) {\n    cb(null, destinationFolder);\n  },\n  filename: function (req, file, cb) {\n    const extension = path.extname(file.originalname);\n    let baseName = path.basename(file.originalname, extension);\n    baseName = baseName.toLowerCase();\n    const fileName = baseName + \".\" + new Date().toISOString() + extension;\n    cb(null, fileName);\n  }\n});\n\nconst removeOldFiles = (codeName, newFileName) => {\n  fs.readdirSync(destinationFolder).forEach(folderFileName => {\n    let regex = new RegExp(codeName, \"i\");\n    let match = folderFileName.match(regex);\n\n    if (match && folderFileName != newFileName) {\n      fs.unlinkSync(destinationFolder + \"/\" + folderFileName);\n    }\n  });\n  return;\n};\n\nconst upload = multer({ storage: storage });\n\nconst filesOptions = {\n  sora: {\n    fileName: \"sora\",\n    sheetName: \"v1\",\n    ingestorClass: PoleCIngestor\n  },\n  wikit: {\n    fileName: \"wikit\",\n    sheetName: \"wikit\",\n    ingestorClass: PoleTIngestor\n  },\n  eos: {\n    fileName: \"eos\",\n    sheetName: \"Sheet1\",\n    ingestorClass: Pole3EIngestor\n  },\n  siene: {\n    fileName: \"siene\",\n    ingestorClass: EtablissementsStreamIngestor\n  },\n  nomenclature: {\n    fileName: \"nomenclature\",\n    ingestorClass: NomenclaturesIngestor\n  },\n  sese: {\n    fileName: \"sese\",\n    ingestorClass: SESEParamsIngestor\n  }\n};\n\nrouter.post(\"/upload\", upload.any(), function (req, res) {\n  let responseData = {\n    files: {}\n  };\n\n  Promise.all(req.files.map(file => {\n    const fieldName = file.fieldname;\n    responseData.files[fieldName] = { success: null, message: null };\n\n    const keys = Object.keys(filesOptions);\n    const index = keys.indexOf(fieldName);\n    if (index > -1) {\n      const fileOptions = filesOptions[fieldName];\n      const filePath = file.path;\n      const sheetName = fileOptions.sheetName;\n\n      const dbParams = {\n        shouldSaveEntities: true,\n        shouldResetEntities: true\n      };\n      const ingestor = new fileOptions.ingestorClass(filePath, sheetName);\n      const ingestorPromise = ingestor.reset(dbParams).then(data => {\n        return ingestor.save(dbParams);\n      }).then(data => {\n        removeOldFiles(fieldName, file.filename);\n        responseData.files[fieldName].success = true;\n        responseData.files[fieldName].message = \"Uploaded and saved ! \";\n      }).catch(error => {\n        console.error(error);\n        console.error(error.stack);\n        responseData.files[fieldName].success = false;\n        responseData.files[fieldName].message = \"Ingestor error\";\n      });\n\n      if (fileOptions.fileName === \"siene\") {\n        responseData.files[fieldName].success = true;\n        responseData.files[fieldName].message = \"Processing upload...\";\n        return Promise.resolve();\n      }\n\n      return ingestorPromise;\n    }\n    responseData.files[fieldName].success = true;\n    responseData.files[fieldName].message = \"Uploaded ! \";\n    return Promise.resolve();\n  })).then(() => {\n    res.send(responseData);\n  });\n});\n\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/api/upload.js?");

/***/ }),

/***/ "./src/dataIngestors/CodesPostauxIngestor.js":
/*!***************************************************!*\
  !*** ./src/dataIngestors/CodesPostauxIngestor.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst Ingestor = __webpack_require__(/*! ./Ingestor */ \"./src/dataIngestors/Ingestor.js\");\nconst WorksheetHelper = __webpack_require__(/*! ../helpers/WorksheetHelper */ \"./src/helpers/WorksheetHelper.js\");\nconst CodePostal = __webpack_require__(/*! ../models/CodePostalModel */ \"./src/models/CodePostalModel.js\");\nconst Etablissement = __webpack_require__(/*! ../models/EtablissementModel */ \"./src/models/EtablissementModel.js\");\n\nclass CodesPostauxIngestor extends Ingestor {\n  constructor() {\n    super();\n    this.Model = CodePostal;\n  }\n\n  getData(params) {\n    if (params && params.etablissements) {\n      return this.getCodesPostauxFromEtablissements(params.etablissements);\n    } else if (params && params.mongo) {\n      return this.getCodesPostauxFromMongo();\n    }\n  }\n\n  getCodesPostauxFromEtablissements(etablissements) {\n    let postalCodes = [];\n    let codes = [];\n    etablissements.map(etablissement => {\n      let postalCode = {\n        code_postal: etablissement.code_postal\n      };\n      if (!codes.includes(postalCode.code_postal)) {\n        postalCodes.push(postalCode);\n        codes.push(postalCode.code_postal);\n      }\n    });\n    return postalCodes;\n  }\n\n  getCodesPostauxFromMongo() {\n    let postalCodes = [];\n    return Etablissement.findDisctinctCodesPostaux().then(codes => {\n      codes.map(code => {\n        let postalCode = {\n          code_postal: code\n        };\n        postalCodes.push(postalCode);\n      });\n      return postalCodes;\n    });\n  }\n}\n\nmodule.exports = CodesPostauxIngestor;\n\n//# sourceURL=webpack:///./src/dataIngestors/CodesPostauxIngestor.js?");

/***/ }),

/***/ "./src/dataIngestors/CommunesIngestor.js":
/*!***********************************************!*\
  !*** ./src/dataIngestors/CommunesIngestor.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst Ingestor = __webpack_require__(/*! ./Ingestor */ \"./src/dataIngestors/Ingestor.js\");\nconst WorksheetHelper = __webpack_require__(/*! ../helpers/WorksheetHelper */ \"./src/helpers/WorksheetHelper.js\");\nconst Commune = __webpack_require__(/*! ../models/CommuneModel */ \"./src/models/CommuneModel.js\");\nconst Etablissement = __webpack_require__(/*! ../models/EtablissementModel */ \"./src/models/EtablissementModel.js\");\n\nclass CommunesIngestor extends Ingestor {\n  constructor() {\n    super();\n    this.Model = Commune;\n  }\n\n  getData(params) {\n    if (params && params.etablissements) {\n      return this.getCommunesFromEtablissements(params.etablissements);\n    } else if (params && params.mongo) {\n      return this.getCommunesFromMongo();\n    }\n  }\n\n  getCommunesFromEtablissements(etablissements) {\n    let communes = [];\n    let codes = [];\n    etablissements.map(etablissement => {\n      let commune = {\n        libelle_commune: etablissement.libelle_commune,\n        code_commune: etablissement.code_commune\n      };\n      if (!codes.includes(commune.code_commune)) {\n        communes.push(commune);\n        codes.push(commune.code_commune);\n      }\n    });\n    return communes;\n  }\n\n  getCommunesFromMongo() {\n    let communes = [];\n    return Etablissement.findDisctinctCommunes().then(codes => {\n      codes.map(code => {\n        let commune = {\n          libelle_commune: code\n        };\n        communes.push(commune);\n      });\n      return communes;\n    });\n  }\n}\n\nmodule.exports = CommunesIngestor;\n\n//# sourceURL=webpack:///./src/dataIngestors/CommunesIngestor.js?");

/***/ }),

/***/ "./src/dataIngestors/DepartementsIngestor.js":
/*!***************************************************!*\
  !*** ./src/dataIngestors/DepartementsIngestor.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst Ingestor = __webpack_require__(/*! ./Ingestor */ \"./src/dataIngestors/Ingestor.js\");\nconst WorksheetHelper = __webpack_require__(/*! ../helpers/WorksheetHelper */ \"./src/helpers/WorksheetHelper.js\");\nconst Departement = __webpack_require__(/*! ../models/DepartementModel */ \"./src/models/DepartementModel.js\");\nconst Etablissement = __webpack_require__(/*! ../models/EtablissementModel */ \"./src/models/EtablissementModel.js\");\n\nclass DepartementsIngestor extends Ingestor {\n  constructor() {\n    super();\n    this.Model = Departement;\n  }\n\n  getData(params) {\n    if (params && params.etablissements) {\n      return this.getDepartementsFromEtablissements(params.etablissements);\n    } else if (params && params.mongo) {\n      return this.getDepartementsFromMongo();\n    }\n  }\n\n  getDepartementsFromEtablissements(etablissements) {\n    let departements = [];\n    let codes = [];\n    etablissements.map(etablissement => {\n      let departement = {\n        code_departement: etablissement.code_departement\n      };\n      if (!codes.includes(departement.code_departement)) {\n        departements.push(departement);\n        codes.push(departement.code_departement);\n      }\n    });\n    return departements;\n  }\n\n  getDepartementsFromMongo() {\n    let departements = [];\n    return Etablissement.findDisctinctDepartements().then(codes => {\n      codes.map(code => {\n        let departement = {\n          code_departement: code\n        };\n        departements.push(departement);\n      });\n      return departements;\n    });\n  }\n}\n\nmodule.exports = DepartementsIngestor;\n\n//# sourceURL=webpack:///./src/dataIngestors/DepartementsIngestor.js?");

/***/ }),

/***/ "./src/dataIngestors/EtablissementsStreamIngestor.js":
/*!***********************************************************!*\
  !*** ./src/dataIngestors/EtablissementsStreamIngestor.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst csv = __webpack_require__(/*! fast-csv */ \"fast-csv\");\nconst Queue = __webpack_require__(/*! promise-queue */ \"promise-queue\");\n\nconst Ingestor = __webpack_require__(/*! ./Ingestor */ \"./src/dataIngestors/Ingestor.js\");\nconst ObjectManipulations = __webpack_require__(/*! ../utils/ObjectManipulations */ \"./src/utils/ObjectManipulations.js\");\n\nconst Etablissement = __webpack_require__(/*! ../models/EtablissementModel */ \"./src/models/EtablissementModel.js\");\nconst CommunesIngestor = __webpack_require__(/*! ./CommunesIngestor */ \"./src/dataIngestors/CommunesIngestor.js\");\nconst DepartementsIngestor = __webpack_require__(/*! ./DepartementsIngestor */ \"./src/dataIngestors/DepartementsIngestor.js\");\nconst CodesPostauxIngestor = __webpack_require__(/*! ./CodesPostauxIngestor */ \"./src/dataIngestors/CodesPostauxIngestor.js\");\n\nclass EtablissementsStreamIngestor extends Ingestor {\n  constructor(filePath) {\n    super();\n    console.log(\"[EtablissementsStreamIngestor] Instantiated with filepath\", filePath);\n    this.filePath = filePath;\n    this.Model = Etablissement;\n    this.bufferItems = [];\n    this.nbItemsSaved = 0;\n    this.nbItemsToSave = 0;\n    this.promiseQueue = new Queue(50, Infinity);\n    this.intervalId = null;\n  }\n\n  saveEntities() {\n    let entities = { communes: [], codesPostaux: [], departements: [] };\n    const communesIngestor = new CommunesIngestor();\n    const departementsIngestor = new DepartementsIngestor();\n    const codesPostauxIngestor = new CodesPostauxIngestor();\n\n    const saveParams = {\n      mongo: true\n    };\n    console.log(\"[EtablissementsStreamIngestor] Saving communes\");\n    return communesIngestor.save(saveParams).then(data => {\n      entities.communes = data[0];\n      console.log(\"[EtablissementsStreamIngestor] Saving departements\");\n\n      return departementsIngestor.save(saveParams);\n    }).then(data => {\n      entities.departements = data[0];\n      console.log(\"[EtablissementsStreamIngestor] Saving code postaux\");\n      return codesPostauxIngestor.save(saveParams);\n    }).then(data => {\n      entities.codesPostaux = data[0];\n      return entities;\n    });\n  }\n\n  flushBuffer(force) {\n    const length = this.bufferItems.length;\n    if (length >= 10000 || force) {\n      this.nbItemsToSave = this.nbItemsToSave + length;\n      const items = [...this.bufferItems];\n      this.promiseQueue.add(() => {\n        return this.Model.insertMany(items).then(() => {\n          this.nbItemsSaved += items.length;\n        });\n      });\n\n      this.bufferItems = [];\n    }\n  }\n\n  save(params) {\n    console.log(\"[EtablissementsStreamIngestor] Starting ingestion\");\n    const promise = new Promise((resolve, reject) => {\n      let index = 0;\n      console.log(\"[EtablissementsStreamIngestor] Opening file : \" + this.filePath);\n      this.nbItemsToSave = 0;\n      csv.fromPath(this.filePath, { headers: true }).on(\"data\", data => {\n        let keys = Object.keys(data);\n        let item = {};\n        item = keys.reduce((acc, key) => {\n          acc[key.toLowerCase()] = data[key];\n          return acc;\n        }, {});\n        ObjectManipulations.clean(item);\n\n        this.bufferItems.push(item);\n        this.flushBuffer();\n        index++;\n        if (index < 2) console.log(item);\n      }).on(\"end\", () => {\n        console.log(\"[EtablissementsStreamIngestor] end callback from file\");\n        this.flushBuffer(true);\n\n        this.intervalId = setInterval(() => {\n          console.log(\"[EtablissementsStreamIngestor] checking promise queue length\");\n          const queueLength = this.promiseQueue.getQueueLength();\n          const pendingLength = this.promiseQueue.getPendingLength();\n          const remaining = queueLength + pendingLength;\n          console.log(`[EtablissementsStreamIngestor] ${(this.nbItemsSaved * 100 / this.nbItemsToSave).toFixed(2)}% -  ${this.nbItemsSaved} / ${this.nbItemsToSave} `);\n          console.log(`[EtablissementsStreamIngestor] Remaining processes : ${remaining}`);\n          if (remaining == 0) {\n            let responseData = {\n              nb: index,\n              nbItemsSaved: this.nbItemsSaved\n            };\n            if (params && params.shouldSaveEntities) {\n              console.log(\"[EtablissementsStreamIngestor] Saving entities\");\n              this.saveEntities().then(data => {\n                responseData.entities = data;\n                console.log(\"[EtablissementsStreamIngestor] Finishing\");\n                resolve(responseData);\n              }).catch(err => {\n                reject(err);\n              });\n            } else {\n              console.log(\"[EtablissementsStreamIngestor] Finishing\");\n\n              resolve(responseData);\n            }\n            clearInterval(this.intervalId);\n          }\n        }, 600);\n      });\n    });\n    return promise;\n  }\n\n  resetEntities() {\n    let entities = { communes: {}, codesPostaux: {}, departements: {} };\n    const communesIngestor = new CommunesIngestor();\n    const departementsIngestor = new DepartementsIngestor();\n    const codesPostauxIngestor = new CodesPostauxIngestor();\n\n    return communesIngestor.reset().then(data => {\n      entities.communes = data;\n      return departementsIngestor.reset();\n    }).then(data => {\n      entities.departements = data;\n      return codesPostauxIngestor.reset();\n    }).then(data => {\n      entities.codesPostaux = data;\n\n      return entities;\n    });\n  }\n\n  reset(params) {\n    if (params && params.shouldResetEntities) {\n      let responseData = { etablissements: {}, entities: {} };\n      return super.reset().then(data => {\n        responseData.etablissements = data;\n        return this.resetEntities();\n      }).then(data => {\n        responseData.entities = data;\n        return responseData;\n      });\n    } else {\n      return super.reset();\n    }\n  }\n}\n\nmodule.exports = EtablissementsStreamIngestor;\n\n//# sourceURL=webpack:///./src/dataIngestors/EtablissementsStreamIngestor.js?");

/***/ }),

/***/ "./src/dataIngestors/Ingestor.js":
/*!***************************************!*\
  !*** ./src/dataIngestors/Ingestor.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst XLSX = __webpack_require__(/*! xlsx */ \"xlsx\");\nconst NotImplementedError = __webpack_require__(/*! ../errors/NotImplementedError */ \"./src/errors/NotImplementedError.js\");\n\nclass Ingestor {\n  constructor(filePath, sheetName) {\n    if (filePath) {\n      const workbook = XLSX.readFile(filePath);\n      this.workbook = workbook;\n      if (sheetName) {\n        this.workSheet = workbook.Sheets[sheetName];\n      }\n    }\n  }\n\n  getData() {\n    throw new NotImplementedError(\"You must implement getDate method in child.\");\n  }\n\n  save(params) {\n    let promises = [];\n    if (params && params.mongo) {\n      let promise = this.getData(params).then(data => {\n        return this.Model.insertMany(data);\n      });\n      promises.push(promise);\n    } else {\n      const data = this.getData(params);\n      promises = data.map(item => {\n        const model = new this.Model(item);\n        return model.save();\n      });\n    }\n    return Promise.all(promises);\n  }\n\n  reset(params) {\n    if (this.Model) {\n      let p = params && params.removeParams || {};\n      return this.Model.remove(p);\n    } else {\n      throw new NotImplementedError(\"You must implement reset method in child or define a Model.\");\n    }\n  }\n}\n\nmodule.exports = Ingestor;\n\n//# sourceURL=webpack:///./src/dataIngestors/Ingestor.js?");

/***/ }),

/***/ "./src/dataIngestors/NomenclaturesIngestor.js":
/*!****************************************************!*\
  !*** ./src/dataIngestors/NomenclaturesIngestor.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst Ingestor = __webpack_require__(/*! ./Ingestor */ \"./src/dataIngestors/Ingestor.js\");\nconst WorkbookHelper = __webpack_require__(/*! ../helpers/WorkbookHelper */ \"./src/helpers/WorkbookHelper.js\");\nconst NomenclatureModel = __webpack_require__(/*! ../models/NomenclatureModel */ \"./src/models/NomenclatureModel.js\");\n\nclass NomenclaturesIngestor extends Ingestor {\n  constructor(filePath) {\n    super(filePath);\n    this.Model = NomenclatureModel;\n  }\n\n  getData() {\n    const nomenclatures = this.getNomenclatures();\n    const keys = Object.keys(nomenclatures);\n    let data = [];\n\n    keys.map(key => {\n      data = [...data, ...nomenclatures[key]];\n    });\n    return data;\n  }\n\n  getNomenclatures() {\n    const wbh = new WorkbookHelper(this.workbook);\n    const defaultSheetsParams = {\n      columnsToKeep: {\n        A: \"code\",\n        B: \"libelle\"\n      }\n    };\n    const sheetsParams = {\n      Code_activite_NAF: defaultSheetsParams,\n      Code_Qualite_siege_2: defaultSheetsParams,\n      Code_Qualite_siege: defaultSheetsParams,\n      \"Source_dernier_eff_phy \": {\n        columnsToKeep: {\n          A: \"code\",\n          B: \"libelle_court\",\n          C: \"libelle\"\n        }\n      },\n      Code_CJ3: {\n        columnsToKeep: {\n          A: \"code\",\n          B: \"libelle_CJ3\",\n          C: \"libelle_CJ1\"\n        }\n      },\n      Tranche_effectif: defaultSheetsParams,\n      Code_Modalite_activ_: defaultSheetsParams,\n      Codes_IDCC: defaultSheetsParams,\n      code_etat: defaultSheetsParams,\n      code_région: defaultSheetsParams\n    };\n\n    let sheetsData = wbh.getSheetsData(sheetsParams);\n    for (let sheetName in sheetsData) {\n      sheetsData[sheetName] = sheetsData[sheetName].map(nomenclature => {\n        nomenclature.categorie = sheetName.toLowerCase().trim();\n        return nomenclature;\n      });\n    }\n    return sheetsData;\n  }\n}\n\nmodule.exports = NomenclaturesIngestor;\n\n//# sourceURL=webpack:///./src/dataIngestors/NomenclaturesIngestor.js?");

/***/ }),

/***/ "./src/dataIngestors/SESEParamsIngestor.js":
/*!*************************************************!*\
  !*** ./src/dataIngestors/SESEParamsIngestor.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst Ingestor = __webpack_require__(/*! ./Ingestor */ \"./src/dataIngestors/Ingestor.js\");\nconst WorksheetHelper = __webpack_require__(/*! ../helpers/WorksheetHelper */ \"./src/helpers/WorksheetHelper.js\");\nconst Etablissement = __webpack_require__(/*! ../models/EtablissementModel */ \"./src/models/EtablissementModel.js\");\n\nclass SESEParamsIngestor extends Ingestor {\n  constructor(filePath) {\n    super(filePath);\n    const sheetName = this.workbook.SheetNames[0];\n    this.workSheet = this.workbook.Sheets[sheetName];\n  }\n\n  getData() {\n    console.log(\"[SESEParamsIngestor] Parsing data\");\n    const wsh = new WorksheetHelper(this.workSheet, {\n      keysToLowerCase: true\n    });\n\n    const rowsData = wsh.getRowsData();\n    return rowsData;\n  }\n\n  getSESEParams() {\n    return this.getData();\n  }\n\n  save() {\n    const data = this.getData();\n    console.log(\"[SESEParamsIngestor] Saving data\");\n    const total = data.length;\n    let processed = 0;\n    const promises = data.map(SESEParam => {\n      const siret = SESEParam.siret;\n\n      console.log(`[SESEParamsIngestor] Updating etablissement ${siret}`);\n\n      return Etablissement.update({ siret: siret }, { sese: SESEParam }).then(() => {\n        console.log(`[SESEParamsIngestor] Processed etablissement ${siret}`);\n      }, err => console.error(`[SESEParamsIngestor] ${err}`)).then(() => {\n        processed++;\n        console.log(`[SESEParamsIngestor] ${(processed * 100 / total).toFixed(2)}% - ${processed} / ${total}`);\n      });\n    });\n\n    return Promise.all(promises).then(data => {\n      console.log(\"[SESEParamsIngestor] Saved all data\");\n      const response = data.filter(d => d != undefined);\n      console.log(\"[SESEParamsIngestor] response:\", response);\n      return response;\n    });\n  }\n\n  reset() {\n    console.log(\"[SESEParamsIngestor] reset\");\n    return Etablissement.update({ $unset: { sese: \"\" } });\n  }\n}\n\nmodule.exports = SESEParamsIngestor;\n\n//# sourceURL=webpack:///./src/dataIngestors/SESEParamsIngestor.js?");

/***/ }),

/***/ "./src/dataIngestors/interactions/InteractionsIngestor.js":
/*!****************************************************************!*\
  !*** ./src/dataIngestors/interactions/InteractionsIngestor.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst Ingestor = __webpack_require__(/*! ../Ingestor */ \"./src/dataIngestors/Ingestor.js\");\nconst WorksheetHelper = __webpack_require__(/*! ../../helpers/WorksheetHelper */ \"./src/helpers/WorksheetHelper.js\");\nconst Interaction = __webpack_require__(/*! ../../models/InteractionModel */ \"./src/models/InteractionModel.js\");\n\nclass InteractionsIngestor extends Ingestor {\n  constructor(filePath, sheetName, pole) {\n    super(filePath, sheetName);\n    this.pole = pole;\n    this.Model = Interaction;\n  }\n\n  getData() {\n    const wsh = new WorksheetHelper(this.workSheet);\n\n    let rowsData = wsh.getRowsData(this.columnsToKeep);\n    rowsData = rowsData.map(row => {\n      row.pole = this.pole;\n      return row;\n    });\n    return rowsData;\n  }\n\n  getInteractions() {\n    return this.getData();\n  }\n\n  reset() {\n    const params = {\n      removeParams: {\n        pole: this.pole\n      }\n    };\n    return super.reset(params);\n  }\n}\n\nmodule.exports = InteractionsIngestor;\n\n//# sourceURL=webpack:///./src/dataIngestors/interactions/InteractionsIngestor.js?");

/***/ }),

/***/ "./src/dataIngestors/interactions/Pole3EIngestor.js":
/*!**********************************************************!*\
  !*** ./src/dataIngestors/interactions/Pole3EIngestor.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst InteractionsIngestor = __webpack_require__(/*! ./InteractionsIngestor */ \"./src/dataIngestors/interactions/InteractionsIngestor.js\");\n\nclass Pole3EIngestor extends InteractionsIngestor {\n  constructor(filePath, sheetName) {\n    const pole = \"3E\";\n    super(filePath, sheetName, pole);\n    const columnsToKeep = {\n      A: \"siret\",\n      C: \"date\",\n      D: \"unite\",\n      E: \"type_intervention\"\n    };\n    this.columnsToKeep = columnsToKeep;\n  }\n}\n\nmodule.exports = Pole3EIngestor;\n\n//# sourceURL=webpack:///./src/dataIngestors/interactions/Pole3EIngestor.js?");

/***/ }),

/***/ "./src/dataIngestors/interactions/PoleCIngestor.js":
/*!*********************************************************!*\
  !*** ./src/dataIngestors/interactions/PoleCIngestor.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst InteractionsIngestor = __webpack_require__(/*! ./InteractionsIngestor */ \"./src/dataIngestors/interactions/InteractionsIngestor.js\");\n\nclass PoleCIngestor extends InteractionsIngestor {\n  constructor(filePath, sheetName) {\n    const pole = \"C\";\n    super(filePath, sheetName, pole);\n    const columnsToKeep = {\n      A: \"siret\",\n      B: \"date\",\n      E: \"unite\"\n    };\n    this.columnsToKeep = columnsToKeep;\n  }\n}\n\nmodule.exports = PoleCIngestor;\n\n//# sourceURL=webpack:///./src/dataIngestors/interactions/PoleCIngestor.js?");

/***/ }),

/***/ "./src/dataIngestors/interactions/PoleTIngestor.js":
/*!*********************************************************!*\
  !*** ./src/dataIngestors/interactions/PoleTIngestor.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst InteractionsIngestor = __webpack_require__(/*! ./InteractionsIngestor */ \"./src/dataIngestors/interactions/InteractionsIngestor.js\");\n\nclass PoleTIngestor extends InteractionsIngestor {\n  constructor(filePath, sheetName) {\n    const pole = \"T\";\n    super(filePath, sheetName, pole);\n    const columnsToKeep = {\n      A: \"siret\",\n      C: \"date\",\n      D: \"unite\",\n      E: \"type_intervention\",\n      F: \"cible_intervention\"\n    };\n    this.columnsToKeep = columnsToKeep;\n  }\n}\n\nmodule.exports = PoleTIngestor;\n\n//# sourceURL=webpack:///./src/dataIngestors/interactions/PoleTIngestor.js?");

/***/ }),

/***/ "./src/errors/NotImplementedError.js":
/*!*******************************************!*\
  !*** ./src/errors/NotImplementedError.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @summary A error thrown when a method is defined but not implemented (yet).\n * @param {any} message An additional message for the error.\n */\nfunction NotImplementedError(message) {\n  ///<summary>The error thrown when the given function isn't implemented.</summary>\n  const sender = new Error().stack.split(\"\\n\")[2].replace(\" at \", \"\");\n\n  this.message = `The method ${sender} isn't implemented.`;\n\n  // Append the message if given.\n  if (message) this.message += ` Message: \"${message}\".`;\n\n  let str = this.message;\n\n  while (str.indexOf(\"  \") > -1) {\n    str = str.replace(\"  \", \" \");\n  }\n\n  this.message = str;\n}\n\nNotImplementedError.prototype = Object.create(Error.prototype, {\n  constructor: { value: NotImplementedError },\n  name: { value: \"NotImplementedError\" },\n  stack: {\n    get: function () {\n      return new Error().stack;\n    }\n  }\n});\n\nmodule.exports = NotImplementedError;\n\n//# sourceURL=webpack:///./src/errors/NotImplementedError.js?");

/***/ }),

/***/ "./src/frentreprise/datasources/Mongo.js":
/*!***********************************************!*\
  !*** ./src/frentreprise/datasources/Mongo.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _EtablissementModel = __webpack_require__(/*! ../../models/EtablissementModel */ \"./src/models/EtablissementModel.js\");\n\nvar _EtablissementModel2 = _interopRequireDefault(_EtablissementModel);\n\nvar _InteractionModel = __webpack_require__(/*! ../../models/InteractionModel */ \"./src/models/InteractionModel.js\");\n\nvar _InteractionModel2 = _interopRequireDefault(_InteractionModel);\n\nvar _NomenclatureModel = __webpack_require__(/*! ../../models/NomenclatureModel */ \"./src/models/NomenclatureModel.js\");\n\nvar _NomenclatureModel2 = _interopRequireDefault(_NomenclatureModel);\n\nvar _frentreprise = __webpack_require__(/*! frentreprise */ \"frentreprise\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\n// PrivateMethods\nconst _ = {};\n[\"mongoToCleanModel\", \"getCleanYear\", \"getCleanBool\", \"getCleanDate\", \"getCleanAddress\", \"getObjectKey\", \"runAttrMap\", \"getNomenclatureValue\"].forEach(key => {\n  _[key] = Symbol(key);\n}, undefined);\n\nclass Mongo extends _frentreprise.DataSource {\n  getSIRET(siret) {\n    var _this = this;\n\n    return _asyncToGenerator(function* () {\n      let siene_sese = null;\n      let interactions = null;\n\n      try {\n        siene_sese = yield _EtablissementModel2.default.findBySIRET(siret);\n      } catch (exception) {\n        console.error(exception);\n      }\n\n      try {\n        interactions = yield _InteractionModel2.default.findBySIRET(siret);\n      } catch (exception) {\n        console.error(exception);\n      }\n\n      return yield _this[_.mongoToCleanModel](siene_sese, interactions);\n    })();\n  }\n\n  [_.mongoToCleanModel](siene_sese, interactions) {\n    var _this2 = this;\n\n    return _asyncToGenerator(function* () {\n      const out = {};\n\n      if (siene_sese && typeof siene_sese === \"object\") {\n        const siret_siege = _this2[_.getObjectKey](\"siren\", siene_sese) + _this2[_.getObjectKey](\"nic_du_siege\", siene_sese) || null;\n\n        const attr_map = {\n          _etData: function (obj) {\n            return {\n              raison_sociale: _this2[_.getObjectKey](\"raison_sociale\", obj),\n              nom: _this2[_.getObjectKey](\"nom\", obj),\n              prenom: _this2[_.getObjectKey](\"prenom\", obj)\n            };\n          },\n          enseigne: \"enseigne\",\n          siret: \"siret\",\n          siege_social: function (obj) {\n            return siret_siege === _this2[_.getObjectKey](\"siret\", obj);\n          },\n          categorie_etablissement: _this2[_.getNomenclatureValue].bind(_this2, \"code_qualite_siege\", \"code_qualite_siege\"),\n          adresse: _this2[_.getCleanAddress],\n          adresse_components: function (obj) {\n            return {\n              numero_voie: obj.numero_voie,\n              type_voie: obj.code_type_de_voie,\n              nom_voie: obj.libelle_voie,\n              complement_adresse: obj.complement_adresse,\n              code_postal: obj.code_postal,\n              localite: obj.libelle_commune\n            };\n          },\n          departement: \"code_departement\",\n          direccte: \"interactions\",\n          region: _this2[_.getNomenclatureValue].bind(_this2, \"code_région\", \"code_region\"),\n          code_region: function (obj) {\n            return +_this2[_.getObjectKey](\"code_region\", obj) || 0;\n          },\n          date_creation: _this2[_.getCleanDate].bind(_this2, \"date_de_creation\"),\n          etat_etablissement: (() => {\n            var _ref = _asyncToGenerator(function* (obj) {\n              return {\n                label: yield _this2[_.getNomenclatureValue](\"code_etat\", \"code_etat\", obj),\n                date: _this2[_.getCleanDate](\"date_de_l_etat\", obj)\n              };\n            });\n\n            return function etat_etablissement(_x) {\n              return _ref.apply(this, arguments);\n            };\n          })(),\n          activite: (() => {\n            var _ref2 = _asyncToGenerator(function* (obj) {\n              if (!_this2[_.getObjectKey](\"code_activite\", obj)) {\n                return null;\n              }\n              return _this2[_.getObjectKey](\"code_activite\", obj) + \" - \" + (yield _this2[_.getNomenclatureValue](\"code_activite_naf\", \"code_activite\", obj));\n            });\n\n            return function activite(_x2) {\n              return _ref2.apply(this, arguments);\n            };\n          })(),\n          date_debut_activite_economique: _this2[_.getCleanDate].bind(_this2, \"date_debut_activite\"),\n          modalite_activite: _this2[_.getNomenclatureValue].bind(_this2, \"code_modalite_activ_\", \"code_modalite_activ_\"),\n          caractere_saisonnier: _this2[_.getNomenclatureValue].bind(_this2, \"caractere_saisonnier\", \"code_car__saisonnier\"),\n          caractere_auxiliaire: _this2[_.getNomenclatureValue].bind(_this2, \"caractere_auxiliaire\", \"code_car__auxiliaire\"),\n          accords: function (obj) {\n            const sese = typeof obj.sese === \"object\" ? obj.sese : {};\n            const intVal = function (val) {\n              return +val || 0;\n            };\n            return {\n              nb_accords: intVal(sese.nb_accord),\n              details: {\n                \"Épargne salariale\": intVal(sese.obs1),\n                \"Salaires / rémunérations\": intVal(sese.obs2),\n                \"Durée du travail / repos\": intVal(sese.obs3),\n                \"Égalité professionnelle femmes-hommes\": intVal(sese.obs4),\n                \"Droit syndical et représentation du personnel\": intVal(sese.obs5),\n                \"Emploi / GPEC\": intVal(sese.obs6),\n                \"Conditions de travail\": intVal(sese.obs7),\n                \"Prévoyance / protection sociale complémentaire\": intVal(sese.obs8),\n                Autres: intVal(sese.obs9)\n              }\n            };\n          },\n          pole_competitivite: function (obj) {\n            const sese = typeof obj.sese === \"object\" ? obj.sese : {};\n            if (+sese.pole_compet) {\n              const poles = [];\n              for (let i = 1; i <= 10; i++) {\n                const pole = sese[`pole${i}`];\n                if (typeof pole === \"string\" && pole.trim().length) {\n                  poles.push(pole);\n                }\n              }\n              return poles;\n            }\n            return undefined;\n          },\n          ea: function (obj) {\n            const sese = obj.sese || {};\n            return !!sese.ea ? {\n              nb_postes_2017: +sese.nb_postes_2017\n            } : undefined;\n          },\n          alternance: function (obj) {\n            const sese = typeof obj.sese === \"object\" ? obj.sese : {};\n\n            if (+sese.alternance) {\n              return {\n                apprentisage: +sese.appr_tot || 0,\n                professionnalisation: +sese.ct_pro_tot || 0\n              };\n            }\n\n            return undefined;\n          },\n          prime_embauche_pme: function (obj) {\n            return +(obj.sese || {}).emb_pme;\n          },\n          marchand: function (obj) {\n            const codeMarchand = obj.code_marchand;\n            let codeMarchandStr = null;\n\n            if (codeMarchand === \"MARCH\") {\n              codeMarchandStr = \"Marchand (MARCH)\";\n            } else if (codeMarchand === \"NMPRI\") {\n              codeMarchandStr = \"Non marchand, ressources du privé (NMPRI)\";\n            } else if (codeMarchand === \"NMPUB\") {\n              codeMarchandStr = \"Non marchand, ressources du public (NMPUB)\";\n            } else if (codeMarchand) {\n              codeMarchandStr = `(${codeMarchand})`;\n            }\n            return codeMarchandStr;\n          },\n          etablissement_employeur: _this2[_.getCleanBool].bind(_this2, \"code_employeur\"),\n          tranche_effectif_insee: _this2[_.getNomenclatureValue].bind(_this2, \"tranche_effectif\", \"tranche_eff__insee\"),\n          annee_tranche_effectif_insee: _this2[_.getCleanYear].bind(_this2, \"annee_tranche_eff_\"),\n          dernier_effectif_physique: \"dernier_eff__physique\",\n          date_dernier_effectif_physique: _this2[_.getCleanYear].bind(_this2, \"date_der_eff_physique\"),\n          source_dernier_effectif_physique: _this2[_.getNomenclatureValue].bind(_this2, \"source_dernier_eff_phy\", \"source_dernier_eff_phy\"),\n          unite_controle_competente: \"code_section\",\n          annee_idcc: \"annee_idcc\",\n          codes_idcc: _this2[_.getNomenclatureValue].bind(_this2, \"codes_idcc\", \"codes_idcc\"),\n          eti_pepite: \"sese.eos_eti_pepite_\",\n          filiere_strategique: function (obj) {\n            return obj.sese && (\"\" + (obj.sese.eos_filiere || \"\")).replace(\"\\n\", \" \").trim();\n          },\n          structure_insertion_activite_economique: _this2[_.getCleanBool].bind(_this2, \"sese.siae\"),\n          structure_insertion_activite_economique_types: function (obj) {\n            return obj[\"sese\"] ? {\n              aci: _this2[_.getCleanBool](\"aci\", obj[\"sese\"]),\n              ai: _this2[_.getCleanBool](\"ai\", obj[\"sese\"]),\n              ei: _this2[_.getCleanBool](\"ei\", obj[\"sese\"]),\n              etti: _this2[_.getCleanBool](\"etti\", obj[\"sese\"])\n            } : {};\n          },\n          activite_partielle_24_derniers_mois: function (obj) {\n            if (_this2[_.getCleanBool](\"sese.acp\", obj)) {\n              const yearKeys = [];\n\n              for (let i = 0; i < 10; i++) {\n                const year = +obj.sese[`acp_annee${i}_auto`];\n                if (year > 0) {\n                  yearKeys.push(year);\n                }\n              }\n\n              if (yearKeys.length > 0) {\n                yearKeys.sort(function (a, b) {\n                  return a - b;\n                });\n\n                return yearKeys.reduce(function (acp, year) {\n                  return _extends({}, acp, {\n                    [year]: {\n                      heures_demandees: +obj.sese[`acp_nbh_auto_${year}`] || null,\n                      heures_consommees: +obj.sese[`acp_nbh_conso_${year}`] || null\n                    }\n                  });\n                }, {});\n              }\n            }\n            return null;\n          },\n          pse_en_projet_ou_en_cours: function (obj) {\n            const pse = {};\n\n            if (typeof obj.sese === \"object\") {\n              for (let i = 0; i < 10; i++) {\n                const year = +obj.sese[`pse_annee${i}`];\n                if (year > 0) {\n                  pse[year] = {\n                    etat: obj.sese[`pse_etat${i}`],\n                    poste: obj.sese[`pse_poste${i}`]\n                  };\n                }\n              }\n            }\n\n            return Object.keys(pse).length ? pse : null;\n          }\n        };\n\n        yield _this2[_.runAttrMap](siene_sese, attr_map, out);\n      }\n\n      if (interactions && typeof interactions === \"object\") {\n        out.direccte = interactions;\n      }\n\n      return out;\n    })();\n  }\n\n  [_.runAttrMap](source, attrMap, out) {\n    var _this3 = this;\n\n    return _asyncToGenerator(function* () {\n      var keys = Object.keys(attrMap);\n      for (let i = 0; i < keys.length; i++) {\n        const key = keys[i];\n        const mapping = attrMap[key];\n\n        if (typeof mapping === \"string\") {\n          out[key] = _this3[_.getObjectKey](mapping, source);\n        }\n\n        if (typeof mapping === \"function\") {\n          out[key] = yield Promise.resolve(mapping(source));\n        }\n      }\n    })();\n  }\n\n  [_.getObjectKey](key, obj) {\n    const path = key.split(\".\");\n\n    let result = obj;\n\n    for (let i = 0; i < path.length; i++) {\n      const objkey = path[i];\n      if (typeof result === \"object\" && objkey in result) {\n        result = result[objkey];\n      } else {\n        result = undefined;\n        break;\n      }\n    }\n\n    return result;\n  }\n\n  [_.getCleanYear](key, obj) {\n    return this[_.getCleanDate](key, obj);\n  }\n\n  [_.getCleanDate](key, obj) {\n    return this[_.getObjectKey](key, obj);\n  }\n\n  [_.getCleanBool](key, obj) {\n    return !!(obj[key] === true || /^(1|true|O)$/.test((\"\" + this[_.getObjectKey](key, obj)).trim()));\n  }\n\n  [_.getCleanAddress](obj) {\n    return `\n    ${obj.numero_voie || \"\"} ${obj.code_type_de_voie || \"\"} ${obj.libelle_voie || obj.nom_voie || \"\"}\n    ${obj.complement_adresse || \"\"}\n    ${obj.cedex ? `(${obj.cedex})` : \"\"}\n    ${obj.code_postal || \"\"}\n    ${obj.libelle_commune || obj.localite || \"\"}\n    `.trim().split(\"\\n\").map(l => l.trim()).filter(l => l.length).join(\"\\n\");\n  }\n\n  [_.getNomenclatureValue](category, key, obj) {\n    const val = this[_.getObjectKey](key, obj);\n\n    let nomKey = \"libelle\";\n    let cat = category;\n    if (typeof category === \"object\") {\n      cat = category.category;\n      if (category.key === \"string\") {\n        nomKey = category.key;\n      }\n    }\n\n    if (category === \"caractere_saisonnier\") {\n      const table = { P: \"Permanente\", S: \"Saisonnière\", NR: \"Non renseignée\" };\n      if (typeof val === \"string\" && table[val]) return table[val];\n    }\n\n    if (category === \"caractere_auxiliaire\") {\n      const table = { P: \"Auxiliaire\", N: \"Non auxiliaire\" };\n      if (typeof val === \"string\" && table[val]) return table[val];\n    }\n\n    return _NomenclatureModel2.default.findOneByCategoryAndCode(cat, val).then(nom => nom && nom[nomKey] || val);\n  }\n\n  getSIREN(SIREN) {\n    var _this4 = this;\n\n    return _asyncToGenerator(function* () {\n      if (!(0, _frentreprise.isSIREN)(SIREN)) return {};\n\n      const sirets = yield _EtablissementModel2.default.findSIRETsBySIREN(SIREN);\n\n      const etablissements = [];\n      for (let i = 0; i < sirets.length; i++) {\n        etablissements.push((yield _this4.getSIRET(sirets[i])));\n      }\n\n      return {\n        siren: SIREN,\n        _ets: etablissements\n      };\n    })();\n  }\n\n  search(query) {\n    var _this5 = this;\n\n    return _asyncToGenerator(function* () {\n      let mongo = null;\n\n      try {\n        mongo = yield typeof query === \"object\" ? _EtablissementModel2.default.findByAdvancedSearch(query) : _EtablissementModel2.default.findByRaisonSociale(query);\n      } catch (exception) {\n        console.error(`Mongo::search() failed : ${exception}`);\n        return { error: true, message: exception };\n      }\n\n      const results = [];\n\n      if (mongo && Array.isArray(mongo)) {\n        for (let i = 0; i < mongo.length; i++) {\n          const model = yield _this5[_.mongoToCleanModel](mongo[i]);\n          if (model && typeof model === \"object\" && Object.keys(model).length > 0) {\n            results.push(model);\n          }\n        }\n      }\n\n      return results;\n    })();\n  }\n}\n\nmodule.exports = Mongo;\n\n//# sourceURL=webpack:///./src/frentreprise/datasources/Mongo.js?");

/***/ }),

/***/ "./src/frentreprise/models/Entreprise.js":
/*!***********************************************!*\
  !*** ./src/frentreprise/models/Entreprise.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _utils = __webpack_require__(/*! ../../utils */ \"./src/utils/index.js\");\n\nvar _Etablissement = __webpack_require__(/*! ./Etablissement */ \"./src/frentreprise/models/Etablissement.js\");\n\nvar _Etablissement2 = _interopRequireDefault(_Etablissement);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst { Entreprise } = __webpack_require__(/*! frentreprise */ \"frentreprise\");\n\nclass DireccteEntreprise extends Entreprise {\n  constructor(data, etsModel = _Etablissement2.default) {\n    super(data, etsModel);\n  }\n\n  export() {\n    const data = (0, _utils.copyKeys)(this, [\"siren\", \"raison_sociale\", \"nom_commercial\", \"nom\", \"prenom\", \"sigle\", \"categorie_juridique\", \"date_immatriculation_rcs\", \"date_de_creation\", \"date_de_radiation\", \"etat_entreprise\", \"categorie_entreprise\", \"tranche_effectif\", \"annee_tranche_effectif\", \"nombre_etablissements_actifs\", \"mandataires_sociaux\", \"siret_siege_social\", \"attestation_dgfip\", \"attestation_acoss\", \"_dataSources\"], null);\n\n    data[\"etablissements\"] = this.etablissements.map(ets => {\n      return ets.export();\n    });\n\n    return data;\n  }\n}\n\nexports.default = DireccteEntreprise;\nmodule.exports = DireccteEntreprise;\n\n//# sourceURL=webpack:///./src/frentreprise/models/Entreprise.js?");

/***/ }),

/***/ "./src/frentreprise/models/Etablissement.js":
/*!**************************************************!*\
  !*** ./src/frentreprise/models/Etablissement.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _utils = __webpack_require__(/*! ../../utils */ \"./src/utils/index.js\");\n\nconst { Etablissement } = __webpack_require__(/*! frentreprise */ \"frentreprise\");\n\nclass DireccteEtablissement extends Etablissement {\n  export(keys) {\n    return (0, _utils.copyKeys)(this, [\"siege_social\", \"siret\", \"enseigne\", \"categorie_etablissement\", \"adresse\", \"adresse_components\", \"departement\", \"region\", \"code_region\", \"date_creation\", \"etat_etablissement\", \"activite\", \"date_debut_activite_economique\", \"modalite_activite\", \"marchand\", \"etablissement_employeur\", \"tranche_effectif_insee\", \"annee_tranche_effectif_insee\", \"dernier_effectif_physique\", \"date_dernier_effectif_physique\", \"source_dernier_effectif_physique\", \"unite_controle_competente\", \"codes_idcc\", \"annee_idcc\", \"nombre_idcc\", \"agefiph_derniere_annee_conformite_connue\", \"donnees_ecofi\", \"eti_pepite\", \"filiere_strategique\", \"structure_insertion_activite_economique\", \"structure_insertion_activite_economique_types\", \"activite_partielle_24_derniers_mois\", \"pse_en_projet_ou_en_cours\", \"direccte\", \"association\", \"document_association\", \"predecesseur\", \"successeur\", \"caractere_saisonnier\", \"caractere_auxiliaire\", \"accords\", \"pole_competitivite\", \"ea\", \"alternance\", \"prime_embauche_pme\", \"_dataSources\"], null);\n  }\n}\n\nmodule.exports = DireccteEtablissement;\n\n//# sourceURL=webpack:///./src/frentreprise/models/Etablissement.js?");

/***/ }),

/***/ "./src/helpers/WorkbookHelper.js":
/*!***************************************!*\
  !*** ./src/helpers/WorkbookHelper.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst WorksheetHelper = __webpack_require__(/*! ./WorksheetHelper */ \"./src/helpers/WorksheetHelper.js\");\n\nclass WorkbookHelper {\n  constructor(workbook) {\n    this.workbook = workbook;\n  }\n\n  getSheetsData(sheetsParams) {\n    let sheetsData = {};\n    this.workbook.SheetNames.map(sheetName => {\n      const workSheet = this.workbook.Sheets[sheetName];\n      const wsh = new WorksheetHelper(workSheet);\n\n      let columnToKeep = null;\n      if (sheetsParams && sheetsParams[sheetName]) {\n        columnToKeep = sheetsParams[sheetName].columnsToKeep;\n      }\n\n      sheetsData[sheetName] = wsh.getRowsData(columnToKeep);\n    });\n    return sheetsData;\n  }\n}\n\nmodule.exports = WorkbookHelper;\n\n//# sourceURL=webpack:///./src/helpers/WorkbookHelper.js?");

/***/ }),

/***/ "./src/helpers/WorksheetHelper.js":
/*!****************************************!*\
  !*** ./src/helpers/WorksheetHelper.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nclass WorksheetHelper {\n  constructor(workSheet, params) {\n    this.workSheet = workSheet;\n    this.params = params;\n  }\n\n  getReferences() {\n    let references = {};\n\n    const split = this.workSheet[\"!ref\"].split(\":\");\n    const start = split[0];\n    const end = split[1];\n\n    const columnRegex = /^[A-Z]+/g;\n    const rowRegex = /[0-9]+$/g;\n\n    const startColumn = start.match(columnRegex)[0];\n    const startRow = start.match(rowRegex)[0];\n\n    const endColumn = end.match(columnRegex)[0];\n    const endRow = end.match(rowRegex)[0];\n\n    references = {\n      start: {\n        column: startColumn,\n        row: startRow\n      },\n      end: {\n        column: endColumn,\n        row: endRow\n      }\n    };\n    return references;\n  }\n\n  generateAlphabet(indexNumber) {\n    const alphabetLength = indexNumber || 100;\n    const alphabetBase = \"ABCDEFGHIJKLMNOPQRSTUVWXYZ\";\n    let alphabet = [];\n    for (let i = 0; i < alphabetLength; i++) {\n      let letter = alphabetBase[i];\n      if (i > 25) {\n        const q = parseInt(i / 26, 10);\n        const r = i % 26;\n        letter = alphabetBase[q - 1] + alphabetBase[r];\n      }\n      alphabet.push(letter);\n    }\n    return alphabet;\n  }\n\n  getAlphabeticalColumnNames() {\n    const refs = this.getReferences(this.workSheet);\n    const alphabet = this.generateAlphabet();\n\n    const startIndex = alphabet.indexOf(refs.start.column);\n    const endIndex = alphabet.indexOf(refs.end.column);\n\n    const columnNames = alphabet.slice(startIndex, endIndex + 1);\n\n    return columnNames;\n  }\n\n  getColumnKeys() {\n    const refs = this.getReferences(this.workSheet);\n    const startRow = refs.start.row;\n    const alphaColumnNames = this.getAlphabeticalColumnNames(this.workSheet);\n\n    let columnKeys = [];\n\n    for (let i = 0; i < alphaColumnNames.length; i++) {\n      const columnRef = alphaColumnNames[i];\n      const cell = this.workSheet[columnRef + \"\" + startRow];\n      let columnKey = cell ? cell.v : null;\n      if (columnKey && this.params && this.params.keysToLowerCase) {\n        columnKey = columnKey.toLowerCase();\n      }\n      columnKeys.push(columnKey);\n    }\n    return columnKeys;\n  }\n\n  getRowData(rowNumber, columnsToKeep) {\n    const columnNames = this.getAlphabeticalColumnNames(this.workSheet);\n    const columnKeys = this.getColumnKeys(this.workSheet);\n    let item = {};\n\n    for (let i = 0; i < columnNames.length; i++) {\n      const cellRef = columnNames[i] + \"\" + rowNumber;\n      const cell = this.workSheet[cellRef];\n      if (cell) {\n        let attributeKey = null;\n        if (!columnsToKeep) {\n          attributeKey = columnKeys[i];\n        } else {\n          if (!columnsToKeep[columnNames[i]]) {\n            continue;\n          }\n          attributeKey = columnsToKeep[columnNames[i]];\n        }\n        item[attributeKey] = (cell.w || cell.v).trim();\n      }\n    }\n\n    return item;\n  }\n\n  getRowsData(columnsToKeep) {\n    const refs = this.getReferences(this.workSheet);\n\n    let getRowsData = [];\n    const startRowNumber = parseInt(refs.start.row);\n    const endRowNumber = parseInt(refs.end.row);\n    for (let rowNumber = startRowNumber + 1; rowNumber <= endRowNumber; rowNumber++) {\n      const item = this.getRowData(rowNumber, columnsToKeep);\n      getRowsData.push(item);\n    }\n\n    return getRowsData;\n  }\n}\n\nmodule.exports = WorksheetHelper;\n\n//# sourceURL=webpack:///./src/helpers/WorksheetHelper.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _config = __webpack_require__(/*! config */ \"config\");\n\nvar _config2 = _interopRequireDefault(_config);\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar _bodyParser2 = _interopRequireDefault(_bodyParser);\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _Mongo = __webpack_require__(/*! ./frentreprise/datasources/Mongo */ \"./src/frentreprise/datasources/Mongo.js\");\n\nvar _Mongo2 = _interopRequireDefault(_Mongo);\n\nvar _api = __webpack_require__(/*! ./api */ \"./src/api/index.js\");\n\nvar _api2 = _interopRequireDefault(_api);\n\nvar _frentreprise = __webpack_require__(/*! frentreprise */ \"frentreprise\");\n\nvar _frentreprise2 = _interopRequireDefault(_frentreprise);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst app = (0, _express2.default)();\nconst port = _config2.default.has(\"port\") && +_config2.default.get(\"port\") || 80;\nconst host = _config2.default.has(\"port\") && _config2.default.get(\"host\") || undefined;\n\nfunction init() {\n  _frentreprise2.default.EntrepriseModel = __webpack_require__(/*! ./frentreprise/models/Entreprise */ \"./src/frentreprise/models/Entreprise.js\");\n  _frentreprise2.default.EtablissementModel = __webpack_require__(/*! ./frentreprise/models/Etablissement */ \"./src/frentreprise/models/Etablissement.js\");\n\n  const apiGouv = _frentreprise2.default.getDataSource(\"ApiGouv\").source;\n  apiGouv.token = _config2.default.get(\"APIGouv.token\");\n  apiGouv.axiosConfig = {\n    proxy: _config2.default.has(\"proxy\") && _config2.default.get(\"proxy\") || false\n  };\n\n  //DB setup\n  if (_config2.default.has(\"mongo\")) {\n    _mongoose2.default.connect(_config2.default.get(\"mongo\"));\n\n    _frentreprise2.default.addDataSource({\n      name: \"Mongo\",\n      priority: 50, // higher prevail\n      source: new _Mongo2.default()\n    });\n  }\n\n  app.use(function (req, res, next) {\n    res.header(\"Access-Control-Allow-Origin\", \"*\");\n    res.header(\"Access-Control-Allow-Headers\", \"Origin, X-Requested-With, Content-Type, Accept\");\n    next();\n  });\n\n  app.use(_bodyParser2.default.json()); // support json encoded bodies\n  app.use(_bodyParser2.default.urlencoded({ extended: true })); // support encoded bodies\n}\n\nfunction run() {\n  const htdocs_path = _path2.default.resolve(__dirname, \"./htdocs\");\n  app.use(_express2.default.static(htdocs_path));\n  app.use(\"/api\", _api2.default);\n\n  app.get(\"*\", function (req, res) {\n    res.sendFile(\"index.html\", { root: htdocs_path });\n  });\n\n  app.listen({\n    host,\n    port\n  }, () => {\n    console.log(`Serving files from: ${htdocs_path}`);\n    console.log(`Listening on ${host || \"\"}:${port}`);\n  });\n\n  return app;\n}\n\ninit();\nmodule.exports = run();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/models/CodePostalModel.js":
/*!***************************************!*\
  !*** ./src/models/CodePostalModel.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst Schema = mongoose.Schema;\n\nconst codePostalSchema = new Schema({\n  code_postal: String,\n  code_commune: String,\n  libelle_commune: String\n});\n\ncodePostalSchema.statics.findOneByCode = function (code_postal, cb) {\n  return this.findOne({ code_postal }, cb);\n};\n\nconst CodePostal = mongoose.model(\"CodePostal\", codePostalSchema);\n\nmodule.exports = CodePostal;\n\n//# sourceURL=webpack:///./src/models/CodePostalModel.js?");

/***/ }),

/***/ "./src/models/CommuneModel.js":
/*!************************************!*\
  !*** ./src/models/CommuneModel.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst Schema = mongoose.Schema;\n\nconst communeSchema = new Schema({\n  code_commune: { type: String, index: true },\n  libelle_commune: String\n});\n\nconst Commune = mongoose.model(\"Commune\", communeSchema);\n\nmodule.exports = Commune;\n\n//# sourceURL=webpack:///./src/models/CommuneModel.js?");

/***/ }),

/***/ "./src/models/DepartementModel.js":
/*!****************************************!*\
  !*** ./src/models/DepartementModel.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst Schema = mongoose.Schema;\n\nconst departementSchema = new Schema({\n  code_departement: { type: String, index: true },\n  libelle_departement: String\n});\n\ndepartementSchema.statics.findOneByCode = function (code_departement, cb) {\n  return this.findOne({ code_departement }, cb);\n};\n\nconst Departement = mongoose.model(\"Departement\", departementSchema);\n\nmodule.exports = Departement;\n\n//# sourceURL=webpack:///./src/models/DepartementModel.js?");

/***/ }),

/***/ "./src/models/EtablissementModel.js":
/*!******************************************!*\
  !*** ./src/models/EtablissementModel.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _config = __webpack_require__(/*! config */ \"config\");\n\nvar _config2 = _interopRequireDefault(_config);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst Schema = mongoose.Schema;\nconst ObjectManipulations = __webpack_require__(/*! ../utils/ObjectManipulations */ \"./src/utils/ObjectManipulations.js\");\n\nconst etablissementSchema = new Schema({\n  siret: { type: String, index: true },\n  nic_ministere: String,\n  siren: String,\n  code_cj3: String,\n  libelle_cj3: String,\n  raison_sociale: String,\n  nom: String,\n  prenom: String,\n  enseigne: String,\n  nom_commercial: String,\n  sigle: String,\n  code_etat: String,\n  libelle_etat: String,\n  date_de_l_etat: String,\n\n  code_naf2_10: String,\n  code_naf2_38: String,\n\n  code_activite: String, // code NAF\n  libelle_activite: String,\n  date_debut_activite: String,\n\n  code_qualite_siege: String,\n  libelle_qualite_siege: String,\n  nic_du_siege: String,\n  tranche_eff__insee: String,\n  libelle_tranche_eff__insee: String,\n  annee_tranche_eff_: String,\n  dernier_eff__physique: String,\n  date_der_eff_physique: String,\n  source_dernier_eff_phy: String,\n  libelle_source_dernier_eff_phy: String,\n\n  code_employeur: String,\n  date_employeur: String,\n  date_de_creation: String,\n  code_modalite_activ_: String,\n  libelle_modalite_activ_: String,\n  code_marchand: String,\n  code_region: String,\n  label_region: String,\n  code_departement: String,\n\n  code_car__saisonnier: String,\n  code_car__auxiliaire: String,\n\n  code_section: String,\n\n  numero_voie: String,\n  code_indice_repetition: String,\n  code_type_de_voie: String,\n  libelle_voie: String,\n  complement_adresse: String,\n  code_postal: String,\n  code_commune: String,\n  libelle_commune: String,\n  annee_idcc: String,\n  codes_idcc: String,\n  label_idcc: String,\n\n  sese: Object\n});\n\netablissementSchema.statics.findBySIRET = function (siret, cb) {\n  return this.findOne({ siret: siret }, cb);\n};\n\netablissementSchema.statics.findSIRETsBySIREN = function (siren, cb) {\n  return this.find({ siren }).distinct(\"siret\", cb);\n};\n\netablissementSchema.statics.findByRaisonSociale = function (raisonSociale, cb) {\n  const regex = new RegExp(raisonSociale, \"i\");\n\n  return this.aggregate([{\n    $match: { $or: [{ raison_sociale: regex }, { nom: regex }] }\n  }, {\n    $lookup: {\n      from: \"interactions\",\n      localField: \"siret\",\n      foreignField: \"siret\",\n      as: \"interactions\"\n    }\n  }, {\n    $sort: { raison_sociale: 1, code_etat: 1 }\n  }], cb);\n};\n\n/**\n * @param {object} searchParams = {\n raison_sociale,\n code_activite,\n libelle_commune,\n code_postal,\n code_departement\n}\n */\netablissementSchema.statics.findByAdvancedSearch = function (searchParams, cb) {\n  return _config2.default.has(\"oldMongoVersion\") && _config2.default.get(\"oldMongoVersion\") ? this._findByAdvancedSearchPolyfill(searchParams, cb) : this._findByAdvancedSearch(searchParams, cb);\n};\n\netablissementSchema.statics._findByAdvancedSearch = function (searchParams, cb) {\n  const raisonSocialParam = searchParams && searchParams.raison_sociale ? new RegExp(searchParams.raison_sociale, \"i\") : null;\n  const onlySiegeSocial = searchParams.siege_social;\n  const interactions = searchParams.interactions;\n\n  const params = _extends({}, searchParams);\n\n  delete params.raison_sociale;\n  delete params.siege_social;\n  delete params.interactions;\n\n  if (raisonSocialParam) {\n    params[\"$or\"] = [{ raison_sociale: raisonSocialParam }, { nom: raisonSocialParam }];\n  }\n  ObjectManipulations.clean(params);\n\n  let aggregateConfig = [{\n    $match: params\n  }, {\n    $addFields: {\n      siretSiege: { $concat: [\"$siren\", \"$nic_du_siege\"] }\n    }\n  }, {\n    $lookup: {\n      from: \"interactions\",\n      localField: \"siret\",\n      foreignField: \"siret\",\n      as: \"interactions\"\n    }\n  }, {\n    $sort: { raison_sociale: 1, code_etat: 1 }\n  }];\n\n  if (onlySiegeSocial) {\n    aggregateConfig.push({\n      $redact: {\n        $cond: [{ $eq: [\"$siret\", \"$siretSiege\"] }, \"$$KEEP\", \"$$PRUNE\"]\n      }\n    });\n  }\n\n  if (interactions && interactions.length) {\n    aggregateConfig.push({\n      $addFields: {\n        nbInteractionsFiltered: {\n          $size: {\n            $filter: {\n              input: \"$interactions\",\n              as: \"i\",\n              cond: {\n                $in: [\"$$i.pole\", interactions]\n              }\n            }\n          }\n        }\n      }\n    });\n    aggregateConfig.push({\n      $redact: {\n        $cond: [{ $gt: [\"$nbInteractionsFiltered\", 0] }, \"$$KEEP\", \"$$PRUNE\"]\n      }\n    });\n  }\n\n  return this.aggregate(aggregateConfig, cb);\n};\n\netablissementSchema.statics._findByAdvancedSearchPolyfill = function (searchParams, cb) {\n  console.log(\"use polyfill aggregate\");\n  const raisonSocialParam = searchParams && searchParams.raison_sociale ? new RegExp(searchParams.raison_sociale, \"i\") : null;\n  const onlySiegeSocial = searchParams.siege_social;\n  const interactions = searchParams.interactions;\n\n  const params = _extends({}, searchParams);\n\n  delete params.raison_sociale;\n  delete params.siege_social;\n  delete params.interactions;\n\n  if (raisonSocialParam) {\n    params[\"$or\"] = [{ raison_sociale: raisonSocialParam }, { nom: raisonSocialParam }];\n  }\n  ObjectManipulations.clean(params);\n\n  let aggregateConfig = [{\n    $match: params\n  }, {\n    $project: {\n      root: \"$$ROOT\",\n      siretSiege: { $concat: [\"$siren\", \"$nic_du_siege\"] }\n    }\n  }, {\n    $lookup: {\n      from: \"interactions\",\n      localField: \"root.siret\",\n      foreignField: \"siret\",\n      as: \"interactions\"\n    }\n  }, {\n    $sort: { \"root.raison_sociale\": 1, \"root.code_etat\": 1 }\n  }];\n\n  if (onlySiegeSocial) {\n    aggregateConfig.push({\n      $redact: {\n        $cond: [{ $eq: [\"$root.siret\", \"$siretSiege\"] }, \"$$KEEP\", \"$$PRUNE\"]\n      }\n    });\n  }\n\n  return this.aggregate(aggregateConfig, cb).then(result => {\n    if (Array.isArray(result)) {\n      result = result.map(line => {\n        return _extends({}, line, line.root);\n      });\n\n      if (interactions && interactions.length) {\n        result = result.filter(line => {\n          return line.interactions.filter(interaction => {\n            return interactions.includes(interaction.pole);\n          }).length;\n        });\n      }\n    }\n    return result;\n  });\n};\n\nconst Etablissement = mongoose.model(\"Etablissement\", etablissementSchema);\n\nEtablissement.findDisctinct = function (entity) {\n  return Etablissement.distinct(entity).then(data => {\n    return data.sort();\n  });\n};\n\nEtablissement.findDisctinctCommunes = function () {\n  return Etablissement.findDisctinct(\"libelle_commune\");\n};\n\nEtablissement.findDisctinctCodesPostaux = function () {\n  return Etablissement.findDisctinct(\"code_postal\");\n};\n\nEtablissement.findDisctinctDepartements = function () {\n  return Etablissement.findDisctinct(\"code_departement\");\n};\n\nmodule.exports = Etablissement;\n\n//# sourceURL=webpack:///./src/models/EtablissementModel.js?");

/***/ }),

/***/ "./src/models/InteractionModel.js":
/*!****************************************!*\
  !*** ./src/models/InteractionModel.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst Schema = mongoose.Schema;\n\nconst interactionSchema = new Schema({\n  siret: { type: String, index: true },\n  date: Date,\n  unite: String,\n  type_intervention: String,\n  cible_intervention: String,\n  pole: String\n});\n\ninteractionSchema.statics.findBySIRET = function (siret, cb) {\n  return this.find({ siret: siret }).sort(\"-date\").exec(cb);\n};\n\nconst Interaction = mongoose.model(\"Interaction\", interactionSchema);\n\nmodule.exports = Interaction;\n\n//# sourceURL=webpack:///./src/models/InteractionModel.js?");

/***/ }),

/***/ "./src/models/NomenclatureModel.js":
/*!*****************************************!*\
  !*** ./src/models/NomenclatureModel.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst Schema = mongoose.Schema;\n\nconst nomenclatureSchema = new Schema({\n  categorie: { type: String, index: true },\n  code: String,\n  libelle: String,\n  libelle_court: String,\n  libelle_CJ3: String,\n  libelle_CJ1: String\n});\n\nnomenclatureSchema.statics.findByCategory = function (categorie, cb) {\n  return this.find({ categorie }, cb);\n};\n\nnomenclatureSchema.statics.findOneByCategoryAndCode = function (categorie, code, cb) {\n  return this.findOne({ categorie, code }, cb);\n};\n\nconst Nomenclature = mongoose.model(\"Nomenclature\", nomenclatureSchema);\n\nmodule.exports = Nomenclature;\n\n//# sourceURL=webpack:///./src/models/NomenclatureModel.js?");

/***/ }),

/***/ "./src/utils/ObjectManipulations.js":
/*!******************************************!*\
  !*** ./src/utils/ObjectManipulations.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.copyKeys = copyKeys;\nexports.deleteKeyIfNotDefinedOrEmpty = deleteKeyIfNotDefinedOrEmpty;\nexports.clean = clean;\nfunction copyKeys(source, keys, defaultValue) {\n  const dest = {};\n\n  keys.forEach(key => {\n    const value = typeof source[key] === \"undefined\" ? defaultValue : source[key];\n    if (typeof value !== \"undefined\") {\n      dest[key] = value;\n    }\n  });\n\n  return dest;\n}\n\nfunction deleteKeyIfNotDefinedOrEmpty(object, key) {\n  let attribute = object[key];\n  if (attribute === null || attribute === undefined || typeof attribute === \"string\" && attribute.length === 0 || Array.isArray(attribute) && attribute.length === 0) {\n    delete object[key];\n  }\n}\n\nfunction clean(obj) {\n  for (var propName in obj) {\n    deleteKeyIfNotDefinedOrEmpty(obj, propName);\n  }\n}\n\n//# sourceURL=webpack:///./src/utils/ObjectManipulations.js?");

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _ObjectManipulations = __webpack_require__(/*! ./ObjectManipulations */ \"./src/utils/ObjectManipulations.js\");\n\nObject.keys(_ObjectManipulations).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function () {\n      return _ObjectManipulations[key];\n    }\n  });\n});\n\n//# sourceURL=webpack:///./src/utils/index.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "config":
/*!*************************!*\
  !*** external "config" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"config\");\n\n//# sourceURL=webpack:///external_%22config%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fast-csv":
/*!***************************!*\
  !*** external "fast-csv" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fast-csv\");\n\n//# sourceURL=webpack:///external_%22fast-csv%22?");

/***/ }),

/***/ "frentreprise":
/*!*******************************!*\
  !*** external "frentreprise" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"frentreprise\");\n\n//# sourceURL=webpack:///external_%22frentreprise%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"multer\");\n\n//# sourceURL=webpack:///external_%22multer%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "promise-queue":
/*!********************************!*\
  !*** external "promise-queue" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"promise-queue\");\n\n//# sourceURL=webpack:///external_%22promise-queue%22?");

/***/ }),

/***/ "xlsx":
/*!***********************!*\
  !*** external "xlsx" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"xlsx\");\n\n//# sourceURL=webpack:///external_%22xlsx%22?");

/***/ })

/******/ });