import {
  FETCH_SUCCESSION_ERROR,
  FETCH_SUCCESSION_START,
  FETCH_SUCCESSION_SUCCESS,
} from "../constants/ActionTypes";

const initialState = {
  error: null,
  isLoading: false,
  successions: [],
};

const successions = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESSION_START:
      return {
        ...initialState,
        isLoading: true,
      };

    case FETCH_SUCCESSION_SUCCESS:
      return {
        error: null,
        isLoading: false,
        successions: action.successions,
      };

    case FETCH_SUCCESSION_ERROR:
      return {
        ...initialState,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default successions;
