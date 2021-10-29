import {
  FETCH_SUCCESSION_START,
  FETCH_SUCCESSION_SUCCESS,
  FETCH_SUCCESSION_ERROR
} from "../constants/ActionTypes";

const initialState = {
  successions: [],
  isLoading: false,
  error: null
};

const successions = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESSION_START:
      return {
        ...initialState,
        isLoading: true
      };

    case FETCH_SUCCESSION_SUCCESS:
      return {
        isLoading: false,
        error: null,
        successions: action.successions
      };

    case FETCH_SUCCESSION_ERROR:
      return {
        ...initialState,
        error: action.payload
      };

    default:
      return state;
  }
};

export default successions;
