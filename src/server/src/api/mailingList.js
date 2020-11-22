import MailingList from "../models/MailingList";
import withAuth from "../middlewares/auth";
import jwt from "jsonwebtoken";
import HttpError from "../utils/HttpError";

const express = require("express");
const router = express.Router();

router.get("/mailing-list/user", withAuth, async (req, res) => {
  const { email } = jwt.decode(
    req.headers.authorization.replace("Bearer ", "")
  );

  try {
    const mailingList = new MailingList();
    const isSubscribedResponse = await mailingList.isSubscribed(email);

    if (isSubscribedResponse instanceof HttpError) {
      throw isSubscribedResponse;
    }

    return res.send({
      error: null,
      result: {
        isSubscribed: isSubscribedResponse.isSubscribed,
      },
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

    if (addEmailResponse instanceof HttpError) {
      throw addEmailResponse;
    }

    mailingList.sendSubscriptionEmail(addEmailResponse);

    return res.status(201).send({
      success: true,
      result: {
        isSubscribed: true,
      },
    });
  } catch (e) {
    console.error("POST /mailing-list/user - Error :", e);

    if (e.status === 409) {
      return res.status(409).json({
        success: false,
        error: "Email already exists",
      });
    }

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
      error: "Une erreur est survenue. Veuillez réessayer ultérieurement.",
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
      result: { isSubscribed: false },
    });
  } catch (e) {
    console.error("DELETE /mailing-list/user - Error :", e);

    return res.status(500).json({
      success: false,
      error: "Une erreur est survenue. Veuillez réessayer ultérieurement.",
    });
  }
});

export default router;
