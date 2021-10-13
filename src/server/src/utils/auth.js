import config from "config";
import jwt from "jsonwebtoken";
import emailValidator from "email-validator";
import util from "util";
import AuthRequestsModel from "../models/AuthRequests";
import AuthTempModel from "../models/AuthTemp";
import ValidEmail from "../models/ValidEmail";

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

  static generateTemporaryToken(user) {
    user = { email: "temporary" + new Date().getTime() };

    return jwt.sign(user, config.jwt.secret, {
      expiresIn: config.jwt.expireTemporary,
    });
  }

  static async askCredential() {
    const authTempModel = new AuthTempModel();

    const { id } = await authTempModel.create();
    return id;
  }

  static async checkToken(token) {
    try {
      const verify = util.promisify(jwt.verify).bind(jwt);
      const user = await verify(token, config.jwt.secret);

      if (user.iat < config.jwt.expireBefore) {
        return false;
      }

      return user;
    } catch (e) {
      console.error("Auth.checkToken()", e);
      return false;
    }
  }

  static checkClientPermissionBySlug(clientSlug, user) {
    return user.clients.find((client) => client.slug === clientSlug);
  }

  static async isEmailAllowed(email) {
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

    if (allowedEmails.find((regex) => !!email.match(regex))) {
      return true;
    }

    const validEmails = new ValidEmail();

    return validEmails.exists(email);
  }

  static async validateCode(email, code) {
    const authRequestsModel = new AuthRequestsModel();
    const authRequest = await authRequestsModel.getByEmail(email);

    if (
      !authRequest ||
      isExpired(authRequest.created_at, config.get("authCode.expire")) ||
      tooMuchFailures(authRequest.failures, config.get("authCode.maxFailures"))
    ) {
      authRequestsModel.delete(email);
      return {
        isValidCode: false,
        failureMessage:
          "Votre demande de connexion a expirée, veuillez demander un nouveau code.",
      };
    }
    console.log(code, authRequest.code);
    if (code !== authRequest.code) {
      authRequestsModel.incrementFailure(email);
      return {
        isValidCode: false,
        failureMessage: "Le code est invalide.",
      };
    }

    await authRequestsModel.delete(email);

    return {
      isValidCode: true,
    };
  }

  static async useCredential(credential) {
    const authTempModel = new AuthTempModel();
    const authTemp = await authTempModel.getById(credential);

    if (!authTemp || isAlreadyActivated(authTemp.activated)) {
      return {
        isValidCredential: false,
        failureMessage:
          "Votre lien a déjà été utilisé ou a expiré, veuillez régénérer un lien.",
      };
    }
    authTempModel.desactivate(credential);
    return { isValidCredential: true };
  }

  static async hasValidCode(email) {
    const authRequests = new AuthRequestsModel();

    const authRequest = await authRequests.getByEmail(email);

    return authRequest && (
        !isExpired(authRequest.created_at, config.get("authCode.expire")) &&
        !tooMuchFailures(authRequest.failures, config.get("authCode.maxFailures")
        )
    );
  }

   static async generateCode(email) {
    const authRequests = new AuthRequestsModel();
    const code = generateRandomCode();

    await authRequests.delete(email);

    if (!authRequests.create({ email, code })) {
      return false;
    }

    return code;
  }
}

const generateRandomCode = () => {
  const { codeLength } = config.get("authCode");
  const maxNumber = Math.pow(10, codeLength) - 1;
  const codeInt = Math.floor(Math.random() * Math.floor(maxNumber));
  return codeInt.toString().padStart(codeLength, "0");
};

const isExpired = (date, expire) => {
  if (expire === false) {
    return false;
  }

  const created = timestampInSecond(Date.parse(date));
  const now = timestampInSecond(Date.now());

  return created + +expire < now;
};

const isAlreadyActivated = (activated) => {
  return !activated;
};

const timestampInSecond = (timestampInMillisecond) =>
  timestampInMillisecond / 1000;

const tooMuchFailures = (failures, maxFailures) => failures >= maxFailures;

export const getTokenFromRequest = (req) => {
  const authHeader = req.get("Authorization");

  return authHeader ? authHeader.replace("Bearer ", "") : "";
};
