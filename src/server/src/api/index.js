import express from "express";

import searchRouter from "./search";
import loginRouter from "./login";
import usersFeedbackRouter from "./usersFeedback";
import sourcesRouter from "./sources";
import etpStaff from "./etpStaff";
import mailingList from "./mailingList";
import dsnEffectif from "./dsnEffectif";
import matomo from "./matomo";

const router = express.Router();

router.use("", searchRouter);
router.use("", loginRouter);
router.use("", usersFeedbackRouter);
router.use("", sourcesRouter);
router.use("", etpStaff);
router.use("", mailingList);
router.use("", dsnEffectif);
router.use("", matomo);

export default router;
