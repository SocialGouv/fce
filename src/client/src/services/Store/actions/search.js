import * as types from "../constants/ActionTypes";

export const setSearchTerm = (term) => (dispatch) => {
  dispatch({
    term,
    type: types.SET_SEARCH_TERM,
  });
};
export const setSearchSortOrder = (sortOrder) => (dispatch) => {
  dispatch({
    sortOrder,
    type: types.SET_SEARCH_SORT_ORDER,
  });
};
export const setSearchSortField = (sortField) => (dispatch) => {
  dispatch({
    sortField,
    type: types.SET_SEARCH_SORT_FIELD,
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

export const resetSort = () => (dispatch) => {
  dispatch({
    type: types.RESET_SORT,
  });
};
