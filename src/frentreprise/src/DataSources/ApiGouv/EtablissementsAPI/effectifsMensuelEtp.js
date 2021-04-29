import { getEffectifsMensuel } from "../helpers/effectifsEtp";

export default async (siret, Axios, params) =>
  await getEffectifsMensuel(Axios, params, "etablissement", siret);
