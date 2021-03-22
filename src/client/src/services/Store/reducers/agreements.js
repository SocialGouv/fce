import {
  FETCH_AGREEMENTS_START,
  FETCH_AGREEMENTS_SUCCESS,
  FETCH_AGREEMENTS_ERROR
} from "../constants/ActionTypes";

const initialState = {
  totalCount: 0,
  agreementsList: [],
  fileNumbersBySiret: [],
  isLoading: false,
  error: null
};

const agreements = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AGREEMENTS_START:
      return { ...initialState, isLoading: true };

    case FETCH_AGREEMENTS_SUCCESS:
      return {
        isLoading: false,
        error: null,
        ...action.payload
      };

    case FETCH_AGREEMENTS_ERROR:
      return {
        ...initialState,
        error: action.payload
      };

    default:
      return state;
  }
};

export default agreements;
