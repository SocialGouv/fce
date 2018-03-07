import EtablissementModel from "../../models/EtablissementModel";
import InteractionModel from "../../models/InteractionModel";
import NomenclatureModel from "../../models/NomenclatureModel";

const { DataSource } = require(__DIST
  ? "frentreprise"
  : "../../../lib/frentreprise/src/frentreprise");

// PrivateMethods
const _ = {};
[
  "mongoToCleanModel",
  "getCleanYear",
  "getCleanBool",
  "getCleanDate",
  "getCleanAddress",
  "getObjectKey",
  "runAttrMap",
  "getNomenclatureValue"
].forEach(key => {
  _[key] = Symbol(key);
}, this);

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

    return await this[_.mongoToCleanModel](siene_sese, interactions);
  }

  async [_.mongoToCleanModel](siene_sese, interactions) {
    const out = {};

    if (siene_sese && typeof siene_sese === "object") {
      const attr_map = {
        raison_sociale_entreprise: "raison_sociale",
        enseigne: "enseigne",
        siret: "siret",
        categorie_etablissement: this[_.getNomenclatureValue].bind(
          this,
          "code_qualite_siege",
          "code_qualite_siege"
        ),
        adresse: this[_.getCleanAddress],
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
        region: this[_.getNomenclatureValue].bind(
          this,
          "code_region",
          "code_region"
        ),
        date_creation: this[_.getCleanDate].bind(this, "date_de_creation"),
        etat_etablissement: async obj => {
          return {
            label: await this[_.getNomenclatureValue](
              "code_etat",
              "code_etat",
              obj
            ),
            date: this[_.getCleanDate]("date_de_l_etat", obj)
          };
        },
        activite: async obj => {
          if (!this[_.getObjectKey]("code_activite", obj)) {
            return "N/A";
          }
          return (
            this[_.getObjectKey]("code_activite", obj) +
            " - " +
            (await this[_.getNomenclatureValue](
              "code_activite_naf",
              "code_activite",
              obj
            ))
          );
        },
        date_debut_activite_economique: this[_.getCleanDate].bind(
          this,
          "date_debut_activite"
        ),
        modalite_activite: this[_.getNomenclatureValue].bind(
          this,
          "code_modalite_activ_",
          "code_modalite_activ_"
        ),
        marchand: "code_marchand",
        etablissement_employeur: this[_.getCleanBool].bind(
          this,
          "code_employeur"
        ),
        tranche_effectif_insee: this[_.getNomenclatureValue].bind(
          this,
          "tranche_effectif",
          "tranche_eff__insee"
        ),
        annee_tranche_effectif_insee: this[_.getCleanYear].bind(
          this,
          "annee_tranche_eff_"
        ),
        dernier_effectif_physique: "dernier_eff__physique",
        date_dernier_effectif_physique: this[_.getCleanYear].bind(
          this,
          "date_der_eff_physique"
        ),
        source_dernier_effectif_physique: this[_.getNomenclatureValue].bind(
          this,
          "source_dernier_eff_phy",
          "source_dernier_eff_phy"
        ),
        unite_controle_competente: "code_section",
        annee_idcc: "annee_idcc",
        codes_idcc: this[_.getNomenclatureValue].bind(
          this,
          "codes_idcc",
          "codes_idcc"
        ),
        eti_pepite: "sese.eos_eti_pepite_",
        filiere_strategique: obj => {
          return (
            obj.sese && ("" + obj.sese.eos_filiere).replace("\n", " ").trim()
          );
        },
        structure_insertion_activite_economique: this[_.getCleanBool].bind(
          this,
          "sese.siae"
        ),
        structure_insertion_activite_economique_types: obj => {
          return obj["sese"]
            ? {
                aci: this[_.getCleanBool]("aci", obj["sese"]),
                ai: this[_.getCleanBool]("ai", obj["sese"]),
                ei: this[_.getCleanBool]("ei", obj["sese"]),
                etti: this[_.getCleanBool]("etti", obj["sese"])
              }
            : {};
        },
        activite_partielle_24_derniers_mois: obj => {
          if (this[_.getCleanBool]("sese.acp", obj)) {
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

      await this[_.runAttrMap](siene_sese, attr_map, out);
    }

    if (interactions && typeof interactions === "object") {
      out.direccte = interactions;
    }

    return out;
  }

  async [_.runAttrMap](source, attrMap, out) {
    var keys = Object.keys(attrMap);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const mapping = attrMap[key];

      if (typeof mapping === "string") {
        out[key] = this[_.getObjectKey](mapping, source);
      }

      if (typeof mapping === "function") {
        out[key] = await Promise.resolve(mapping(source));
      }
    }
  }

  [_.getObjectKey](key, obj) {
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

  [_.getCleanYear](key, obj) {
    const date = new Date(); // this[_.getCleanDate](key, obj);
    return (date && date.getFullYear()) || null;
  }

  [_.getCleanDate](key, obj) {
    return new Date().toISOString();
  }

  [_.getCleanBool](key, obj) {
    return !!(
      obj[key] === true ||
      /^(1|true|O)$/.test(("" + this[_.getObjectKey](key, obj)).trim())
    );
  }

  [_.getCleanAddress](obj) {
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

  [_.getNomenclatureValue](category, key, obj) {
    const val = this[_.getObjectKey](key, obj);

    let nomKey = "libelle";
    let cat = category;
    if (typeof category === "object") {
      cat = category.category;
      if (category.key === "string") {
        nomKey = category.key;
      }
    }

    return NomenclatureModel.findOneByCategoryAndCode(cat, val).then(
      nom => (nom && nom[nomKey]) || val
    );
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
        const model = await this[_.mongoToCleanModel](mongo[i]);
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
