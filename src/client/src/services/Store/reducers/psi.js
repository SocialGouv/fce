import {
  FETCH_PSI_ERROR,
  FETCH_PSI_START,
  FETCH_PSI_SUCCESS,
} from "../constants/ActionTypes";

const initialState = {
  enterprise: {
    current_year: 0,
    last_year: 0,
  },
  error: null,
  establishments: [],
  isLoading: false,
};

const psi = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PSI_START:
      return { ...initialState, isLoading: true };

    case FETCH_PSI_SUCCESS:
      return {
        error: null,
        isLoading: false,
        ...action.payload,
      };

    case FETCH_PSI_ERROR:
      return {
        ...initialState,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default psi;
