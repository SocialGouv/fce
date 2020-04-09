import { getRupcoDataForEstablishment } from "../Helper";

export default async (SIRET, rupco) => {
  return rupco.getPSEBySIRET(SIRET).then((rows) => {
    if (!rows || !rows.length) {
      return {};
    }

    return {
      pse: getRupcoDataForEstablishment(rows),
    };
  });
};
