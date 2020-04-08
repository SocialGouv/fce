import { getRupcoDataForEstablishment } from "../Helper";

export default async (SIRET, rupco) => {
  return rupco.getBySIRET(SIRET, rupco.TYPE_PSE).then((rows) => {
    if (!rows || !rows.length) {
      return {};
    }

    return {
      pse: getRupcoDataForEstablishment(rows),
    };
  });
};
