import { groupBy, map, pipe, reduce, values } from "lodash/fp";

export const getLatestUpdate = reduce((acc, activitePartielle) =>
  acc.date_decision && acc.date_decision > activitePartielle.date_decision
    ? acc
    : activitePartielle
)({});

const addAllConventions = reduce((acc, activitePartielle) => ({
  ...activitePartielle,
  ...acc,
  nb_h_auto_cum: acc.nb_h_auto_cum + activitePartielle.nb_h_auto_cum,
  nb_h_conso_cum: acc.nb_h_conso_cum + activitePartielle.nb_h_conso_cum,
}))({ nb_h_auto_cum: 0, nb_h_conso_cum: 0 });

export const getCumulatedValuesForEstablishment = pipe(
  groupBy("num_convention"),
  values,
  map(getLatestUpdate),
  addAllConventions
);

export const formatActivitePartielle = pipe(
  groupBy("siret"),
  values,
  map(getCumulatedValuesForEstablishment)
);

export const getTotalValues = reduce(
  (sum, { nb_h_auto_cum, nb_h_conso_cum }) => ({
    nb_h_auto_cum: nb_h_auto_cum + sum.nb_h_auto_cum,
    nb_h_conso_cum: nb_h_conso_cum + sum.nb_h_conso_cum,
  })
)({ nb_h_auto_cum: 0, nb_h_conso_cum: 0 });
