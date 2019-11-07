import {
  SET_SEARCH_TERM,
  SET_SEARCH_FILTERS,
  SET_SEARCH_RESULTS,
  SET_SEARCH_IS_LOADING,
  SET_SEARCH_ERROR,
  RESET_SEARCH
} from "../constants/ActionTypes";

const initialState = {
  term: "",
  filters: {
    siren: null,
    naf: null,
    location: null,
    siege: null,
    state: ["A", "F"]
  },
  results: null,
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
      return {
        ...state,
        term: "",
        filters: {
          siren: null,
          naf: null,
          location: null,
          siege: null,
          state: ["A", "F"]
        },
        results: null
      };

    default:
      return state;
  }
};

export default search;
