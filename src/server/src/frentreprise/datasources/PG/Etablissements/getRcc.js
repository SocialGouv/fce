import { getRupcoDataForEstablishment } from "../Helper";

export default async (SIRET, rupco) => {
  return rupco.getRCCBySIRET(SIRET).then((rows) => {
    if (!rows || !rows.length) {
      return {};
    }

    return {
      rcc: getRupcoDataForEstablishment(rows),
    };
  });
};
