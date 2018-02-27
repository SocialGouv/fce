import BaseModel from "./BaseModel";

const _ets = Symbol("_ets");

export default class Entreprise extends BaseModel {
  constructor(data) {
    super(data);
    this[_ets] = [];
  }

  get etablissements() {
    return [...this[_ets]];
  }

  importEtablissement(etablissement) {
    this[_ets].push(etablissement);
  }
}
