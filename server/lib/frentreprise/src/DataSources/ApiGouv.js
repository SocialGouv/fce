import axios from "axios";
import DataSource from "./DataSource";

const _getAPIParams = Symbol("_getAPIParams");
const _convertDate = Symbol("_convertDate");
const _getCleanAddress = Symbol("_getCleanAddress");

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
  // ETABLISSEMENT
  async getSIRET(SIRET) {
    let legacy = null;

    try {
      legacy = await this.axios.get(`etablissements_legacy/${SIRET}`, {
        params: this[_getAPIParams](this)
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
      legacy.data.etablissement
    ) {
      const legacy_et = legacy.data.etablissement;
      console.log(legacy_et);
      [
        "siret",
        "siege_social",
        "enseigne",
        "nom_commercial",
        "nom",
        "prenom",
        "siret_siege_social"
      ].forEach(key => {
        if (typeof legacy_et[key] === "boolean") out[key] = legacy_et[key];
        else out[key] = legacy_et[key] || null;
      });

      if (
        !legacy_et.etat_administratif ||
        typeof legacy_et.etat_administratif !== "object"
      ) {
        legacy_et.etat_administratif = {};
      }

      out.etat_etablissement = {
        label: legacy_et.etat_administratif_etablissement.value || "N/A",
        date: this[_convertDate](
          legacy_et.etat_administratif_etablissement.date_mise_a_jour
        )
      };
    }

    let etablissement = null;

    try {
      etablissement = await this.axios.get(`etablissements/${SIRET}`, {
        params: this[_getAPIParams](this)
      });
    } catch (exception) {
      console.log(exception);
    }

    if (
      etablissement &&
      typeof etablissement === "object" &&
      etablissement.data &&
      typeof etablissement.data === "object" &&
      etablissement.data.etablissement
    ) {
      const et = etablissement.data.etablissement;
      console.log(et);

      [].forEach(key => {
        out[key] = et[key];
      });

      out.date_creation = this[_convertDate](et.date_creation_etablissement);

      if (et.adresse && typeof et.adresse === "object") {
        out.adresse = this[_getCleanAddress](
          et.adresse,
          et.region_implantation
        );
        out.adresse_components;
      }
    }

    return out;
  }

  // ENTREPRISE
  async getSIREN(SIREN) {
    let legacy = null;

    try {
      legacy = await this.axios.get(`entreprises_legacy/${SIREN}`, {
        params: this[_getAPIParams](this)
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
      [
        "siren",
        "raison_sociale",
        "nombre_etablissements_actifs",
        "nom_commercial",
        "nom",
        "prenom",
        "siret_siege_social"
      ].forEach(key => {
        if (typeof legacy_ent[key] === "boolean") out[key] = legacy_ent[key];
        else out[key] = legacy_ent[key] || null;
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
        params: this[_getAPIParams](this)
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

      if (
        ent.tranche_effectif_salarie_entreprise &&
        typeof ent.tranche_effectif_salarie_entreprise === "object"
      ) {
        out.annee_tranche_effectif =
          +ent.tranche_effectif_salarie_entreprise.date_reference || null;
        out.tranche_effectif =
          ent.tranche_effectif_salarie_entreprise.intitule || null;
      }

      out.mandataires_sociaux = [];
      if (Array.isArray(ent.mandataires_sociaux)) {
        ent.mandataires_sociaux.forEach(manso => {
          out.mandataires_sociaux.push({
            nom: manso.nom,
            prenom: manso.prenom,
            fonction: manso.fonction
          });
        });
      }
    }

    return out;
  }

  [_convertDate](timestamp) {
    return (timestamp && new Date(timestamp * 1000)) || null;
  }

  [_getCleanAddress](ad, ri) {
    return `
    ${ad.numero_voie || ""} ${ad.type_voie || ""} ${ad.nom_voie || ""}
    ${ad.complement_adresse || ""} ${ad.code_postal || ""}
    ${ad.localite || ""}
    ${(ri && ri.value) || ""}
    `
      .trim()
      .split("\n")
      .map(l => l.trim())
      .join("\n");
  }

  [_getAPIParams]() {
    return {
      token: this.token,
      context: "Tiers",
      recipient: "Direccte Occitanie",
      object: "FCEE - Direccte Occitanie"
    };
  }

  async search() {
    return false;
  }
}
