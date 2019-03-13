import tunnel from "tunnel";
import DataSource from "../DataSource";
import Siren from "./Siren";
import Siret from "./Siret";
import search from "./Search";
import axios from "../../../lib/axios";

export const _ = {
  axios: Symbol("_axios"),
  requestAPIs: Symbol("_requestAPIs")
};

export default class SireneAPI extends DataSource {
  constructor(baseURL, axiosConfig = {}) {
    super();
    this.token = null;

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
      this.getAxiosConfig(),
      this.db
    );
    return res;
  }

  async [_.requestAPIs](identifier, ...apiCalls) {
    let out = {};
    const requests = apiCalls
      .filter(fn => typeof fn === "function")
      .map(fn => {
        return fn(identifier, this[_.axios], this.getAxiosConfig(), this.db);
      });

    await Promise.all(requests).then(results => {
      Object.assign(out, ...results);
    });

    return out;
  }

  getAxiosConfig() {
    const axiosConfig = {
      ...this.axiosConfig,
      headers: {
        Authorization: `Bearer ${this.token}`
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
}
