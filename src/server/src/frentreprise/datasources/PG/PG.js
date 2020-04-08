// eslint-disable-next-line node/no-missing-import
import { DataSource } from "frentreprise";
import Etablissements from "./Etablissements";
import Entreprises from "./Entreprises";
import InteractionsPole3ESEER from "../../../models/InteractionsPole3ESEER";
import InteractionsPole3ESRC from "../../../models/InteractionsPole3ESRC";
import InteractionsPoleT from "../../../models/InteractionsPoleT";
import UcEff from "../../../models/UcEff";
import DsnEff from "../../../models/DsnEff";
import Idcc from "../../../models/Idcc";
import Accords from "../../../models/Accords";
import ActivitePartielle from "../../../models/ActivitePartielle";
import Rupco from "../../../models/Rupco";
import PolesCompetitivite from "../../../models/PolesCompetitivite";
import Iae from "../../../models/Iae";
import ContratsAides from "../../../models/ContratsAides";
import Successions from "../../../models/Successions";

export const _ = {
  requestDB: Symbol("_requestDB"),
};

export default class PG extends DataSource {
  // Etablissements
  async getSIRET(SIRET) {
    return await this[_.requestDB](
      SIRET,
      [Etablissements.getInteractionsPole3ESEER, new InteractionsPole3ESEER()],
      [Etablissements.getInteractionsPole3ESRC, new InteractionsPole3ESRC()],
      [Etablissements.getInteractionsPoleT, new InteractionsPoleT()],
      [Etablissements.getUcEff, new UcEff()],
      [Etablissements.getDsnEff, new DsnEff()],
      [Etablissements.getIdcc, new Idcc()],
      [Etablissements.getAccords, new Accords()],
      [Etablissements.getPolesCompetitivite, new PolesCompetitivite()],
      [Etablissements.getIae, new Iae()],
      [Etablissements.getContratsAides, new ContratsAides()],
      [Etablissements.getActivitePartielle, new ActivitePartielle()],
      [Etablissements.getPse, new Rupco()],
      [Etablissements.getLice, new Rupco()],
      [Etablissements.getRcc, new Rupco()],
      [Etablissements.getPredecesseur, new Successions()],
      [Etablissements.getSuccesseur, new Successions()]
    );
  }

  async getSIREN(SIREN) {
    return await this[_.requestDB](
      SIREN,
      [Entreprises.getInteractionsPole3ESEER, new InteractionsPole3ESEER()],
      [Entreprises.getInteractionsPole3ESRC, new InteractionsPole3ESRC()],
      [Entreprises.getInteractionsPoleT, new InteractionsPoleT()],
      [Entreprises.getAccords, new Accords()],
      [Entreprises.getActivitePartielle, new ActivitePartielle()],
      [Entreprises.getPse, new Rupco()],
      [Entreprises.getLice, new Rupco()],
      [Entreprises.getRcc, new Rupco()]
    );
  }

  async search() {
    return false;
  }

  async [_.requestDB](identifier, ...dbCalls) {
    let out = {};

    const requests = dbCalls
      .filter((dbCall) => typeof dbCall[0] === "function")
      .map((dbCall) => {
        const [fn, Model] = dbCall;
        return fn(identifier, Model);
      });

    await Promise.all(requests).then((results) => {
      Object.assign(out, ...results);
    });

    return out;
  }
}
