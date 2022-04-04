import * as types from "../constants/ActionTypes";

export const setSearchTerm = (term) => (dispatch) => {
  dispatch({
    term,
    type: types.SET_SEARCH_TERM,
  });
};

export const setSearchPage = (page) => (dispatch) => {
  dispatch({
    page,
    type: types.SET_SEARCH_PAGE,
  });
};

export const setSearchFilters = (filters) => (dispatch) => {
  dispatch({
    filters,
    type: types.SET_SEARCH_FILTERS,
  });
};

export const setSearchResults = (results) => (dispatch) => {
  dispatch({
    results,
    type: types.SET_SEARCH_RESULTS,
  });
};

export const resetSearch = () => (dispatch) => {
  dispatch({
    type: types.RESET_SEARCH,
  });
};
