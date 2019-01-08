const path = require("path");
const express = require("express");
const router = express.Router();

const searchRouter = require("./search");

router.use("", searchRouter);

module.exports = router;
