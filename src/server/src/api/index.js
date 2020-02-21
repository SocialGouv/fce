const express = require("express");
const router = express.Router();

const searchRouter = require("./search");
const loginRouter = require("./login");
const usersFeedbackRouter = require("./usersFeedback");

router.use("", searchRouter);
router.use("", loginRouter);
router.use("", usersFeedbackRouter);

module.exports = router;
