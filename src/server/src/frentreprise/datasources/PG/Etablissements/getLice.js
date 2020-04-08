import { getRupcoDataForEstablishment } from "../Helper";

export default async (SIRET, rupco) => {
  return rupco.getBySIRET(SIRET, rupco.TYPE_LICE).then((rows) => {
    if (!rows || !rows.length) {
      return {};
    }

    return {
      lice: getRupcoDataForEstablishment(rows),
    };
  });
};
