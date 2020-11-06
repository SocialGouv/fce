import Model from "./Model";
import { hash as bcryptHash } from "bcrypt";

export default class MailingList extends Model {
  async addEmail(email) {
    try {
      const insertEmailResult = await this.db.query(
        "INSERT INTO mailing_list (email) VALUES ($1) ON CONFLICT DO NOTHING RETURNING id",
        [email]
      );

      const emailId = insertEmailResult?.rows?.[0]?.id;

      if (!emailId) {
        throw new Error(
          "Email was not inserted into mailing_list table. It could already exist."
        );
      }

      const hash = await bcryptHash(`${email}${emailId}`, 10);

      return await this.db.query(
        "UPDATE mailing_list SET hash = $1 WHERE id = $2",
        [hash, emailId]
      );
    } catch (e) {
      console.error("MailingList::addEmail", e);
      return false;
    }
  }
}
