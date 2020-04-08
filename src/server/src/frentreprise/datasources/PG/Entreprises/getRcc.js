import { getRupcoDataForEnterprise } from "../Helper";

export default async (SIREN, rupco) => {
  return rupco.getBySIREN(SIREN, rupco.TYPE_RCC).then((rows) => {
    if (!rows || !rows.length) {
      return {};
    }

    return {
      rcc: getRupcoDataForEnterprise(rows),
    };
  });
};
