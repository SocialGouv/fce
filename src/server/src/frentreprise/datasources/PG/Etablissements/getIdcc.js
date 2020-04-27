export default async (SIRET, Idcc) => {
  return Idcc.getBySIRET(SIRET).then((idcc) => {
    if (!idcc || !idcc.length) {
      return [];
    }

    return { idcc };
  });
};
