export default async (SIRET, ActivitePartielle) => {
  return ActivitePartielle.getBySIRET(SIRET).then(activitesPartielles => {
    if (!activitesPartielles || !activitesPartielles.length) {
      return {};
    }

    const activitePartielle = activitesPartielles.reduce(
      (
        activitesPartielles,
        { num_convention, date_decision, nb_h_auto_cum, nb_h_conso_cum, cause }
      ) => {
        if (!activitesPartielles.hasOwnProperty(num_convention)) {
          activitesPartielles[num_convention] = {
            numConvention: num_convention,
            nbAvenants: 0,
            date: date_decision,
            nbHeuresAutorisees: nb_h_auto_cum,
            nbHeuresConsommees: nb_h_conso_cum,
            motif: cause
          };

          return activitesPartielles;
        }

        activitesPartielles[num_convention].nbAvenants++;
        activitesPartielles[num_convention].nbHeuresAutorisees = nb_h_auto_cum;

        return activitesPartielles;
      },
      {}
    );

    return { activite_partielle: Object.values(activitePartielle) };
  });
};
