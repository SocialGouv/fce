import { Local } from "OhMyCache";
import Http from "../Http";

const AUTH_KEY = "fce_token";
const AUTH_EMAIL = "user_email";

export default class Auth {
  static sendCode(email) {
    return Http.post("/requestAuthCode", {
      email
    });
  }

  static login(email, code) {
    return Http.post("/login", {
      code,
      email
    }).then(response => {
      if (response.data && response.data.success) {
        Local.set(AUTH_KEY, response.data.token);
        Local.set(AUTH_EMAIL, email);
      }

      return response;
    });
  }

  static logout() {
    Local.remove(AUTH_KEY);
    Local.remove(AUTH_EMAIL);
  }

  static isLogged() {
    return !!Local.get(AUTH_KEY);
  }

  static getToken() {
    return Local.get(AUTH_KEY);
  }

  static getEmail() {
    return Local.get(AUTH_EMAIL);
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
