import tunnel from "tunnel";
import DataSource from "../DataSource";
import Siren from "./Siren";
import Siret from "./Siret";
import axios from "../../../lib/axios";
import qs from "qs";
import search from "./Search";

export const _ = {
  axios: Symbol("_axios"),
  requestAPIs: Symbol("_requestAPIs"),
  getToken: Symbol("_getToken")
};

export default class SireneAPI extends DataSource {
  constructor(baseURL, axiosConfig = {}) {
    super();
    this.token = null;
    this.basicAuth = null;

    this[_.axios] = axios.create({
      baseURL: baseURL,
      timeout: 30000
    });
    this.axiosConfig = axiosConfig;
  }

  // Etablissements
  async getSIRET(SIRET) {
    return await this[_.requestAPIs](SIRET, Siret.getSettlement);
  }

  // Entreprises
  async getSIREN(SIREN) {
    return await this[_.requestAPIs](
      SIREN,
      Siren.getEntreprise,
      Siret.getSettlements
    );
  }

  async search(terms, page) {
    const res = await search(
      terms,
      page,
      this[_.axios],
      await this.getAxiosConfig(),
      this.db
    );

    return res;
  }

  async [_.requestAPIs](identifier, ...apiCalls) {
    let out = {};
    const requests = apiCalls
      .filter(fn => typeof fn === "function")
      .map(async fn => {
        return fn(
          identifier,
          this[_.axios],
          await this.getAxiosConfig(),
          this.db
        );
      });

    await Promise.all(requests).then(results => {
      Object.assign(out, ...results);
    });

    return out;
  }

  async getAxiosConfig() {
    const axiosConfig = {
      ...this.axiosConfig,
      headers: {
        Authorization: `Bearer ${await this[_.getToken](this.basicAuth)}`
      }
    };

    if (axiosConfig.proxy && axiosConfig.proxy.tunnel === true) {
      const agentConfig = {
        proxy: {}
      };

      if (axiosConfig.proxy.host) {
        agentConfig.proxy.host = axiosConfig.proxy.host;
      }

      if (axiosConfig.proxy.port) {
        agentConfig.proxy.port = axiosConfig.proxy.port;
      }

      if (axiosConfig.proxy.auth) {
        agentConfig.proxy.proxyAuth = `${axiosConfig.proxy.auth.username ||
          ""}:${axiosConfig.proxy.auth.password || ""}`;
      }

      axiosConfig.proxy = false;
      axiosConfig.httpsAgent = tunnel.httpsOverHttp(agentConfig);
    }

    return axiosConfig;
  }

  async [_.getToken](basicAuth) {
    const axiosConfig = {
      ...this.axiosConfig,
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    try {
      const request = await this[_.axios].post(
        "https://api.insee.fr/token",
        qs.stringify({ grant_type: "client_credentials" }),
        axiosConfig
      );

      return request.data.access_token;
    } catch (e) {
      console.error("Request token failed", e);
      return null;
    }
  }
}
