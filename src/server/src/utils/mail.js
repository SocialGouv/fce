import config from "config";
import nodemailer from "nodemailer";
import stripHtml from "string-strip-html";

export default class Mail {
  constructor() {
    this.transport = nodemailer.createTransport(config.mail.transport);
    this.from = config.mail.from;
  }

  async send(to, subject, message, options = {}) {
    return await this.transport.sendMail({
      from: this.from,
      to,
      subject,
      text: stripHtml(message),
      html: message,
      ...options
    });
  }
}
