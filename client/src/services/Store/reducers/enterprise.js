import { SET_CURRENT_ENTERPRISE, RESET_STORE } from "../constants/ActionTypes";

const initialState = {
  current: {}
};

const enterprise = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ENTERPRISE:
      return {
        ...state,
        current: action.enterprise
      };
    case RESET_STORE:
      return {};
    default:
      return state;
  }
};

export default enterprise;
