const CODE_SANS_CONVENTION_COLLECTIVE = "9999";

export default ({ idccs }) => {
  const idccList = idccs
    .filter(
      ({ idcc, idccDefinition }) =>
        idcc !== CODE_SANS_CONVENTION_COLLECTIVE && idccDefinition
    )
    .map(({ idccDefinition: { code, libelle } }) => ({
      code,
      libelle,
    }));

  return { idcc: idccList };
};
