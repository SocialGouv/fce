import { Local } from "OhMyCache";

import Http from "../Http";

const AUTH_KEY = "fce_token";
const AUTH_USER_ID = "user_id";

export default class Auth {
  static sendCode(email) {
    return Http.post("/requestAuthCode", {
      email,
    });
  }

  static login(email, code, isCheckedSubscription) {
    return Http.post("/login", {
      code,
      email,
      isCheckedSubscription,
    }).then((response) => {
      if (response.data && response.data.success) {
        Local.set(AUTH_KEY, response.data.token);
        Local.set(AUTH_USER_ID, response.data.saltedEmail);
      }

      return response;
    });
  }

  static logout() {
    Local.remove(AUTH_KEY);
    Local.remove(AUTH_USER_ID);
  }

  static tempLogin(credential) {
    return Http.post("/tempLogin", {
      credential,
    }).then((response) => {
      if (response.data && response.data.success) {
        Local.set(AUTH_KEY, response.data.token);
        Local.set(AUTH_USER_ID, response.data.saltedEmail);
      }
      return response;
    });
  }

  static isLogged() {
    return !!Local.get(AUTH_KEY);
  }

  static getToken() {
    return Local.get(AUTH_KEY);
  }

  static getUserId() {
    return Local.get(AUTH_USER_ID);
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
