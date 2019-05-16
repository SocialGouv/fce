import { Local } from "OhMyCache";
import Http from "../Http";
import Config from "../Config";

const AUTH_KEY = "fce_auth";

export default class Auth {
  static sendMagicLink(email) {
    return Http.post("/sendMagicLink", {
      email
    });
  }

  static loginWithMagicLink(key) {
    return Http.post("/login", {
      key
    });
  }

  static isLogged() {
    return !!Local.get(AUTH_KEY);
  }
}
