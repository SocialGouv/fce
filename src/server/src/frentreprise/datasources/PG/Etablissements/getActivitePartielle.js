export default async (SIRET, ActivitePartielle) => {
  return ActivitePartielle.getBySIRET(SIRET).then(activitesPartielles => {
    if (!activitesPartielles || !activitesPartielles.length) {
      return {};
    }

    const activitePartielle = [];

    return { activite_partielle: activitePartielle };
  });
};
