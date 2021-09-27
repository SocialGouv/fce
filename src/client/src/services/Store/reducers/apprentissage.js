import {
  FETCH_APPRENTISSAGE_ERROR,
  FETCH_APPRENTISSAGE_START,
  FETCH_APPRENTISSAGE_SUCCESS
} from "../constants/ActionTypes";

const initialState = {
  apprentissage: null,
  isLoading: false,
  error: null,
  identifier: null
};

const agreements = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APPRENTISSAGE_START:
      return { ...initialState, isLoading: true };

    case FETCH_APPRENTISSAGE_SUCCESS:
      return {
        isLoading: false,
        error: null,
        apprentissage: action.apprentissage,
        identifier: action.identifier
      };

    case FETCH_APPRENTISSAGE_ERROR:
      return {
        ...initialState,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default agreements;
