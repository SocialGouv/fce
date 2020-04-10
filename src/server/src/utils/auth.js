import config from "config";
import jwt from "jsonwebtoken";
import emailValidator from "email-validator";
import util from "util";
import AuthRequestsModel from "../models/AuthRequests";

export default class Auth {
  static generateToken(user) {
    /**
     * @link https://stackoverflow.com/questions/47117709/payload-error-in-jsonwebtoken
     */
    user = JSON.parse(JSON.stringify(user));

    return jwt.sign(user, config.jwt.secret, {
      expiresIn: config.jwt.expire,
    });
  }

  static async checkToken(token) {
    try {
      const verify = util.promisify(jwt.verify).bind(jwt);
      const user = await verify(token, config.jwt.secret);

      return user;
    } catch (e) {
      console.error("Auth.checkToken()", e);
      return false;
    }
  }

  static checkClientPermissionBySlug(clientSlug, user) {
    return user.clients.find((client) => client.slug === clientSlug);
  }

  static isEmailAllowed(email) {
    const { allowedEmails } = config.get("authCode");

    if (!emailValidator.validate(email)) {
      return false;
    }

    if (allowedEmails === true) {
      return true;
    }

    if (!Array.isArray(allowedEmails)) {
      return false;
    }

    return !!allowedEmails.find((regex) => !!email.match(regex));
  }

  static generateCode(email) {
    const authRequests = new AuthRequestsModel();
    const code = this._generateRandomCode();

    authRequests.delete(email);

    if (!authRequests.create({ email, code })) {
      return false;
    }

    return code;
  }

  static _generateRandomCode() {
    const { codeLength } = config.get("authCode");
    const maxNumber = Math.pow(10, codeLength) - 1;
    const codeInt = Math.floor(Math.random() * Math.floor(maxNumber));
    return codeInt.toString().padStart(codeLength, "0");
  }
}
