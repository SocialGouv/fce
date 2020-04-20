import { getRangeDateToNow } from "../Date";
import Config from "../../services/Config";

export const isValidProcedureDuration = date =>
  getRangeDateToNow(date, "months") <= Config.get("pse.monthsProceduresLimit");

export const hasPse = establishment =>
  establishment && establishment.pse && establishment.pse.length;

export const hasPseValidsOrProbates = pseList =>
  pseList.validsOrProbates && !!pseList.validsOrProbates.length;

export const isInProcessState = pseState => pseState === "en_cours_procedure";
