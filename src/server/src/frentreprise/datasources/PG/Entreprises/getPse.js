import { getRupcoDataForEnterprise } from "../Helper";

export default async (SIREN, rupco) => {
  return rupco.getBySIREN(SIREN, rupco.TYPE_PSE).then((rows) => {
    if (!rows || !rows.length) {
      return {};
    }

    return {
      pse: getRupcoDataForEnterprise(rows),
    };
  });
};
