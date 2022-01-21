import {
  SET_SEARCH_TERM,
  SET_SEARCH_FILTERS,
  SET_SEARCH_SORT,
  SET_SEARCH_RESULTS,
  RESET_SEARCH,
  SET_SEARCH_PAGE
} from "../constants/ActionTypes";

const initialState = {
  term: "",
  page: 1,
  filters: {
    etats: ["A", "F"]
  },
  sort: {
    field: null,
    ascDirection: false
  },
  results: {
    results: null,
    total: 0
  }
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return {
        ...state,
        term: action.term
      };

    case SET_SEARCH_PAGE:
      return {
        ...state,
        page: action.page
      };

    case SET_SEARCH_FILTERS:
      return {
        ...state,
        filters: action.filters
      };

    case SET_SEARCH_SORT:
      return {
        ...state,
        sort: action.sort
      };

    case SET_SEARCH_RESULTS:
      return {
        ...state,
        results: action.results
      };

    case RESET_SEARCH:
      return initialState;

    default:
      return state;
  }
};

export default search;
