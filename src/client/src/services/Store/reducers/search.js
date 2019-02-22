import {
  SEARCH_RESULTS,
  SEARCH_TERMS,
  SEARCH_NOMENCLATURES,
  RESET_STORE
} from "../constants/ActionTypes";
import Config from "../../Config";

const initialState = {
  results: [],
  terms: {
    siret: null,
    siren: null,
    raisonSociale: null,
    naf: null,
    commune: null,
    codePostal: null,
    departement: null,
    interactions: null,
    siegeSocial: null
  },
  nomenclatures: {
    polesInteractions: [],
    nafCodes: [],
    communes: [],
    postalCodes: [],
    departements: []
  }
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_RESULTS:
      return {
        ...state,
        results: flattenResults(action.results, state.terms)
      };
    case SEARCH_TERMS:
      return {
        ...state,
        terms: { ...initialState.terms, ...action.terms }
      };
    case SEARCH_NOMENCLATURES:
      return {
        ...state,
        nomenclatures: {
          ...initialState.nomenclatures,
          ...action.nomenclatures,
          updated_at: +new Date()
        }
      };
    case RESET_STORE:
      return {};

    default:
      return state;
  }
};

const flattenResults = (results, terms) => {
  if (!Array.isArray(results)) {
    return false;
  }

  let flattenResults = [];
  const interactionTerms = Array.isArray(terms.interactions)
    ? terms.interactions.map(interaction => interaction.value)
    : null;

  results.forEach(enterprise => {
    if (Array.isArray(enterprise.etablissements)) {
      enterprise.etablissements.forEach(establishment => {
        establishment = addCountInteractionsToEstablishment(
          establishment,
          interactionTerms
        );
        flattenResults.push({ ...enterprise, etablissement: establishment });
      });
    }
  });

  return flattenResults;
};

const addCountInteractionsToEstablishment = (
  establishment,
  interactionsTerms
) => {
  let interactions = {};
  let totalInteractions = {
    total: 0
  };

  Config.get("interactions").forEach(pole => {
    try {
      const interactionsPole = establishment[`interactions_${pole}`] || [];
      interactions[pole] = interactionsPole;
      totalInteractions[pole] = interactionsPole.length;

      if (!interactionsTerms || interactionsTerms.includes(pole)) {
        totalInteractions.total += interactionsPole.length;
      }
    } catch (e) {
      console.error(e);
      interactions[pole] = [];
      totalInteractions[pole] = 0;
    }
  });

  establishment.interactions = interactions;
  establishment.totalInteractions = totalInteractions;

  return establishment;
};

export default search;
