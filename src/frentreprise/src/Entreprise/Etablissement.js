import BaseModel, { _protected } from "./BaseModel";
import { cleanObject } from "../Utils";

const _entreprise = Symbol("_entreprise");

export default class Etablissement extends BaseModel {
  constructor(data, entreprise) {
    super();
    this[_entreprise] = entreprise;
    this.replaceData(data);
  }

  [_protected._importData](data) {
    if (this[_entreprise]) {
      const etData = data && data["_etData"];
      if (etData && typeof etData === "object") {
        this[_entreprise].updateData(cleanObject(etData));
        // Merge datasources since we used our data source to get datas
        this[_entreprise].updateData({
          _dataSources: {
            ...this[_entreprise]._dataSources,
            ...data._dataSources
          }
        });
        delete data._etData;
      }
    }

    super[_protected._importData](data);
  }
}
