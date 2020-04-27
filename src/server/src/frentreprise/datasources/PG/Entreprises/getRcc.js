import { getRupcoDataForEnterprise } from "../Helper";

export default async (SIREN, rupco) => {
  return rupco.getRCCBySIREN(SIREN).then((rows) => {
    if (!rows || !rows.length) {
      return {};
    }

    return {
      rcc: getRupcoDataForEnterprise(rows),
    };
  });
};
