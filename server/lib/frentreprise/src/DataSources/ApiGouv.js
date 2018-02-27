import axios from "axios";
import DataSource from "./DataSource";

const _getAPIParams = self => {
  return {
    token: self.token,
    context: "Tiers",
    recipient: "Direccte Occitanie",
    object: "FCEE - Direccte Occitanie"
  };
};

// GET /associations/:id
// GET /documents_associations/:association_id
// Unknown calls

export default class ApiGouv extends DataSource {
  constructor(baseURL) {
    super();
    this.token = null;
    this.axios = axios.create({
      baseURL: baseURL,
      timeout: 30000
    });
  }

  // GET /etablissements_legacy/:siret
  // GET /attestations_agefiph/:siret
  // GET /exercices/:siret
  async getSIRET(SIRET) {
    const api_response = await this.axios.get(
      `etablissements_legacy/${SIRET}`,
      {
        params: _getAPIParams(this)
      }
    );

    return (
      (api_response &&
        typeof api_response === "object" &&
        api_response.data &&
        typeof api_response.data === "object" &&
        api_response.data.etablissement) ||
      {}
    );
  }

  // GET /entreprises_legacy/:siren
  async getSIREN(SIREN) {
    const api_response = await this.axios.get(`entreprises_legacy/${SIREN}`, {
      params: _getAPIParams(this)
    });

    return (
      (api_response &&
        typeof api_response === "object" &&
        api_response.data &&
        typeof api_response.data === "object" &&
        api_response.data.entreprise) ||
      {}
    );
  }

  async search() {
    return false;
  }
}
