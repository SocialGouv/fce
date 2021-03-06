import DataSource from "../DataSource";
import EtablissementsAPI from "./EtablissementsAPI";
import EntreprisesAPI from "./EntreprisesAPI";
import axios from "../../../lib/axios";
import requestApi from "../../Utils/requestApi";

export const _ = {
  axios: Symbol("_axios"),
  requestAPIs: Symbol("_requestAPIs"),
};

export default class ApiGouv extends DataSource {
  constructor(baseURL, axiosConfig = {}) {
    super();
    this.token = null;

    this[_.axios] = axios.create({
      baseURL: baseURL,
      timeout: 30000,
    });
    this.axiosConfig = axiosConfig;
  }

  // Etablissements
  async getSIRET(siret) {
    return await requestApi(
      siret,
      {
        axios: this[_.axios],
        axiosConfig: this.axiosConfig,
        token: this.token,
      },
      EtablissementsAPI.getEtablissement,
      EtablissementsAPI.exercices,
      EtablissementsAPI.effectifsMensuelEtp
    );
  }

  // Entreprises
  async getSIREN(siren) {
    return await requestApi(
      siren,
      {
        axios: this[_.axios],
        axiosConfig: this.axiosConfig,
        token: this.token,
      },
      EntreprisesAPI.getEntreprise,
      EntreprisesAPI.infogreffe_rcs,
      EntreprisesAPI.effectifsMensuelEtp,
      EntreprisesAPI.effectifsAnnuelEtp
    );
  }

  getSIRENCheck(data) {
    return !!data.siren;
  }

  getSIRETCheck(data) {
    return !!data.siret;
  }
}
