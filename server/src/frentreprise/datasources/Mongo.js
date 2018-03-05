import EtablissementModel from "../../models/EtablissementModel";
import InteractionModel from "../../models/InteractionModel";

const { DataSource } = require(__DIST
  ? "frentreprise"
  : "../../../lib/frentreprise/src/frentreprise");

const _mongoToCleanModel = Symbol("_mongoToCleanModel");
const _getCleanYear = Symbol("_getCleanYear");
const _getCleanBool = Symbol("_getCleanBool");
const _getCleanDate = Symbol("_getCleanDate");
const _getCleanAddress = Symbol("_getCleanAddress");
const _getObjectKey = Symbol("_getObjectKey");
const _runAttrMap = Symbol("_runAttrMap");

class Mongo extends DataSource {
  async getSIRET(siret) {
    let siene_sese = null;
    let interactions = null;

    try {
      siene_sese = await EtablissementModel.findBySIRET(siret);
    } catch (exception) {
      console.error(exception);
    }

    try {
      interactions = await InteractionModel.findBySIRET(siret);
    } catch (exception) {
      console.error(exception);
    }

    return await this[_mongoToCleanModel](siene_sese, interactions);
  }

  async [_mongoToCleanModel](siene_sese, interactions) {
    const out = {};

    if (siene_sese && typeof siene_sese === "object") {
      const attr_map = {
        raison_sociale_entreprise: "raison_sociale",
        enseigne: "enseigne",
        siret: "siret",
        categorie_etablissement: "code_qualite_siege",
        adresse: this[_getCleanAddress],
        adresse_components: obj => {
          return {
            numero_voie: obj.numero_voie,
            type_voie: obj.code_type_de_voie,
            nom_voie: obj.libelle_voie,
            complement_adresse: obj.complement_adresse,
            code_postal: obj.code_postal,
            localite: obj.libelle_commune
          };
        },
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
        etablissement_employeur: this[_getCleanBool].bind(
          this,
          "code_employeur"
        ),
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
        codes_idcc: "codes_idcc",
        eti_pepite: "sese.eos_eti_pepite_",
        filiere_strategique: obj => {
          return (
            obj.sese && ("" + obj.sese.eos_filiere).replace("\n", " ").trim()
          );
        },
        structure_insertion_activite_economique: this[_getCleanBool].bind(
          this,
          "sese.siae"
        ),
        structure_insertion_activite_economique_types: obj => {
          return obj["sese"]
            ? {
                aci: this[_getCleanBool]("aci", obj["sese"]),
                ai: this[_getCleanBool]("ai", obj["sese"]),
                ei: this[_getCleanBool]("ei", obj["sese"]),
                etti: this[_getCleanBool]("etti", obj["sese"])
              }
            : {};
        },
        activite_partielle_24_derniers_mois: obj => {
          if (this[_getCleanBool]("sese.acp", obj)) {
            const yearKeys = [];

            for (let i = 0; i < 10; i++) {
              const year = +obj.sese[`acp_annee${i}_auto`];
              if (year > 0) {
                yearKeys.push(year);
              }
            }

            yearKeys.sort((a, b) => a - b);

            return yearKeys.reduce((acp, year) => {
              return {
                ...acp,
                [year]: {
                  heures_demandees: +obj.sese[`acp_nbh_auto_${year}`] || null,
                  heures_consommees: +obj.sese[`acp_nbh_conso_${year}`] || null
                }
              };
              return acp;
            }, {});
          }

          return null;
        },
        pse_en_projet_ou_en_cours: obj => {
          const pse = {};
          if (typeof obj.sese === "object") {
            for (let i = 0; i < 10; i++) {
              const year = +obj.sese[`pse_annee${i}`];
              if (year > 0) {
                pse[year] = {
                  etat: obj.sese[`pse_etat${i}`],
                  poste: obj.sese[`pse_poste${i}`]
                };
              }
            }
          }

          return pse;
        }
      };

      await this[_runAttrMap](siene_sese, attr_map, out);
    }

    if (interactions && typeof interactions === "object") {
      out.direccte = interactions;
    }

    return out;
  }

  async [_runAttrMap](source, attrMap, out) {
    var keys = Object.keys(attrMap);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const mapping = attrMap[key];

      if (typeof mapping === "string") {
        out[key] = this[_getObjectKey](mapping, source);
      }

      if (typeof mapping === "function") {
        out[key] = await Promise.resolve(mapping(source));
      }
    }
  }

  [_getObjectKey](key, obj) {
    const path = key.split(".");

    let result = obj;

    for (let i = 0; i < path.length; i++) {
      const objkey = path[i];
      if (typeof result === "object" && objkey in result) {
        result = result[objkey];
      } else {
        result = undefined;
        break;
      }
    }

    return result;
  }

  [_getCleanYear](key, obj) {
    const date = new Date(); // this[_getCleanDate](key, obj);
    return (date && date.getFullYear()) || null;
  }

  [_getCleanDate](key, obj) {
    return new Date().toISOString();
  }

  [_getCleanBool](key, obj) {
    return !!(
      obj[key] === true ||
      /^(1|true|O)$/.test(("" + this[_getObjectKey](key, obj)).trim())
    );
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
        mongo = await EtablissementModel.findByAdvancedSearch(query);
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
