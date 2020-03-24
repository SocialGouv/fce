import express from "express";

import searchRouter from "./search";
import loginRouter from "./login";
import usersFeedbackRouter from "./usersFeedback";
import sourcesRouter from "./sources";

const router = express.Router();

router.use("", searchRouter);
router.use("", loginRouter);
router.use("", usersFeedbackRouter);
router.use("", sourcesRouter);

export default router;
