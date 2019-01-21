import tunnel from "tunnel";
import DataSource from "../DataSource";
import Siren from './Siren';
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
    return await this[_.requestAPIs](
      SIRET,
      EtablissementsAPI.getEtablissement,
      EtablissementsAPI.agefiph,
      EtablissementsAPI.exercices,
      EtablissementsAPI.association,
      EtablissementsAPI.predecesseur,
      EtablissementsAPI.successeur,
      EtablissementsAPI.document_association
    );
  }

  // Entreprises
  async getSIREN(SIREN) {
    return await this[_.requestAPIs](
      SIREN,
      Siren.siren
    );
  }

  async search() {
    return false;
  }

  async [_.requestAPIs](identifier, ...apiCalls) {
    let out = {};

    const axiosConfig = {
      ...this.axiosConfig,
      params: {
        token: this.token,
        context: "Tiers",
        recipient: "Direccte Occitanie",
        object: "FCEE - Direccte Occitanie"
      }
    };

    if (axiosConfig.proxy && axiosConfig.proxy.tunnel === true) {
      const agentConfig = { proxy: {} };

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

    const requests = apiCalls
      .filter(fn => typeof fn === "function")
      .map(fn => {
        return fn(identifier, this[_.axios], axiosConfig);
      });

    await Promise.all(requests).then(results => {
      Object.assign(out, ...results);
    });

    return out;
  }
}
