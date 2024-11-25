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
        password: strapiPassword,
      });
      this.token = response.data.jwt;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  isTokenExpired() {
    const {
      payload: { exp },
    } = decodeJWT(this.token);

    return exp > getUnixTime(new Date());
  }

  async getOrFetchToken() {
    if (!this.token || this.isTokenExpired()) {
      await this.login();
    }

    return this.token;
  }

  async getRequest() {
    const token = await this.getOrFetchToken();

    return axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async findByEmail(email) {
    const request = await this.getRequest();

    const response = await request.get(USERS_ENDPOINT, {
      params: {
        email_eq: email,
      },
    });

    return response?.data[0] || null;
  }

  async create(email, structure) {
    const request = await this.getRequest();

    try {
      await request.post(USERS_ENDPOINT, {
        email,
        structure,
        published_at: null,
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      // Vérifier si err.response existe
      const errorDetails =
        err.response?.data || err.message || "Erreur inconnue";

      console.error("Erreur API :", errorDetails);

      if (err.response?.data?.statusCode === 500) {
        return {
          success: true, // Supposé comme un succès en cas d'erreur 500
        };
      }

      return {
        success: false,
        error: {
          message: "Erreur de création de l'utilisateur",
          details: errorDetails,
        },
      };
    }
  }
}
