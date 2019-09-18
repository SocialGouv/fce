export default async (siren, ActivitePartielle) => {
  return ActivitePartielle.getBySiren(siren).then(activitesPartielles => {
    if (!activitesPartielles || !activitesPartielles.length) {
      return {};
    }

    const activitePartielle = [];

    return { activite_partielle: activitePartielle };
  });
};
