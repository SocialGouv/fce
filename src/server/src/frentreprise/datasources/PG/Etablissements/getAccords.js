export default async (SIRET, Accords) => {
  return Accords.getBySIRET(SIRET).then(accords => {
    if (!accords) {
      return null;
    }

    return { accords };
  });
};
