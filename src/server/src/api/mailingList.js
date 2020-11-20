import MailingList from "../models/MailingList";
import withAuth from "../middlewares/auth";
import jwt from "jsonwebtoken";

const express = require("express");
const router = express.Router();

router.get("/mailing-list/user", withAuth, async (req, res) => {
  const { email } = jwt.decode(
    req.headers.authorization.replace("Bearer ", "")
  );

  try {
    const mailingList = new MailingList();
    const isSubscribedResponse = await mailingList.isSubscribed(email);

    if (isSubscribedResponse.error) throw new Error(e);

    return res.send({
      error: null,
      isSubscribed: isSubscribedResponse.isSubscribed,
    });
  } catch (e) {
    console.error("GET /mailing-list/user - Error :", e);

    return res.status(500).json({
      error: e,
      isSubscribed: null,
    });
  }
});

router.post("/mailing-list/user", withAuth, async (req, res) => {
  const { email } = jwt.decode(
    req.headers.authorization.replace("Bearer ", "")
  );

  try {
    const mailingList = new MailingList();

    const addEmailResponse = await mailingList.addEmail(email);

    if (!addEmailResponse) {
      throw new Error(
        `An error has occured, email address ${email} was not added to the mailing list.`
      );
    }

    return res.send({
      success: true,
      message: "Votre email a été ajouté à notre liste de contacts.",
    });
  } catch (e) {
    console.error("POST /mailing-list/user - Error :", e);

    return res.status(500).json({
      success: false,
      error: "L'ajout de votre email à notre liste de contacts a échoué.",
    });
  }
});

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
    console.error("DELETE /mailing-list/email - Error :", e);

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
    console.error("DELETE /mailing-list/user - Error :", e);

    return res.status(500).json({
      success: false,
      error:
        "Nous sommes désolés, une erreur est survenue. Veuillez réessayer ultérieurement.",
    });
  }
});

export default router;
