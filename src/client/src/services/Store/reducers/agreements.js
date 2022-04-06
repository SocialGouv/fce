import {
  FETCH_AGREEMENTS_ERROR,
  FETCH_AGREEMENTS_START,
  FETCH_AGREEMENTS_SUCCESS,
} from "../constants/ActionTypes";

const initialState = {
  agreementsList: [],
  error: null,
  fileNumbersBySiret: [],
  isLoading: false,
  totalCount: 0,
};

const agreements = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AGREEMENTS_START:
      return { ...initialState, isLoading: true };

    case FETCH_AGREEMENTS_SUCCESS:
      return {
        error: null,
        isLoading: false,
        ...action.payload,
      };

    case FETCH_AGREEMENTS_ERROR:
      return {
        ...initialState,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default agreements;
