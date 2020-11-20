import Model from "./Model";
import { hash as bcryptHash } from "bcrypt";
import Mail from "../utils/mail";
import mailingListUnsubscribe from "../templates/email/mailingListUnsubscribe";

export default class MailingList extends Model {
  async isSubscribed(email) {
    try {
      const selectEmailResponse = await this.db.query(
        "SELECT * FROM mailing_list WHERE email = $1",
        [email]
      );

      if (!selectEmailResponse) {
        throw new Error("A database query error has occurred.");
      }

      return !!selectEmailResponse.rowCount;
    } catch (e) {
      console.error("MailingList::isSubscribed", e);
    }
  }

  async addEmail(email) {
    try {
      const insertEmailResponse = await this.db.query(
        "INSERT INTO mailing_list (email) VALUES ($1) ON CONFLICT DO NOTHING RETURNING id",
        [email]
      );

      const emailId = insertEmailResponse.rows?.[0]?.id;

      if (!emailId) {
        throw new Error(
          "Email was not inserted into mailing_list table. It could already exist."
        );
      }

      const hash = await bcryptHash(`${email}${emailId}`, 10);

      return await this.db.query(
        "UPDATE mailing_list SET hash = $1 WHERE id = $2 RETURNING hash",
        [hash, emailId]
      );
    } catch (e) {
      console.error("MailingList::addEmail", e);
      return false;
    }
  }

  async removeEmail(email) {
    try {
      return await this.db.query(
        "DELETE FROM mailing_list WHERE email = $1 RETURNING email",
        [email]
      );
    } catch (e) {
      console.error("MailingList::removeEmail", e);
      return false;
    }
  }

  async removeEmailByHash(hash) {
    try {
      return await this.db.query(
        "DELETE FROM mailing_list WHERE hash = $1 RETURNING email",
        [hash]
      );
    } catch (e) {
      console.error("MailingList::removeEmailByHash", e);
      return false;
    }
  }

  async sendUnsubscriptionEmail(unsubscribeResponse) {
    const mail = new Mail();
    const email = unsubscribeResponse.rows?.[0]?.email;

    if (!email) {
      throw new Error("Email is missing");
    }

    try {
      const mailResponse = await mail.send(
        email,
        "FCE - Désinscription de la liste de contacts",
        mailingListUnsubscribe()
      );

      console.log({ mailResponse });
      console.log(`Unsubscription email sent to ${email}`);
    } catch (e) {
      console.error("Mailing list unsubscription email was not sent.", e);
    }
  }
}
