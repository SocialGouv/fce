// eslint-disable-next-line node/no-missing-import
import { DataSource } from "frentreprise";
import Etablissements from "./Etablissements";
import Entreprises from "./Entreprises";
import InteractionsPole3E from "../../../models/InteractionsPole3E";
import InteractionsPoleT from "../../../models/InteractionsPoleT";
import UcEff from "../../../models/UcEff";
import DsnEff from "../../../models/DsnEff";
import Idcc from "../../../models/Idcc";
import Accords from "../../../models/Accords";
import ActivitePartielle from "../../../models/ActivitePartielle";
import Pse from "../../../models/Pse";
import PolesCompetitivite from "../../../models/PolesCompetitivite";
import Iae from "../../../models/Iae";
import ContratsAides from "../../../models/ContratsAides";
import Successions from "../../../models/Successions";

export const _ = {
  requestDB: Symbol("_requestDB")
};

export default class PG extends DataSource {
  // Etablissements
  async getSIRET(SIRET) {
    return await this[_.requestDB](
      SIRET,
      [Etablissements.getInteractionsPole3E, new InteractionsPole3E()],
      [Etablissements.getInteractionsPoleT, new InteractionsPoleT()],
      [Etablissements.getUcEff, new UcEff()],
      [Etablissements.getDsnEff, new DsnEff()],
      [Etablissements.getIdcc, new Idcc()],
      [Etablissements.getAccords, new Accords()],
      [Etablissements.getPolesCompetitivite, new PolesCompetitivite()],
      [Etablissements.getIae, new Iae()],
      [Etablissements.getContratsAides, new ContratsAides()],
      [Etablissements.getActivitePartielle, new ActivitePartielle()],
      [Etablissements.getPse, new Pse()],
      [Etablissements.getPredecesseur, new Successions()],
      [Etablissements.getSuccesseur, new Successions()]
    );
  }

  async getSIREN(SIREN) {
    return await this[_.requestDB](
      SIREN,
      [Entreprises.getInteractionsPole3E, new InteractionsPole3E()],
      [Entreprises.getInteractionsPoleT, new InteractionsPoleT()],
      [Entreprises.getAccords, new Accords()],
      [Entreprises.getActivitePartielle, new ActivitePartielle()],
      [Entreprises.getPseList, new Pse()]
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
