import {
  RESET_SEARCH,
  RESET_SORT,
  SET_SEARCH_FILTERS,
  SET_SEARCH_PAGE,
  SET_SEARCH_RESULTS,
  SET_SEARCH_SORT,
  SET_SEARCH_SORT_FIELD,
  SET_SEARCH_SORT_ORDER,
  SET_SEARCH_TERM,
} from "../constants/ActionTypes";

const initialState = {
  filters: {
    etats: ["A"],
    sortField: null,
    sortOrder: null,
  },
  page: 1,
  results: {
    results: null,
    total: 0,
  },
  sort: {
    ascDirection: false,
    field: null,
    sortField: null,
    sortOrder: null,
  },
  term: null,
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return {
        ...state,
        term: action.term,
      };
    case SET_SEARCH_SORT_ORDER:
      return {
        ...state,
        sort: {
          ...state.sort,
          sortOrder: action.sortOrder,
        },
      };
    case SET_SEARCH_SORT_FIELD:
      return {
        ...state,
        sort: {
          ...state.sort,
          sortField: action.sortField,
        },
      };
    case RESET_SORT:
      return {
        ...state,
        sort: {
          ...state.sort,
          sortField: null,
          sortOrder: null,
        },
      };

    case SET_SEARCH_PAGE:
      return {
        ...state,
        page: action.page,
      };

    case SET_SEARCH_FILTERS:
      return {
        ...state,
        filters: action.filters,
      };

    case SET_SEARCH_SORT:
      return {
        ...state,
        sort: action.sort,
      };

    case SET_SEARCH_RESULTS:
      return {
        ...state,
        results: action.results,
      };

    case RESET_SEARCH:
      return initialState;

    default:
      return state;
  }
};

export default search;
