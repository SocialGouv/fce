import { DataSource } from "frentreprise";
import Etablissements from "./Etablissements";

export const _ = {
  requestDB: Symbol("_requestDB")
};

export default class PG extends DataSource {
  // Etablissements
  async getSIRET(SIRET) {
    return await this[_.requestDB](SIRET, Etablissements.getInteractionsPole3E);
  }

  async getSIREN(SIREN) {
    return false;
  }

  async search() {
    return false;
  }

  async [_.requestDB](identifier, ...dbCalls) {
    let out = {};

    const requests = dbCalls
      .filter(fn => typeof fn === "function")
      .map(fn => {
        return fn(identifier);
      });

    await Promise.all(requests).then(results => {
      Object.assign(out, ...results);
    });

    return out;
  }
}
