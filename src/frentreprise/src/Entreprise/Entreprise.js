import BaseModel, { _protected } from "./BaseModel";
import Etablissement from ".";
import { validateSIRET } from "../Utils/Validator";
import { cleanObject } from "../Utils";

const _ets = Symbol("_ets");
const _etsModel = Symbol("_etsModel");

export default class Entreprise extends BaseModel {
  constructor(data, etsModel = Etablissement) {
    super();
    this[_ets] = [];
    this[_etsModel] = etsModel;
    this.replaceData(data);
  }

  [_protected._importData](data, replace) {
    const entData = { ...data };
    let ets = entData["_ets"];

    if (ets) {
      if (!Array.isArray(ets)) {
        ets = [ets];
      }

      ets.forEach((etsData) => {
        if (etsData && typeof etsData === "object") {
          if (validateSIRET(etsData.siret)) {
            this.getEtablissement(etsData.siret).updateData(
              cleanObject(etsData)
            );
          }
        }
      });

      delete entData._ets;
    }

    super[_protected._importData](entData, replace);
  }

  /**
   * Get the Etablissements
   * @returns {Array[Etablissement]} Etablissements
   */
  get etablissements() {
    return this[_ets];
  }

  /**
   * Returns if the Etablissement exists
   * @returns {boolean} true if the Etablissement exists
   */
  hasEtablissement(SIRET) {
    return !!this.getEtablissement(SIRET, false);
  }

  /**
   * Returns the Etablissement with the given SIRET
   * @param {string} SIRET
   * @param {boolean} createIfMissing If set to true, the function will create the Etablissement if it is not existing
   * @returns {(Etablissement|null)} Etablissement with given SIRET or null if not created upon missing
   */
  getEtablissement(SIRET, createIfMissing = true) {
    return (
      this[_ets].find((ets) => ets.siret === SIRET) || // Search for SIRET
      (createIfMissing && // If not present create it
      this[_ets].push(new this[_etsModel]({ siret: SIRET }, this)) && // Add it to our list
        this.getEtablissement(SIRET)) || // Call back itself to get created model
      null
    );
  }
}
