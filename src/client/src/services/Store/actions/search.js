import * as types from "../constants/ActionTypes";
import Http from "../../Http";

export const setTerm = (termKey, termValue) => (dispatch, getState) => {
  dispatch({
    type: types.SEARCH_SET_TERM,
    termKey,
    termValue
  });
};

export const search = (terms, page = 1) => (dispatch, getState) => {
  // Just in case, to prevent infinite recursion
  if (terms.csvURL) {
    delete terms.csvURL;
  }

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
