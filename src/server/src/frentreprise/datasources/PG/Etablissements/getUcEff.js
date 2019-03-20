export default async (SIRET, UcEff) => {
  return UcEff.getBySIRET(SIRET).then(ucEff => {
    if (!ucEff) {
      return null;
    }

    return {};
  });
};
