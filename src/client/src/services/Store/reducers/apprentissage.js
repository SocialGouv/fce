import {
  FETCH_APPRENTISSAGE_ERROR,
  FETCH_APPRENTISSAGE_START,
  FETCH_APPRENTISSAGE_SUCCESS,
} from "../constants/ActionTypes";

const initialState = {
  apprentissage: null,
  error: null,
  identifier: null,
  isLoading: false,
};

const agreements = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APPRENTISSAGE_START:
      return { ...initialState, isLoading: true };

    case FETCH_APPRENTISSAGE_SUCCESS:
      return {
        apprentissage: action.apprentissage,
        error: null,
        identifier: action.identifier,
        isLoading: false,
      };

    case FETCH_APPRENTISSAGE_ERROR:
      return {
        ...initialState,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default agreements;
