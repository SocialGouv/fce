import _find from "lodash.find";
import _get from "lodash.get";
import { getLastDateInteraction, toI18nDate } from "../Date";
import Config from "../../services/Config";

export const getLastInteraction = interactions => {
  const lastDateInteraction = getLastDateInteraction(
    interactions,
    "YYYY-MM-DD"
  );

  return _find(interactions, { date: lastDateInteraction });
};

export const getDistinctEstablishments = interactions => [
  ...new Set(interactions.map(interaction => interaction.siret))
];

export const getNumberOfEstablishments = interactions =>
  getDistinctEstablishments(interactions).length;

export const getInteractionsBySiret = (interactions, establishments) =>
  getDistinctEstablishments(interactions).reduce(
    (interactionsBySiret, currentSiret) => {
      const establishment = establishments.find(
        ({ siret }) => siret === currentSiret
      );

      const etat = _get(establishment, "etat_etablissement");
      const codePostal = _get(establishment, "adresse_components.code_postal");
      const localite = _get(establishment, "adresse_components.localite");

      return [
        ...interactionsBySiret,
        interactions
          .filter(({ siret }) => siret === currentSiret)
          .map(interaction => ({
            siret: interaction.siret,
            etat,
            commune: `${codePostal} ${localite}`,
            date: interaction.date,
            pole: interaction.pole
          }))
      ];
    },
    []
  );

export const getEstablishmentsLastInteractions = (
  interactions = [],
  establishments
) =>
  getInteractionsBySiret(
    interactions,
    establishments
  ).map(establishmentInteractions =>
    getLastInteraction(establishmentInteractions)
  );

/**
 * Get last interaction of each establishment of the current enterprise
 * @param {object} enterprise - Current enterprise data from redux enterprise store
 * @param {string} type - "visit" or "control", list of poles defined in Config.js: "interactions.types"
 * @returns {array} - List of interactions, sorted in reverse chronological order
 */
const getEnterpriseInteractions = ({ enterprise, type }) => {
  const interactionsByType = Object.keys(enterprise)
    .filter(pole => type.includes(pole) && !!enterprise[pole])
    .reduce(
      (enterpriseInteractions, currentPole) => [
        ...enterpriseInteractions,
        ...getEstablishmentsLastInteractions(
          _get(enterprise, currentPole),
          enterprise.etablissements
        )
      ],
      []
    );

  return interactionsByType
    ? interactionsByType
        .sort((a, b) => b.date.localeCompare(a.date))
        .map(interaction => ({
          ...interaction,
          date: toI18nDate(interaction.date)
        }))
    : null;
};

export const getEnterpriseControls = enterprise =>
  getEnterpriseInteractions({
    enterprise,
    type: Config.get("interactions.types.control")
  });

export const getEnterpriseVisits = enterprise =>
  getEnterpriseInteractions({
    enterprise,
    type: Config.get("interactions.types.visit")
  });
