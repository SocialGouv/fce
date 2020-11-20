import MailingList from "../models/MailingList";
import withAuth from "../middlewares/auth";
import jwt from "jsonwebtoken";

const express = require("express");
const router = express.Router();

router.delete("/mailing-list/email", async (req, res) => {
  const { hash } = req.body;

  try {
    const mailingList = new MailingList();
    const unsubscribeResponse = await mailingList.removeEmailByHash(hash);

    if (!unsubscribeResponse) {
      throw new Error("query failure");
    }

    if (!unsubscribeResponse.rowCount) {
      return res.status(204).send();
    }

    mailingList.sendUnsubscriptionEmail(unsubscribeResponse);

    return res.send({
      success: true,
      message: "Vous ne recevrez plus d'information à propos de FCE.",
    });
  } catch (e) {
    console.error("/mailing-list/email - Error :", e);

    return res.status(500).json({
      success: false,
      error:
        "Nous sommes désolés, une erreur est survenue. Veuillez réessayer ultérieurement.",
    });
  }
});

router.delete("/mailing-list/user", withAuth, async (req, res) => {
  const { email } = jwt.decode(
    req.headers.authorization.replace("Bearer ", "")
  );

  try {
    const mailingList = new MailingList();
    const unsubscribeResponse = await mailingList.removeEmail(email);

    if (!unsubscribeResponse) {
      throw new Error("query failure");
    }

    if (!unsubscribeResponse.rowCount) {
      return res.status(204).send();
    }

    mailingList.sendUnsubscriptionEmail(unsubscribeResponse);

    return res.send({
      success: true,
      message: "Vous ne recevrez plus d'information à propos de FCE.",
    });
  } catch (e) {
    console.error("/unsubscribe - Error :", e);

    return res.status(500).json({
      success: false,
      error:
        "Nous sommes désolés, une erreur est survenue. Veuillez réessayer ultérieurement.",
    });
  }
});

export default router;
