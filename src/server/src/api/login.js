import express from "express";
import config from "config";
import MagicKey from "magic-key";
import Mail from "../utils/mail";
import sendMagicLinkTpl from "../templates/email/sendMagicLink";

const router = express.Router();
const magicKey = new MagicKey(config.get("magicKey"));

router.post("/sendMagicLink", async (req, res) => {
  const { email, clientVerificationKey } = req.body;
  try {
    const key = magicKey.generateKey(email, clientVerificationKey);

    if (!key) {
      throw new Error("Connexion refusée");
    }

    const mail = new Mail();

    try {
      await mail.send(
        email,
        "Lien de connexion à FCE",
        sendMagicLinkTpl({
          link: `${config.client.baseUrl}${config.client.magicLink.replace(
            "{key}",
            key
          )}`
        }),
        { bcc: config.magicLink.bcc }
      );
    } catch (e) {
      console.error("Send magic link email failed", e);
      throw new Error("L'envoi de l'email a échoué");
    }

    console.log(`Send magic link to ${email}`);

    return res.send({
      success: true
    });
  } catch (e) {
    console.error(`Connot send magic link to ${email}`, e, e.message);
    return res.send({
      success: false,
      message: e.message
    });
  }
});

router.post("/login", function(req, res) {
  const { key, clientVerificationKey } = req.body;

  try {
    const decryptedKey = magicKey.decryptKey(key, clientVerificationKey);
    const isValidKey = magicKey.validateKey(key, clientVerificationKey);

    if (!isValidKey) {
      console.error("MagicKey Error", magicKey.getLastValidationErrorMessage());

      throw new Error("Le lien de connexion a expiré ou est invalide");
    }

    return res.send({
      success: true
    });
  } catch (e) {
    console.error(`Magic link is invalid`, e, e.message);
    return res.send({
      success: false,
      message: e.message
    });
  }
});

module.exports = router;
