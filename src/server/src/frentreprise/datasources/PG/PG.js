import { DataSource } from "frentreprise";
import Etablissements from "./Etablissements";
import InteractionsPole3E from "../../../models/InteractionsPole3E";
import InteractionsPole3T from "../../../models/InteractionsPole3T";
import UcEff from "../../../models/UcEff";

export const _ = {
  requestDB: Symbol("_requestDB")
};

export default class PG extends DataSource {
  // Etablissements
  async getSIRET(SIRET) {
    return await this[_.requestDB](
      SIRET,
      [Etablissements.getInteractionsPole3E, new InteractionsPole3E()],
      [Etablissements.getInteractionsPole3T, new InteractionsPole3T()],
      [Etablissements.getUcEff, new UcEff()]
    );
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
      .filter(dbCall => typeof dbCall[0] === "function")
      .map(dbCall => {
        const [fn, Model] = dbCall;
        return fn(identifier, Model);
      });

    await Promise.all(requests).then(results => {
      Object.assign(out, ...results);
    });

    return out;
  }
}
