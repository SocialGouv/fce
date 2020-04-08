export default async (SIRET, Idcc) => {
  return Idcc.getBySIRET(SIRET).then((idcc_list) => {
    if (!idcc_list) {
      return null;
    }

    return { idcc_list };
  });
};
