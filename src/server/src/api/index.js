import express from "express";

import searchRouter from "./search";
import loginRouter from "./login";
import usersFeedbackRouter from "./usersFeedback";
import sourcesRouter from "./sources";
import etpStaff from "./etpStaff";
import mailingList from "./mailingList";
import dsnEffectif from "./dsnEffectif";
import matomo from "./matomo";
import agreements from "./agreements";
import psi from "./psi";
import apprentissage from "./apprentissage";
import egapro from "./egapro";

const router = express.Router();

router.use("", searchRouter);
router.use("", loginRouter);
router.use("", usersFeedbackRouter);
router.use("", sourcesRouter);
router.use("", etpStaff);
router.use("", mailingList);
router.use("", dsnEffectif);
router.use("", matomo);
router.use("", agreements);
router.use("", psi);
router.use("", apprentissage);
router.use("", egapro);

export default router;
