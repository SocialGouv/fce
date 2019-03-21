export default async (SIRET, UcEff) => {
  return UcEff.getBySIRET(SIRET).then(ucEff => {
    if (!ucEff) {
      return null;
    }

    return {
      unite_controle_competente: getUniteControleCompetente(
        ucEff.cod_section,
        ucEff.nme_ddtefp3
      ),
      dernier_effectif_physique: ucEff.dereffphy,
      date_dernier_effectif_physique: getDateDernierEffectifPhysique(
        ucEff.date_effphy_et
      ),
      source_dernier_effectif_physique: null // integer in db
    };
  });
};

const getDateDernierEffectifPhysique = date => {
  try {
    const [day, month, year] = date.split("/");

    if (!day || !month || !year) {
      throw new Error("Invalid date");
    }

    return day && month && year ? `20${year}-${month}-${day}` : null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const getUniteControleCompetente = (section, departement) => {
  let ucc = section;

  if (departement) {
    ucc += ` (${departement})`;
  }

  return ucc;
};
