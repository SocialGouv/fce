export default async (SIRET, UcEff) => {
  return UcEff.getBySIRET(SIRET).then(ucEff => {
    if (!ucEff) {
      return null;
    }

    return {
      unite_controle_competente: getUniteControleCompetente(
        ucEff.cod_section,
        ucEff.nme_ddtefp3
      )
    };
  });
};

const getUniteControleCompetente = (section, departement) => {
  let ucc = section;

  if (departement) {
    ucc += ` (${departement})`;
  }

  return ucc;
};
