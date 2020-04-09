import { getRupcoDataForEnterprise } from "../Helper";

export default async (SIREN, rupco) => {
  return rupco.getPSEBySIREN(SIREN).then((rows) => {
    if (!rows || !rows.length) {
      return {};
    }

    return {
      pse: getRupcoDataForEnterprise(rows),
    };
  });
};
