import {
  SEARCH_RESULTS,
  SEARCH_TERMS,
  SEARCH_NOMENCLATURES,
  RESET_STORE
} from "../constants/ActionTypes";
import Moment from "../../Moment";

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
        establishment.date_debut_activite_economique_timestamp = null;
        try {
          establishment.date_debut_activite_economique_timestamp = Moment(
            establishment.date_debut_activite_economique,
            "DD/MM/YYYY"
          ).unix();
        } catch (e) {
          console.debug(e);
        }

        flattenResults.push({ ...enterprise, etablissement: establishment });
      });
    }
  });

  return flattenResults.sort(sortByDateDebutActiviteDesc);
};

const sortByDateDebutActiviteDesc = (a, b) => {
  return (
    b.etablissement.date_debut_activite_economique_timestamp -
    a.etablissement.date_debut_activite_economique_timestamp
  );
};

export default search;
