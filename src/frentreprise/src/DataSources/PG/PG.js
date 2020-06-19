import DataSource from "../DataSource";
import Siren from "./Siren";
import Siret from "./Siret";
import search from "./Search";

export const _ = {
  requestPG: Symbol("_requestPG"),
};

export default class SirenePG extends DataSource {
  // Etablissements
  async getSIRET(SIRET) {
    return await this[_.requestPG](SIRET, Siret.getSettlement);
  }

  // Entreprises
  async getSIREN(SIREN) {
    return await this[_.requestPG](
      SIREN,
      Siren.getEntreprise,
      Siret.getSettlements
    );
  }

  async search(terms, page) {
    return await search(terms, page, this.db);
  }

  async [_.requestPG](identifier, ...dbCalls) {
    let out = {};
    const requests = dbCalls
      .filter((fn) => typeof fn === "function")
      .map(async (fn) => {
        return fn(identifier, this.db);
      });

    await Promise.all(requests).then((results) => {
      Object.assign(out, ...results);
    });

    return out;
  }
}
