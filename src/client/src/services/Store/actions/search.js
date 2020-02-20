import * as types from "../constants/ActionTypes";

export const setSearchTerm = term => dispatch => {
  dispatch({
    type: types.SET_SEARCH_TERM,
    term
  });
};

export const setSearchFilters = filters => dispatch => {
  dispatch({
    type: types.SET_SEARCH_FILTERS,
    filters
  });
};

export const setSearchSort = sort => dispatch => {
  return dispatch({
    type: types.SET_SEARCH_SORT,
    sort
  });
};

export const setSearchResults = results => dispatch => {
  dispatch({
    type: types.SET_SEARCH_RESULTS,
    results
  });
};

export const setSearchIsLoading = isLoading => dispatch => {
  dispatch({
    type: types.SET_SEARCH_IS_LOADING,
    isLoading
  });
};

export const setSearchError = error => dispatch => {
  dispatch({
    type: types.SET_SEARCH_ERROR,
    error
  });
};

export const resetSearch = () => dispatch => {
  dispatch({
    type: types.RESET_SEARCH
  });
};
