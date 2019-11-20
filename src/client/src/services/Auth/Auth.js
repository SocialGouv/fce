import { Local } from "OhMyCache";
import Http from "../Http";
import _get from "lodash.get";

const AUTH_KEY = "fce_token";
const AUTH_CLIENT_VERIFICATION_KEY = "fce_client";

export default class Auth {
  static sendMagicLink(email, browser) {
    const clientVerificationKey = this.generateClientVerificationKey();
    Local.set(AUTH_CLIENT_VERIFICATION_KEY, clientVerificationKey);
    return Http.post("/sendMagicLink", {
      email,
      clientVerificationKey,
      browser
    });
  }

  static loginWithMagicLink(key) {
    this.logout();
    const clientVerificationKey = Local.get(AUTH_CLIENT_VERIFICATION_KEY);
    return Http.post("/login", {
      key,
      clientVerificationKey
    }).then(response => {
      const token = _get(response, "data.token");
      if (token) {
        Local.set(AUTH_KEY, token);
      }
      return response;
    });
  }

  static logout() {
    Local.remove(AUTH_KEY);
  }

  static isLogged() {
    return !!Local.get(AUTH_KEY);
  }

  static getToken() {
    return Local.get(AUTH_KEY);
  }

  /**
   * @link https://andywalpole.me/blog/140739/using-javascript-create-guid-from-users-browser-information
   */
  static generateClientVerificationKey() {
    const nav = window.navigator;
    const screen = window.screen;
    let guid = nav.mimeTypes.length;
    guid += nav.userAgent.replace(/\D+/g, "");
    guid += nav.plugins.length;
    guid += screen.height || "";
    guid += screen.width || "";
    guid += screen.pixelDepth || "";

    return guid;
  }
}
