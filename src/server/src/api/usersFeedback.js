import stripHtml from "string-strip-html";
import config from "config";
import withAuth from "../middlewares/auth";
import UsersFeedback from "../models/UsersFeedback";
import Mail from "../utils/mail";
import sendUserFeedbacklTpl from "../templates/email/sendUserFeedback";

const express = require("express");
const router = express.Router();

router.post("/feedback", withAuth, async (req, res) => {
  const mail = new Mail();
  const feedback = new UsersFeedback();

  const { useful, comment, rate } = req.body.params;
  const { referer } = req.headers;

  try {
    if (typeof useful !== "boolean") {
      console.error("'useful' parameter must be a boolean");
      return res.status(400).send({
        success: false,
        error: "'useful' parameter must be a boolean",
      });
    }

    if (typeof comment !== "string") {
      console.error("'comment' parameter must be a string");
      return res.status(400).send({
        success: false,
        error: "'comment' parameter must be a string",
      });
    }

    if (typeof rate !== "string") {
      console.error("'rate' parameter must be a string");
      return res.status(400).send({
        success: false,
        error: "'rate' parameter must be a string",
      });
    }

    const cleanedComment = stripHtml(comment);

    try {
      await feedback.create({ useful, comment: cleanedComment, rate, referer });
    } catch (e) {
      console.error(
        "An error has occured, user feedback wasn't saved in database",
        e
      );
      throw new Error("User feedback wasn't saved in database");
    }

    try {
      await mail.send(
        config.userFeedback.mailTo,
        "Retour utilisateur",
        sendUserFeedbacklTpl({ useful, comment: cleanedComment, rate, referer })
      );
    } catch (e) {
      console.error("Email was not sent", e);
      throw new Error("L'envoi de l'email a échoué");
    }

    return res.send({
      success: true,
    });
  } catch (e) {
    console.error(`A problem occured with user feedback`, e, e.message);

    return res.status(500).json({
      success: false,
      error: e.message,
    });
  }
});

export default router;
