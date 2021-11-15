import express from "express";

import searchRouter from "./search";
import elasticRouter from "./elastic";
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
import succession from "./succession";

const router = express.Router();

router.use("", searchRouter);
router.use("", elasticRouter);
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
router.use("", succession);

export default router;
