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
    naf: [],
    communes: [],
    postalCodes: [],
    departements: []
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
  if (nomenclatures.communes && nomenclatures.communes.length) {
    nomenclatures.communes = nomenclatures.communes.map(commune => {
      return commune && commune.libelle_commune;
    });
  }
  if (nomenclatures.departements && nomenclatures.departements.length) {
    nomenclatures.departements = nomenclatures.departements.map(departement => {
      return departement && departement.code_departement;
    });
  }
  if (nomenclatures.postalCodes && nomenclatures.postalCodes.length) {
    nomenclatures.postalCodes = nomenclatures.postalCodes.map(postalCode => {
      return postalCode && postalCode.code_postal;
    });
  }
  return nomenclatures;
};

export default search;
