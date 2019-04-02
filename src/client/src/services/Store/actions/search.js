import * as types from "../constants/ActionTypes";
import Http from "../../Http";
import Config from "../../Config";

export const search = (terms, page = 1) => (dispatch, getState) => {
  // Just in case, to prevent infinite recursion
  if (terms.csvURL) {
    delete terms.csvURL;
  }

  dispatch(
    _setTerms({
      ...terms,
      csvURL: Http.buildURL(`${Http.defaults.baseURL}/search.xlsx`, terms)
    })
  );

  return Http.get("/search", {
    params: {
      ...terms,
      page
    }
  })
    .then(function(response) {
      dispatch(
        _setSearchResponses(response.data.results, response.data.pagination)
      );

      let terms = {};

      if (response.data.query.isSIRET || response.data.query.isSIREN) {
        terms = {
          siren: response.data.results && response.data.results[0].siren
        };
        dispatch(
          _setTerms({
            ...terms,
            csvURL: Http.buildURL(`${Http.defaults.baseURL}/search.xlsx`, terms)
          })
        );
      }

      return Promise.resolve(response);
    })
    .catch(function(error) {
      return Promise.reject(error);
    });
};

export const resetSearch = () => (dispatch, getState) => {
  dispatch({
    type: types.SEARCH_RESET
  });
};

const _setSearchResponses = (results, pagination) => ({
  type: types.SEARCH_RESULTS,
  results,
  pagination
});

const _setTerms = terms => ({
  type: types.SEARCH_TERMS,
  terms
});
