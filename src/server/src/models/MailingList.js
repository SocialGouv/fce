import Model from "./Model";
import { hash as bcryptHash } from "bcrypt";
import Mail from "../utils/mail";
import HttpError from "../utils/HttpError";
import mailingListUnsubscribe from "../templates/email/mailingListUnsubscribe";
import mailingListSignup from "../templates/email/mailingListSignup";

export default class MailingList extends Model {
  async isSubscribed(email) {
    try {
      const selectEmailResponse = await this.db.query(
        "SELECT * FROM mailing_list WHERE email = $1",
        [email]
      );

      if (!selectEmailResponse) {
        throw new HttpError(
          "Postgres query error (MailingList::isSubscribed)",
          500
        );
      }

      return { isSubscribed: !!selectEmailResponse.rowCount };
    } catch (e) {
      return e;
    }
  }

  async addEmail(email) {
    try {
      const insertEmailResponse = await this.db.query(
        "INSERT INTO mailing_list (email) VALUES ($1) ON CONFLICT (email) DO NOTHING RETURNING id",
        [email]
      );

      const emailId = insertEmailResponse.rows?.[0]?.id;

      if (!emailId) {
        throw new HttpError(`Email ${email} already exists.`, 409);
      }

      const hash = await bcryptHash(`${email}${emailId}`, 10);

      return await this.db.query(
        "UPDATE mailing_list SET hash = $1 WHERE id = $2 RETURNING hash, email",
        [hash, emailId]
      );
    } catch (e) {
      console.error("MailingList::addEmail", e);
      if (e.status === 409) {
        return e;
      }
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

  async sendSubscriptionEmail(subscribeResponse) {
    const mail = new Mail();
    const { email, hash } = subscribeResponse.rows?.[0];

    if (!email) {
      throw new Error("Email address is missing");
    }

    if (!hash) {
      throw new Error("Hash is missing");
    }

    try {
      const mailResponse = await mail.send(
        email,
        "FCE - Ajout à la liste de contacts",
        mailingListSignup({
          unsubscribeHash: hash,
        })
      );

      console.log({ mailResponse });
      console.log(`Subscription email sent to ${email}`);
    } catch (e) {
      console.error(
        `Mailing list subscription email was not sent to ${email}`,
        e
      );
    }
  }

  async sendUnsubscriptionEmail(unsubscribeResponse) {
    const mail = new Mail();
    const email = unsubscribeResponse.rows?.[0]?.email;

    if (!email) {
      throw new Error("Email address is missing");
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
      console.error(
        `Mailing list unsubscription email was not sent to ${email}.`,
        e
      );
    }
  }
}
