import MailingList from "../models/MailingList";

const express = require("express");
const router = express.Router();

router.post("/unsubscribe", async (req, res) => {
  const { hash } = req.body;
  console.log({ hash });
  try {
    const mailingList = new MailingList();
    const unsubscribeResponse = await mailingList.removeEmail(hash);
    console.log(unsubscribeResponse);

    if (!unsubscribeResponse) {
      throw new Error("query failure");
    }

    if (!unsubscribeResponse.rowCount) {
      return res.status(204).send();
    }

    return res.send({
      success: true,
      message: "Cet email n'est plus abonné à notre lettre d'information.",
    });
  } catch (e) {
    console.error("/unsubscribe - Error :", e);

    return res
      .status(500)
      .send(
        "Nous sommes désolés, une erreur est survenue. Veuillez réessayer ultérieurement."
      );
  }
});

export default router;
