import { getEffectifsMensuel } from "../helpers/effectifsEtp";

export default async (siren, Axios, params) =>
  await getEffectifsMensuel(Axios, params, "entreprise", siren);
