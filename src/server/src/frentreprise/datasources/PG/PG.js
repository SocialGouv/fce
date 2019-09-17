import { DataSource } from "frentreprise";
import Etablissements from "./Etablissements";
import Entreprises from "./Entreprises";
import InteractionsPole3E from "../../../models/InteractionsPole3E";
import InteractionsPole3T from "../../../models/InteractionsPole3T";
import UcEff from "../../../models/UcEff";
import DsnEff from "../../../models/DsnEff";
import Idcc from "../../../models/Idcc";
import Accords from "../../../models/Accords";
import PolesCompetitivite from "../../../models/PolesCompetitivite";
import Iae from "../../../models/Iae";
import ContratsAides from "../../../models/ContratsAides";

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
      [Etablissements.getUcEff, new UcEff()],
      [Etablissements.getDsnEff, new DsnEff()],
      [Etablissements.getIdcc, new Idcc()],
      [Etablissements.getAccords, new Accords()],
      [Etablissements.getPolesCompetitivite, new PolesCompetitivite()],
      [Etablissements.getIae, new Iae()],
      [Etablissements.getContratsAides, new ContratsAides()]
    );
  }

  async getSIREN(SIREN) {
    return await this[_.requestDB](
      SIREN,
      [Entreprises.getInteractionsPole3E, new InteractionsPole3E()],
      [Entreprises.getInteractionsPole3T, new InteractionsPole3T()],
      [Entreprises.getAccords, new Accords()]
    );
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
