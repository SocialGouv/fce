import express from "express";
import config from "config";
import Mail from "../utils/mail";
import authRequestCodeTpl from "../templates/email/authRequestCode";
import Auth from "../utils/auth";

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
  const { code, email } = req.body;

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

    console.log(`${user.email} logged with code`);

    return res.send({
      success: true,
      token,
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
