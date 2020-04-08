import { getRupcoDataForEstablishment } from "../Helper";

export default async (SIRET, rupco) => {
  return rupco.getBySIRET(SIRET, rupco.TYPE_RCC).then((rows) => {
    if (!rows || !rows.length) {
      return {};
    }

    return {
      rcc: getRupcoDataForEstablishment(rows),
    };
  });
};
