import { SEARCH_RESULTS } from "../constants/ActionTypes";

const initialState = {
  results: []
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_RESULTS:
      return {
        ...state,
        results: action.results
      };
    default:
      return state;
  }
};

export default search;
