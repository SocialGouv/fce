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

export const getDistinctEstablishmentsSiret = interactions => [
  ...new Set(interactions.map(interaction => interaction.siret))
];

export const groupInteractionsBySiret = interactions =>
  getDistinctEstablishmentsSiret(interactions).reduce(
    (interactionsBySiret, currentSiret) => [
      ...interactionsBySiret,
      interactions.filter(({ siret }) => siret === currentSiret)
    ],
    []
  );

export const getEstablishmentsLastInteractions = interactions =>
  groupInteractionsBySiret(interactions).map(establishmentInteractions =>
    getLastInteraction(establishmentInteractions)
  );

/**
 * Get last interaction of each establishment of the current enterprise
 * @param {object} enterprise - Current enterprise data from redux enterprise store
 * @param {string} type - "visit" or "control", list of poles defined in Config.js: "interactions.types"
 * @returns {array} - List of interactions, sorted in reverse chronological order
 */
export const getEnterpriseInteractions = ({ enterprise, type }) => {
  const interactionsByType = Object.keys(enterprise)
    .filter(pole => type.includes(pole) && !!enterprise[pole])
    .reduce(
      (enterpriseInteractions, currentPole) => [
        ...enterpriseInteractions,
        ..._get(enterprise, currentPole)
      ],
      []
    );

  return interactionsByType
    ? getEstablishmentsLastInteractions(interactionsByType)
        .sort((a, b) => b.date.localeCompare(a.date))
        .map(interaction => {
          const etat = _get(interaction, "etablissement.etat_etablissement");
          const codePostal = _get(
            interaction,
            "etablissement.adresse_components.code_postal"
          );
          const localite = _get(
            interaction,
            "etablissement.adresse_components.localite"
          );

          return {
            siret: interaction.siret,
            etat,
            commune: `${codePostal ? codePostal : ""} ${
              localite ? localite : ""
            }`,
            date: toI18nDate(interaction.date),
            pole: interaction.pole
          };
        })
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
