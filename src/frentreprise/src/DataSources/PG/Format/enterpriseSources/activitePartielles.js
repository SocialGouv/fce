import { getFormatedDate } from "../../Helpers";

export default ({ activitePartielles }) => {
  const activitePartielleBySiret = activitePartielles.reduce(
    (
      activitesPartielles,
      {
        siret,
        num_convention,
        date_decision,
        nb_h_auto_cum,
        nb_h_conso_cum,
        cause,
      }
    ) => {
      if (!Object.prototype.hasOwnProperty.call(activitesPartielles, siret)) {
        activitesPartielles[siret] = {};
      }

      if (
        !Object.prototype.hasOwnProperty.call(
          activitesPartielles,
          num_convention
        )
      ) {
        activitesPartielles[siret][num_convention] = {
          numConvention: num_convention,
          nbAvenants: 0,
          date: getFormatedDate(date_decision),
          nbHeuresAutorisees: nb_h_auto_cum,
          nbHeuresConsommees: nb_h_conso_cum,
          motif: cause,
        };

        return activitesPartielles;
      }

      activitesPartielles[siret][num_convention].nbAvenants++;
      activitesPartielles[siret][
        num_convention
      ].nbHeuresAutorisees = nb_h_auto_cum;

      return activitesPartielles;
    },
    {}
  );

  const activitePartielle = Object.entries(activitePartielleBySiret).map(
    ([siret, activitesPartiellesEtab]) => {
      const { nbHeuresAutorisees, nbHeuresConsommees, date } = Object.values(
        activitesPartiellesEtab
      ).reduce(
        (
          activitePartielleEtab,
          { nbHeuresAutorisees, nbHeuresConsommees, date }
        ) => {
          activitePartielleEtab.nbHeuresAutorisees += parseFloat(
            nbHeuresAutorisees
          );
          activitePartielleEtab.nbHeuresConsommees += parseFloat(
            nbHeuresConsommees
          );

          if (
            !activitePartielleEtab.date ||
            activitePartielleEtab.date < date
          ) {
            activitePartielleEtab.date = date;
          }

          return activitePartielleEtab;
        },
        { nbHeuresAutorisees: 0, nbHeuresConsommees: 0, date: null }
      );

      return {
        siret,
        nbHeuresAutorisees,
        nbHeuresConsommees,
        date,
      };
    }
  );

  return { activite_partielle: activitePartielle };
};
