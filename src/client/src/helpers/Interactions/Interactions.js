import Moment from "../../services/Moment";
import _find from "lodash.find";
import _get from "lodash.get";
import { getLastDateInteraction, toI18nDate } from "../Date";
import Config from "../../services/Config/";

export const getLastInteraction = interactions => {
  const lastDateInteraction = getLastDateInteraction(
    interactions,
    "YYYY-MM-DD"
  );

  return _find(interactions, { date: lastDateInteraction });
};

/**
 * Get last interaction for one pole for each establishment
 * @constructor
 * @param {array} poleInteractions - List of interactions for one pole (T, C, 3E_SRC, 3E_SEER)
 * @param {array} establishments - List of current enterprise establishments
 * @returns {array}
 */
const getLastInteractionsBySiret = ({ poleInteractions, establishments }) => {
  const sortedPoleInteractions = poleInteractions
    .map(interaction => ({
      ...interaction,
      date: new Moment(interaction.date)
    }))
    .sort((a, b) => b.date - a.date);

  return sortedPoleInteractions.reduce(
    (lastInsteractions, currentInteraction) => {
      const isSiretAlreadyFind = lastInsteractions.find(
        interaction => interaction.siret === currentInteraction.siret
      );

      if (isSiretAlreadyFind) {
        return lastInsteractions;
      }

      const establishment = establishments.find(
        ({ siret }) => siret === currentInteraction.siret
      );

      const etatEtablissement = _get(establishment, "etat_etablissement");
      const codePostal = _get(establishment, "adresse_components.code_postal");
      const localite = _get(establishment, "adresse_components.localite");

      return [
        ...lastInsteractions,
        {
          siret: currentInteraction.siret,
          etat: etatEtablissement,
          commune: `${codePostal} ${localite}`,
          date: currentInteraction.date,
          pole: currentInteraction.pole
        }
      ];
    },
    []
  );
};

/**
 * Get last interaction for each pole for each establishment of the current enterprise
 * @param {object} enterprise - Current enterprise data from redux enterprise store
 * @param {string} type - "visit" or "control", list of poles defined in Config.js: "interactions.types"
 * @returns {array} - List of interactions, sorted in reverse chronological order
 */
const getEnterpriseInteractions = ({ enterprise, type }) =>
  Object.keys(enterprise)
    .filter(key => type.includes(key))
    .reduce(
      (enterpriseInteractions, currentKey) => [
        ...enterpriseInteractions,
        ...(enterprise[currentKey]
          ? getLastInteractionsBySiret({
              poleInteractions: enterprise[currentKey],
              establishments: enterprise.etablissements
            })
          : [])
      ],
      []
    )
    .sort((a, b) => b.date - a.date)
    .map(interaction => ({
      ...interaction,
      date: toI18nDate(interaction.date)
    }));

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

/**
 * Get number of establishments by removing duplicates SIRET (one establishment could have multiple interactions)
 * @param {array} interactions - List of all interactions for the current enterprise for one type: visit or control
 * @returns {number} - Count of distinct SIRET in one interaction type
 */
export const getNumberOfEstablishments = interactions =>
  [...new Set(interactions.map(interaction => interaction.siret))].length;
