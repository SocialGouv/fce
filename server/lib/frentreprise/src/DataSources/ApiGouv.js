import axios from "axios";
import DataSource from "./DataSource";

const _getAPIParams = Symbol("_getAPIParams");
const _convertDate = Symbol("_convertDate");
const _getCleanAddress = Symbol("_getCleanAddress");

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
  // GET /associations/:id
  // ETABLISSEMENT
  async getSIRET(SIRET) {
    let legacy = null;

    try {
      legacy = await this.axios.get(`etablissements_legacy/${SIRET}`, {
        params: this[_getAPIParams](this)
      });
    } catch (exception) {
      console.error(exception);
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
        else out[key] = legacy_et[key] || undefined;
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

      [].forEach(key => {
        out[key] = et[key];
      });

      out.date_creation = this[_convertDate](et.date_creation_etablissement);

      if (et.adresse && typeof et.adresse === "object") {
        out.adresse = this[_getCleanAddress](et.adresse);
        out.adresse_components = et.adresse;
        out.departement =
          typeof et.adresse.code_insee_localite === "string" &&
          et.adresse.code_insee_localite.length > 1 &&
          et.adresse.code_insee_localite.substr(0, 2);
      }

      out.code_region =
        (et.region_implantation && +et.region_implantation.code) || 0;

      out.region =
        (et.region_implantation && et.region_implantation.value) || undefined;

      out.activite =
        et.naf && et.libelle_naf ? `${et.naf} - ${et.libelle_naf}` : null;

      out.etablissement_employeur =
        +et.tranche_effectif_salarie_etablissement.a > 0;

      out.tranche_effectif_insee =
        et.tranche_effectif_salarie_etablissement.intitule;
      out.annee_tranche_effectif_insee =
        +et.tranche_effectif_salarie_etablissement.date_reference || undefined;
    }

    let age = null;

    try {
      age = await this.axios.get(`attestations_agefiph/${SIRET}`, {
        params: this[_getAPIParams](this)
      });
    } catch (exception) {
      console.log(exception);
    }

    if (
      age &&
      typeof age === "object" &&
      age.data &&
      typeof age.data === "object"
    ) {
      out.agefiph_derniere_annee_conformite_connue =
        age.data.derniere_annee_de_conformite_connue || null;
    }

    let exercices = null;

    try {
      exercices = await this.axios.get(`exercices/${SIRET}`, {
        params: this[_getAPIParams](this)
      });
    } catch (exception) {
      console.log(exception);
    }

    if (
      exercices &&
      typeof exercices === "object" &&
      exercices.data &&
      typeof exercices.data === "object" &&
      exercices.data.exercices &&
      Array.isArray(exercices.data.exercices)
    ) {
      out.donnees_ecofi = {};
      exercices.data.exercices.forEach(decofi => {
        out.donnees_ecofi[
          this[_convertDate](decofi.date_fin_exercice_timestamp).toISOString()
        ] =
          +decofi.ca || null;
      });
    }

    let association = null;
    try {
      association = await this.axios.get(`associations/${SIRET}`, {
        params: this[_getAPIParams](this)
      });
    } catch (exception) {
      console.log(exception);
    }

    if (
      association &&
      typeof association === "object" &&
      association.data &&
      typeof association.data === "object" &&
      association.data.association &&
      association.data.association.etat
    ) {
      out.association = association.data.association || null;
    }

    let documents_associations = null;
    if (out.association) {
      try {
        documents_associations = await this.axios.get(
          `documents_associations/${SIRET}`,
          {
            params: this[_getAPIParams](this)
          }
        );
      } catch (exception) {
        console.log(exception);
      }
    }

    if (
      documents_associations &&
      typeof documents_associations === "object" &&
      documents_associations.data &&
      typeof documents_associations.data === "object" &&
      documents_associations.data.documents
    ) {
      const documents = documents_associations.data.documents;
      const timestamps = documents.map(doc => {
        if (doc.type === "Statuts") {
          return parseInt(doc.timestamp, 10);
        }
        return 0;
      });
      const maxTimestamp = Math.max(...timestamps);

      const earlierDocuments = documents.reduce((acc, cur) => {
        let ts = parseInt(cur.timestamp, 10);
        if (ts === maxTimestamp && cur.type === "Statuts") {
          acc.push(cur);
        }
        return acc;
      }, []);

      out.documents_associations = earlierDocuments;
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
        else out[key] = legacy_ent[key] || undefined;
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
          +ent.tranche_effectif_salarie_entreprise.date_reference || undefined;
        out.tranche_effectif =
          ent.tranche_effectif_salarie_entreprise.intitule || undefined;
      }

      if (Array.isArray(ent.mandataires_sociaux)) {
        out.mandataires_sociaux = [];
        ent.mandataires_sociaux.forEach(manso => {
          out.mandataires_sociaux.push({
            nom: manso.nom,
            prenom: manso.prenom,
            fonction: manso.fonction,
            raison_sociale: manso.raison_sociale
          });
        });
      }
    }

    return out;
  }

  [_convertDate](timestamp) {
    return (timestamp && new Date(timestamp * 1000)) || undefined;
  }

  [_getCleanAddress](ad) {
    return `
    ${ad.numero_voie || ""} ${ad.type_voie || ""} ${ad.nom_voie || ""}
    ${ad.complement_adresse || ""} ${ad.code_postal || ""}
    ${ad.localite || ""}
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
