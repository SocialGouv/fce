import config from "config";
import jwt from "jsonwebtoken";
import util from "util";

export default class Auth {
  static generateToken(user) {
    /**
     * @link https://stackoverflow.com/questions/47117709/payload-error-in-jsonwebtoken
     */
    user = JSON.parse(JSON.stringify(user));

    return jwt.sign(user, config.jwt.secret, {
      expiresIn: config.jwt.expire
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
    return user.clients.find(client => client.slug === clientSlug);
  }
}
