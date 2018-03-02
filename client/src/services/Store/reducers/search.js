import { SEARCH_RESULTS, SEARCH_TERMS } from "../constants/ActionTypes";

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
  }
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_RESULTS:
      if (action.results) {
        action.results.map(result => {
          if (!result._dataSources) {
            result._dataSources = {};
          }
        });
      }
      return {
        ...state,
        results: action.results
      };
    case SEARCH_TERMS:
      return {
        ...state,
        terms: { ...initialState.terms, ...action.terms }
      };
    default:
      return state;
  }
};

export default search;
