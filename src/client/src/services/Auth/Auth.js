import { Local } from "OhMyCache";
import Http from "../Http";
import Config from "../Config";

const AUTH_KEY = "fce_auth";

export default class Auth {
  static login(password) {
    return Http.post("/login", {
      password
    })
      .then(function(response) {
        if (response.data.user) {
          Local.set(AUTH_KEY, response.data.user, {
            expire: Config.get("auth").expire
          });
        }
        return Promise.resolve(response);
      })
      .catch(function(error) {
        return Promise.reject(error);
      });
  }

  static isLogged() {
    return !!Local.get(AUTH_KEY);
  }
}
