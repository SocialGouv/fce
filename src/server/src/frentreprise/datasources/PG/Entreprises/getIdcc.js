export default async (SIREN, Idcc) => {
  return Idcc.getBySIREN(SIREN).then((idcc_list) => {
    if (!idcc_list) {
      return null;
    }

    return { idcc_list };
  });
};
