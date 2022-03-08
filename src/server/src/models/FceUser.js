import config from "config";
import axios from "axios";
import { decode as decodeJWT } from "jsonwebtoken";
import { getUnixTime } from "date-fns";

const strapiURL = config.get("strapi.url");
const strapiUser = config.get("strapi.user");
const strapiPassword = config.get("strapi.password");

const LOGIN_ENDPOINT = `${strapiURL}/auth/local`;
const USERS_ENDPOINT = `${strapiURL}/fce-users`;

export default class FceUser {
  token = null;

  async login() {
    try {
      const response = await axios.post(LOGIN_ENDPOINT, {
        identifier: strapiUser,
        password: strapiPassword
      });
      this.token = response.data.jwt;
    } catch(err) {
      console.log(err);
      throw err;
    }
  }

  isTokenExpired() {
    const { payload: {
      exp
    }} = decodeJWT(this.token);

    return exp > getUnixTime(new Date());
  }

  async getOrFetchToken() {
    if (!this.token || this.isTokenExpired()) {
      await this.login();
    }

    return this.token;
  }

  async findByEmail(email) {
    const token = await this.getOrFetchToken();

    const response = await axios.get(USERS_ENDPOINT, {
      params: {
        email_eq: email
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response?.data[0] || null;
  }
}
