import express from "express";

import searchRouter from "./search";
import loginRouter from "./login";
import usersFeedbackRouter from "./usersFeedback";
import sourcesRouter from "./sources";
import etpStaff from "./etpStaff";
import dsnEffectif from "./dsnEffectif";

const router = express.Router();

router.use("", searchRouter);
router.use("", loginRouter);
router.use("", usersFeedbackRouter);
router.use("", sourcesRouter);
router.use("", etpStaff);
router.use("", dsnEffectif);

export default router;
