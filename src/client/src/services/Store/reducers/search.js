import {
  SET_SEARCH_TERM,
  SET_SEARCH_FILTERS,
  SET_SEARCH_SORT,
  SET_SEARCH_RESULTS,
  SET_SEARCH_IS_LOADING,
  SET_SEARCH_ERROR,
  RESET_SEARCH
} from "../constants/ActionTypes";
import Config from "../../Config";

const initialState = {
  term: "",
  filters: {
    naf: [],
    location: [],
    effectif: [],
    siege: null,
    state: Object.values(Config.get("establishmentState"))
  },
  sort: {
    field: null,
    ascDirection: false
  },
  results: null,
  resultsFilters: {
    naf: [],
    location: [],
    effectif: [],
    siege: null,
    state: Object.values(Config.get("establishmentState"))
  },
  isLoading: false,
  error: null
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return {
        ...state,
        term: action.term
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

    case SET_SEARCH_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };

    case SET_SEARCH_ERROR:
      return {
        ...state,
        error: action.error
      };

    case RESET_SEARCH:
      return initialState;

    default:
      return state;
  }
};

export default search;
