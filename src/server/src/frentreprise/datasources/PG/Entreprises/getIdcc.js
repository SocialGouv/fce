export default async (SIREN, Idcc) => {
  return Idcc.getBySIREN(SIREN).then((idcc) => {
    if (!idcc || !idcc.length) {
      return [];
    }

    return { idcc };
  });
};
