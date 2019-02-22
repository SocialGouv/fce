import {
  SEARCH_RESULTS,
  SEARCH_TERMS,
  SEARCH_NOMENCLATURES,
  RESET_STORE
} from "../constants/ActionTypes";
import addInteractionsToEstablishment from "../utils/addInteractionsToEstablishment";

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
        establishment = addInteractionsToEstablishment(
          establishment,
          interactionTerms
        );
        flattenResults.push({ ...enterprise, etablissement: establishment });
      });
    }
  });

  return flattenResults;
};

export default search;
