var path = require("path");
var express = require("express");
var router = express.Router();

var searchRouter = require("./search");
var uploadRouter = require("./upload");

router.use("", searchRouter);
router.use("", uploadRouter);

module.exports = router;
