import * as types from "../constants/ActionTypes";
import Http from "../../Http";

export const search = term => (dispatch, getState) => {
  dispatch(
    _setTerms({
      raisonSociale: term,
      csvURL: Http.buildURL(`${Http.defaults.baseURL}/search.csv`, {
        q: term
      })
    })
  );

  return Http.get("/search", {
    params: {
      q: term
    }
  })
    .then(function(response) {
      dispatch(_setSearchResponses(response.data.results));
      return Promise.resolve(response);
    })
    .catch(function(error) {
      return Promise.reject(error);
    });
};

export const advancedSearch = terms => (dispatch, getState) => {
  // Just in case, to prevent infinite recursion
  if (terms.csvURL) {
    delete terms.csvURL;
  }

  dispatch(
    _setTerms({
      ...terms,
      csvURL: Http.buildURL(
        `${Http.defaults.baseURL}/advancedSearch.csv`,
        terms
      )
    })
  );

  return Http.get("/advancedSearch", {
    params: {
      ...terms
    }
  })
    .then(function(response) {
      dispatch(_setSearchResponses(response.data.results));
      return Promise.resolve(response);
    })
    .catch(function(error) {
      return Promise.reject(error);
    });
};

export const getNomenclatures = terms => (dispatch, getState) => {
  dispatch(_setTerms(terms));

  return Http.get("/entities")
    .then(function(response) {
      dispatch(_setNomenclatures(response.data.results));
      return Promise.resolve(response);
    })
    .catch(function(error) {
      return Promise.reject(error);
    });
};

const _setSearchResponses = results => ({
  type: types.SEARCH_RESULTS,
  results
});

const _setNomenclatures = nomenclatures => ({
  type: types.SEARCH_NOMENCLATURES,
  nomenclatures
});

const _setTerms = terms => ({
  type: types.SEARCH_TERMS,
  terms
});
