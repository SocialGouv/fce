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
    departement: null
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
        results: flattenResults(action.results)
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

const flattenResults = results => {
  if (!Array.isArray(results)) {
    return [];
  }

  let flattenResults = [];

  results.forEach(enterprise => {
    if (Array.isArray(enterprise.etablissements)) {
      enterprise.etablissements.forEach(establishment => {
        establishment = addCountInteractionsToEstablishment(establishment);
        flattenResults.push({ ...enterprise, etablissement: establishment });
      });
    }
  });

  return flattenResults;
};

const addCountInteractionsToEstablishment = establishment => {
  let interactions = {};
  Config.get("interactions").forEach(pole => {
    try {
      interactions[pole] = establishment.direccte.filter(
        interaction => interaction.pole === pole
      ).length;
    } catch (e) {
      if (Array.isArray(interactions[pole])) {
        console.error(e);
      }
      interactions[pole] = 0;
    }
  });

  establishment.interactions = interactions;
  return establishment;
};

export default search;
