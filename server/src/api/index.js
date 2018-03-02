var path = require("path");
var express = require("express");
var router = express.Router();

var searchRouter = require("./search");
var uploadRouter = require("./upload");
var login = require("./login");

router.use("", searchRouter);
router.use("", uploadRouter);
router.use("", login);

module.exports = router;
