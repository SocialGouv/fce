import {
  FETCH_PSI_START,
  FETCH_PSI_SUCCESS,
  FETCH_PSI_ERROR
} from "../constants/ActionTypes";

const initialState = {
  enterprise: 0,
  establishments: [],
  isLoading: false,
  error: null
};

const psi = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PSI_START:
      return { ...initialState, isLoading: true };

    case FETCH_PSI_SUCCESS:
      return {
        isLoading: false,
        error: null,
        ...action.payload
      };

    case FETCH_PSI_ERROR:
      return {
        ...initialState,
        error: action.payload
      };

    default:
      return state;
  }
};

export default psi;
