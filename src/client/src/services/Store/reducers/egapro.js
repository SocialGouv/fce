import {
  FETCH_EGAPRO_ERROR,
  FETCH_EGAPRO_START,
  FETCH_EGAPRO_SUCCESS,
} from "../constants/ActionTypes";

const initialState = {
  error: null,
  identifier: null,
  index: [],
  isLoading: false,
};

const egapro = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EGAPRO_START:
      return { ...initialState, isLoading: true };

    case FETCH_EGAPRO_SUCCESS:
      return {
        error: null,
        identifier: action.identifier,
        index: action.index,
        isLoading: false,
      };

    case FETCH_EGAPRO_ERROR:
      return {
        ...initialState,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default egapro;
