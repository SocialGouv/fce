const path = require("path");
const express = require("express");
const router = express.Router();

const searchRouter = require("./search");
const uploadRouter = require("./upload");
const entitiesRouter = require("./entities");
const interactionsRouter = require("./interactions");
const login = require("./login");

router.use("", searchRouter);
router.use("", uploadRouter);
router.use("", entitiesRouter);
router.use("/interactions", interactionsRouter);
router.use("", login);

module.exports = router;
