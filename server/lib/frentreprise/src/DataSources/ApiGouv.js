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

const _convertDate = Symbol("_convertDate");

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
    let legacy = null;

    try {
      legacy = await this.axios.get(`entreprises_legacy/${SIREN}`, {
        params: _getAPIParams(this)
      });
    } catch (exception) {
      console.log(exception);
    }

    const out = {};

    if (
      legacy &&
      typeof legacy === "object" &&
      legacy.data &&
      typeof legacy.data === "object" &&
      legacy.data.entreprise
    ) {
      const legacy_ent = legacy.data.entreprise;

      ["siret", "raison_sociale", "categorie_entreprise"].forEach(key => {
        out[key] = legacy_ent[key];
      });

      out.categorie_juridique = legacy_ent.forme_juridique;
      out.date_de_creation = this[_convertDate](legacy_ent.date_creation);
      out.date_de_radiation = this[_convertDate](legacy_ent.date_radiation);

      if (
        !legacy_ent.etat_administratif ||
        typeof legacy_ent.etat_administratif !== "object"
      ) {
        legacy_ent.etat_administratif = {};
      }

      out.etat_entreprise = {
        label: legacy_ent.etat_administratif.value || "N/A",
        date: this[_convertDate](legacy_ent.etat_administratif.date_mise_a_jour)
      };
    }

    let entreprise = null;

    try {
      entreprise = await this.axios.get(`entreprises/${SIREN}`, {
        params: _getAPIParams(this)
      });
    } catch (exception) {
      console.log(exception);
    }

    if (
      entreprise &&
      typeof entreprise === "object" &&
      entreprise.data &&
      typeof entreprise.data === "object" &&
      entreprise.data.entreprise
    ) {
      const ent = entreprise.data.entreprise;

      ["categorie_entreprise"].forEach(key => {
        out[key] = ent[key];
      });
    }

    return out;
  }

  [_convertDate](timestamp) {
    return (timestamp && new Date(timestamp * 1000)) || null;
  }

  async search() {
    return false;
  }
}
