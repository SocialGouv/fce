import EtablissementModel from "../../models/EtablissementModel";
import InteractionModel from "../../models/InteractionModel";
import NomenclatureModel from "../../models/NomenclatureModel";
import { validateSIREN } from "../../../lib/frentreprise/src/Utils/Validator";

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
      const siret_siege =
        this[_.getObjectKey]("siren", siene_sese) +
          this[_.getObjectKey]("nic_du_siege", siene_sese) || null;

      const attr_map = {
        _etData: obj => {
          return {
            raison_sociale: this[_.getObjectKey]("raison_sociale", obj),
            nom: this[_.getObjectKey]("nom", obj),
            prenom: this[_.getObjectKey]("prenom", obj)
          };
        },
        enseigne: "enseigne",
        siret: "siret",
        siege_social: obj => {
          return siret_siege === this[_.getObjectKey]("siret", obj);
        },
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
        direccte: "interactions",
        region: this[_.getNomenclatureValue].bind(
          this,
          "code_région",
          "code_region"
        ),
        code_region: obj => {
          return +this[_.getObjectKey]("code_region", obj) || 0;
        },
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
            return null;
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
        caractere_saisonnier: this[_.getNomenclatureValue].bind(
          this,
          "caractere_saisonnier",
          "code_car__saisonnier"
        ),
        caractere_auxiliaire: this[_.getNomenclatureValue].bind(
          this,
          "caractere_auxiliaire",
          "code_car__auxiliaire"
        ),
        accords: obj => {
          const sese = typeof obj.sese === "object" ? obj.sese : {};
          const intVal = val => +val || 0;
          return {
            nb_accords: intVal(sese.nb_accord),
            details: {
              "Épargne salariale": intVal(sese.obs1),
              "Salaires / rémunérations": intVal(sese.obs2),
              "Durée du travail / repos": intVal(sese.obs3),
              "Égalité professionnelle femmes-hommes": intVal(sese.obs4),
              "Droit syndical et représentation du personnel": intVal(
                sese.obs5
              ),
              "Emploi / GPEC": intVal(sese.obs6),
              "Conditions de travail": intVal(sese.obs7),
              "Prévoyance / protection sociale complémentaire": intVal(
                sese.obs8
              ),
              Autres: intVal(sese.obs9)
            }
          };
        },
        pole_competitivite: obj => {
          const sese = typeof obj.sese === "object" ? obj.sese : {};
          if (+sese.pole_compet) {
            const poles = [];
            for (let i = 1; i <= 10; i++) {
              const pole = sese[`pole${i}`];
              if (typeof pole === "string" && pole.trim().length) {
                poles.push(pole);
              }
            }
            return poles;
          }
          return undefined;
        },
        ea: obj => {
          const sese = obj.sese || {};
          return !!sese.ea
            ? {
                nb_postes_2017: +sese.nb_postes_2017
              }
            : undefined;
        },
        alternance: obj => {
          const sese = typeof obj.sese === "object" ? obj.sese : {};

          if (+sese.alternance) {
            return {
              apprentisage: +sese.appr_tot || 0,
              professionnalisation: +sese.ct_pro_tot || 0
            };
          }

          return undefined;
        },
        prime_embauche_pme: obj => {
          return +(obj.sese || {}).emb_pme;
        },
        marchand: obj => {
          const codeMarchand = obj.code_marchand;
          let codeMarchandStr = null;

          if (codeMarchand === "MARCH") {
            codeMarchandStr = "Marchand (MARCH)";
          } else if (codeMarchand === "NMPRI") {
            codeMarchandStr = "Non marchand, ressources du privé (NMPRI)";
          } else if (codeMarchand === "NMPUB") {
            codeMarchandStr = "Non marchand, ressources du public (NMPUB)";
          } else if (codeMarchand) {
            codeMarchandStr = `(${codeMarchand})`;
          }
          return codeMarchandStr;
        },
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
            obj.sese &&
            ("" + (obj.sese.eos_filiere || "")).replace("\n", " ").trim()
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

            if (yearKeys.length > 0) {
              yearKeys.sort((a, b) => a - b);

              return yearKeys.reduce((acp, year) => {
                return {
                  ...acp,
                  [year]: {
                    heures_demandees: +obj.sese[`acp_nbh_auto_${year}`] || null,
                    heures_consommees:
                      +obj.sese[`acp_nbh_conso_${year}`] || null
                  }
                };
              }, {});
            }
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

          return Object.keys(pse).length ? pse : null;
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
    return this[_.getCleanDate](key, obj);
  }

  [_.getCleanDate](key, obj) {
    return this[_.getObjectKey](key, obj);
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
      ""} ${obj.libelle_voie || obj.nom_voie || ""}
    ${obj.complement_adresse || ""}
    ${obj.cedex ? `(${obj.cedex})` : ""}
    ${obj.code_postal || ""}
    ${obj.libelle_commune || obj.localite || ""}
    `
      .trim()
      .split("\n")
      .map(l => l.trim())
      .filter(l => l.length)
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

    if (category === "caractere_saisonnier") {
      const table = { P: "Permanente", S: "Saisonnière", NR: "Non renseignée" };
      if (typeof val === "string" && table[val]) return table[val];
    }

    if (category === "caractere_auxiliaire") {
      const table = { P: "Auxiliaire", N: "Non auxiliaire" };
      if (typeof val === "string" && table[val]) return table[val];
    }

    return NomenclatureModel.findOneByCategoryAndCode(cat, val).then(
      nom => (nom && nom[nomKey]) || val
    );
  }

  async getSIREN(SIREN) {
    if (!validateSIREN(SIREN)) return {};

    const sirets = await EtablissementModel.findSIRETsBySIREN(SIREN);

    const etablissements = [];
    for (let i = 0; i < sirets.length; i++) {
      etablissements.push(await this.getSIRET(sirets[i]));
    }

    return {
      siren: SIREN,
      _ets: etablissements
    };
  }

  async search(query) {
    let mongo = null;

    try {
      mongo = await (typeof query === "object"
        ? EtablissementModel.findByAdvancedSearch(query)
        : EtablissementModel.findByRaisonSociale(query));
    } catch (exception) {
      console.error(`Mongo::search() failed : ${exception}`);
      return { error: true, message: exception };
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
