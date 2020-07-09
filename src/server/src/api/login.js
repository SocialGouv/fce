import express from "express";
import saltedSha1 from "salted-sha1";
import config from "config";
import Mail from "../utils/mail";
import authRequestCodeTpl from "../templates/email/authRequestCode";
import Auth from "../utils/auth";
import MatomoUserId from "../models/MatomoUserId";

const router = express.Router();

router.post("/requestAuthCode", async (req, res) => {
  const { email } = req.body;

  try {
    const isEmailAllowed = Auth.isEmailAllowed(email);

    if (!isEmailAllowed) {
      throw new Error("Connexion refusée");
    }

    const code = Auth.generateCode(email);

    if (!code) {
      throw new Error("La génération du code a échouée");
    }

    const mail = new Mail();

    try {
      const mailReponse = await mail.send(
        email,
        "Code de connexion à FCE",
        authRequestCodeTpl({
          code,
        }),
        { bcc: config.authCode.bcc }
      );
      console.log({ mailReponse });
    } catch (e) {
      console.error("Send email with code failed", e);
      throw new Error("L'envoi de l'email a échoué");
    }

    console.log(`Send authentification code to ${email}`);

    return res.send({
      success: true,
    });
  } catch (e) {
    console.error(`Cannot send code to ${email}`, e.message);
    return res.status(500).json({
      success: false,
      error: e.message,
    });
  }
});

router.post("/login", async function (req, res) {
  const userId = new MatomoUserId();
  const { code, email } = req.body;
  const saltedEmail = email && saltedSha1(email, process.env.EMAIL_SALT);

  try {
    const { isValidCode, failureMessage } = await Auth.validateCode(
      email,
      code
    );

    if (!isValidCode) {
      console.error("Login denied", failureMessage);
      throw new Error(failureMessage);
    }

    const user = { email };
    const token = Auth.generateToken(user);

    try {
      await userId.create({ saltedEmail });
    } catch (e) {
      console.error(
        "An error has occured, userId wasn't saved in database",
        e
      );
      throw new Error("User userId wasn't saved in database");
    }

    console.log(`${user.email} logged with code`);

    return res.send({
      success: true,
      token,
      saltedEmail
    });
  } catch (e) {
    console.error(`Authentification code is invalid`, e.message);
    return res.status(401).json({
      success: false,
      error: e.message,
    });
  }
});

export default router;
