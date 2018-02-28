import { SET_CURRENT_ENTERPRISE } from "../constants/ActionTypes";

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
    default:
      return state;
  }
};

export default enterprise;
