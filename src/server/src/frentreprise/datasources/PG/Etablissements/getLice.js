import { getRupcoDataForEstablishment } from "../Helper";

export default async (SIRET, rupco) => {
  return rupco.getLiceBySIRET(SIRET).then((rows) => {
    if (!rows || !rows.length) {
      return {};
    }

    return {
      lice: getRupcoDataForEstablishment(rows),
    };
  });
};
