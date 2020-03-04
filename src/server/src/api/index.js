const express = require("express");
const router = express.Router();

const searchRouter = require("./search");
const loginRouter = require("./login");
const usersFeedbackRouter = require("./usersFeedback");
const sourcesRouter = require("./sources");

router.use("", searchRouter);
router.use("", loginRouter);
router.use("", usersFeedbackRouter);
router.use("", sourcesRouter);

module.exports = router;
