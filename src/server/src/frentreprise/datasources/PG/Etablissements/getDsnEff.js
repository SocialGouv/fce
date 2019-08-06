export default async (SIRET, DsnEff) => {
  return DsnEff.getBySIRET(SIRET).then(dsnEff => {
    if (!dsnEff) {
      return null;
    }

    return {
      dernier_effectif_physique: dsnEff.eff,
      date_dernier_effectif_physique: dsnEff.mois,
      source_dernier_effectif_physique: null // integer in db
    };
  });
};
