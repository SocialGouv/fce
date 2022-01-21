import * as types from "../constants/ActionTypes";

export const setSearchTerm = term => dispatch => {
  dispatch({
    type: types.SET_SEARCH_TERM,
    term
  });
};

export const setSearchPage = page => dispatch => {
  dispatch({
    type: types.SET_SEARCH_PAGE,
    page
  });
};

export const setSearchFilters = filters => dispatch => {
  dispatch({
    type: types.SET_SEARCH_FILTERS,
    filters
  });
};

export const setSearchResults = results => dispatch => {
  dispatch({
    type: types.SET_SEARCH_RESULTS,
    results
  });
};

export const resetSearch = () => dispatch => {
  dispatch({
    type: types.RESET_SEARCH
  });
};
