// import MagicLink from "../lib/MagicLink";
import express from "express";
import config from "config";
import MagicKey from "magic-key";

const router = express.Router();
const magicKey = new MagicKey(config.get("magicKey"));

router.post("/sendMagicLink", function(req, res) {
  const { email, clientVerificationKey } = req.body;
  const key = magicKey.generateKey(email, clientVerificationKey);

  // todo: send email

  res.send({
    success: !!key
  });
});

router.post("/checkMagicLink", function(req, res) {
  const { key, clientVerificationKey } = req.body;
  const isValidKey = magicKey.validateKey(key, clientVerificationKey);
  const decryptedKey = magicKey.decryptKey(key, clientVerificationKey);
  // todo : generate jwt token
  res.send({
    success: !!isValidKey
  });
});

module.exports = router;
