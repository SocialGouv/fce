const path = require("path");
const express = require("express");
const router = express.Router();

const searchRouter = require("./search");
const loginRouter = require("./login");

router.use("", searchRouter);
router.use("", loginRouter);

module.exports = router;
