import { getRupcoDataForEnterprise } from "../Helper";

export default async (SIREN, rupco) => {
  return rupco.getBySIREN(SIREN, rupco.TYPE_LICE).then((rows) => {
    if (!rows || !rows.length) {
      return {};
    }

    return {
      lice: getRupcoDataForEnterprise(rows),
    };
  });
};
