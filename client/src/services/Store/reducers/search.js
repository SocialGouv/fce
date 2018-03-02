import {
  SEARCH_RESULTS,
  SEARCH_TERMS,
  SEARCH_NOMENCLATURES
} from "../constants/ActionTypes";

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
    nafCodes: [],
    communes: [],
    postalCodes: [],
    departements: []
  }
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_RESULTS:
      if (action.results) {
        action.results = action.results.map(result => {
          if (!result._dataSources) {
            result._dataSources = {};
          }
          return result;
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
    case SEARCH_NOMENCLATURES:
      return {
        ...state,
        nomenclatures: {
          ...initialState.nomenclatures,
          ...formatNomenclatures(action.nomenclatures)
        }
      };
    default:
      return state;
  }
};

const formatNomenclatures = nomenclatures => {
  if (nomenclatures.nafCodes && nomenclatures.nafCodes.length) {
    nomenclatures.nafCodes = nomenclatures.nafCodes.map(nafCode => {
      nafCode.text = `${nafCode.code} - ${nafCode.libelle}`;
      return nafCode;
    });
  }
  return nomenclatures;
};

export default search;
