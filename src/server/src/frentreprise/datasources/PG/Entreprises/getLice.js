import { getRupcoDataForEnterprise } from "../Helper";

export default async (SIREN, rupco) => {
  return rupco.getLiceBySIREN(SIREN).then((rows) => {
    if (!rows || !rows.length) {
      return {};
    }

    return {
      lice: getRupcoDataForEnterprise(rows),
    };
  });
};
