import _orderBy from "lodash.orderby";
import { getFormatedDate } from "../../Helpers";

export default ({ activitePartielles }) => {
  const activitePartielle = _orderBy(
    activitePartielles,
    ["dataValues.date_decision", "dataValues.num_avenant"],
    ["asc", "asc"]
  ).reduce(
    (
      activitesPartielles,
      { num_convention, date_decision, nb_h_auto_cum, nb_h_conso_cum, cause }
    ) => {
      if (
        !Object.prototype.hasOwnProperty.call(
          activitesPartielles,
          num_convention
        )
      ) {
        activitesPartielles[num_convention] = {
          numConvention: num_convention,
          nbAvenants: 0,
          date: getFormatedDate(date_decision),
          nbHeuresAutorisees: nb_h_auto_cum,
          nbHeuresConsommees: nb_h_conso_cum,
          motif: cause,
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
};
