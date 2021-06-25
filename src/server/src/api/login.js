import express from "express";
import saltedSha1 from "salted-sha1";
import config from "config";
import Mail from "../utils/mail";
import authRequestCodeTpl from "../templates/email/authRequestCode";
import Auth from "../utils/auth";
import MatomoUserId from "../models/MatomoUserId";
import MailingList from "../models/MailingList";
import ApiKeys from "../models/ApiKeys";

const router = express.Router();

router.post("/requestAuthCode", async (req, res) => {
  const { email } = req.body;

  try {
    const isEmailAllowed = Auth.isEmailAllowed(email);

    if (!isEmailAllowed) {
      throw new Error("Connexion refusée");
    }

    const code = await Auth.generateCode(email);

    if (!code) {
      throw new Error("La génération du code a échouée");
    }

    console.log(code);
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

    const mailingList = new MailingList();
    const isSubscribedResponse = await mailingList.isSubscribed(email);

    return res.send({
      success: true,
      isSubscribedToMailingList: isSubscribedResponse.isSubscribed,
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
  const mailingList = new MailingList();

  const { code, email, isCheckedSubscription } = req.body;
  const saltedEmail = email && saltedSha1(email, config.get("emailSalt"));

  if (isCheckedSubscription) {
    try {
      const addEmailResponse = await mailingList.addEmail(email);
      if (!addEmailResponse) {
        throw new Error(
          `An error has occured, email address ${email} was not added to the mailing list.`
        );
      }

      console.log(`Email address ${email} was added to the mailing list.`);

      mailingList.sendSubscriptionEmail(addEmailResponse);
    } catch (e) {
      console.error("/login - Email subscription error : ", e);
    }
  }

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
      throw new Error("User userId wasn't saved in database");
    }

    console.log(`${user.email} logged with code`);

    return res.send({
      success: true,
      token,
      saltedEmail,
    });
  } catch (e) {
    console.error(`Authentification code is invalid`, e.message);
    return res.status(401).json({
      success: false,
      error: e.message,
    });
  }
});

router.post("/tempLogin", async function (req, res) {
  const userId = new MatomoUserId();
  const saltedEmail = saltedSha1(
    "temporary" + new Date().getTime(),
    config.get("emailSalt")
  );

  try {
    const { credential } = req.body;
    const { isValidCredential, failureMessage } = await Auth.useCredential(
      credential
    );

    try {
      await userId.create({ saltedEmail });
    } catch (e) {
      throw new Error("User userId wasn't saved in database");
    }

    if (!isValidCredential) {
      console.error("Login denied", failureMessage);
      throw new Error(failureMessage);
    }

    const token = await Auth.generateTemporaryToken();
    return res.send({
      success: true,
      token,
      saltedEmail,
    });
  } catch (e) {
    return res.status(401).json({
      success: false,
      error: e.message,
    });
  }
});

router.get("/askCredential", async function (req, res) {
  const apiKeys = new ApiKeys();
  const api_key = req.query.api_key;

  const saltedKey =
    api_key && saltedSha1(api_key, config.get("credential.token"));

  try {
    const apiKeyExist = await apiKeys.getByKey(saltedKey);
    console.log(apiKeyExist);
    if (!apiKeyExist) {
      throw new Error("API_KEY is not valid");
    }
    const credential = await Auth.askCredential();

    return res.send({
      success: true,
      credential: credential,
    });
  } catch (e) {
    console.error(`Auth :`, e.message);
    return res.status(401).json({
      success: false,
      error: e.message,
    });
  }
});

export default router;
