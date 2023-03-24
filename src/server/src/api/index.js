import express from "express";

import elasticRouter from "./elastic";
import loginRouter from "./login";
import usersFeedbackRouter from "./usersFeedback";
import mailingList from "./mailingList";
import matomo from "./matomo";
import exportRouter from "./export";

const router = express.Router();

router.use("", elasticRouter);
router.use("", exportRouter);
router.use("", loginRouter);
router.use("", usersFeedbackRouter);
router.use("", mailingList);
router.use("", matomo);

export default router;
