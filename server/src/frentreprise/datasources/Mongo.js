import EtablissementModel from "../../models/EtablissementModel";

const { DataSource } = require(__DIST
  ? "frentreprise"
  : "../../../lib/frentreprise/src/frentreprise");

const _mongoToCleanModel = Symbol("_mongoToCleanModel");
const _getCleanYear = Symbol("_getCleanYear");
const _getCleanBool = Symbol("_getCleanBool");
const _getCleanDate = Symbol("_getCleanDate");
const _getCleanAddress = Symbol("_getCleanAddress");

class Mongo extends DataSource {
  async getSIRET(siret) {
    let mongo = null;

    try {
      mongo = await EtablissementModel.findBySIRET(siret);
    } catch (exception) {
      console.error(exception);
    }

    return await this[_mongoToCleanModel](mongo);
  }

  async [_mongoToCleanModel](mongo) {
    if (!(mongo && typeof mongo === "object")) {
      return {};
    }

    const out = {};

    const attr_map = {
      enseigne: "enseigne",
      siret: "siret",
      categorie_etablissement: "code_qualite_siege",
      adresse: this[_getCleanAddress],
      departement: "code_departement",
      region: "code_region",
      date_creation: this[_getCleanDate].bind(this, "date_de_creation"),
      etat_etablissement: obj => {
        return {
          label: obj["code_etat"],
          date: this[_getCleanDate]("date_de_l_etat", obj)
        };
      },
      activite: "code_activite",
      date_debut_activite_economique: this[_getCleanDate].bind(
        this,
        "date_debut_activite"
      ),
      modalite_activite: "code_modalite_activ_",
      marchand: "code_marchand",
      etablissement_employeur: this[_getCleanBool].bind(this, "code_employeur"),
      tranche_effectif_insee: "tranche_eff__insee",
      annee_tranche_effectif_insee: this[_getCleanYear].bind(
        this,
        "annee_tranche_eff_"
      ),
      dernier_effectif_physique: "dernier_eff__physique",
      date_dernier_effectif_physique: this[_getCleanYear].bind(
        this,
        "date_der_eff_physique"
      ),
      source_dernier_effectif_physique: "source_dernier_eff_phy",
      unite_controle_competente: "code_section",
      annee_idcc: "annee_idcc",
      codes_idcc: "codes_idcc"
    };

    var keys = Object.keys(attr_map);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const mapping = attr_map[key];

      if (typeof mapping === "string") {
        out[key] = mongo[mapping];
      }

      if (typeof mapping === "function") {
        out[key] = await Promise.resolve(mapping(mongo));
      }
    }

    return out;
  }

  [_getCleanYear](key, obj) {
    const date = new Date(); // this[_getCleanDate](key, obj);
    return (date && date.getFullYear()) || null;
  }

  [_getCleanDate](key, obj) {
    return new Date().toISOString();
  }

  [_getCleanBool](key, obj) {
    return !!(obj[key] === true || /^(1|true|O)$/.test(("" + obj[key]).trim()));
  }

  [_getCleanAddress](obj) {
    return `
    ${obj.numero_voie || ""} ${obj.code_type_de_voie ||
      ""} ${obj.libelle_voie || ""}
    ${obj.complement_adresse || ""} ${obj.code_postal || ""}
    ${obj.libelle_commune || ""}
    `
      .trim()
      .split("\n")
      .map(l => l.trim())
      .join("\n");
  }

  async getSIREN() {
    return {}; // Unsupported in this data source
  }

  async search(query) {
    let mongo = null;

    try {
      if (typeof query === "object") {
        console.log("advanced", query);
        mongo = await EtablissementModel.findByAdvancedSearch(query);
        console.log(mongo);
      } else {
        mongo = await EtablissementModel.findByRaisonSociale(query);
      }
    } catch (exception) {
      console.error(exception);
    }

    const results = [];

    if (mongo && Array.isArray(mongo)) {
      for (let i = 0; i < mongo.length; i++) {
        const model = await this[_mongoToCleanModel](mongo[i]);
        if (
          model &&
          typeof model === "object" &&
          Object.keys(model).length > 0
        ) {
          results.push(model);
        }
      }
    }

    return results;
  }
}

module.exports = Mongo;
