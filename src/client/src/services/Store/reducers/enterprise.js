import { SET_CURRENT_ENTERPRISE, RESET_STORE } from "../constants/ActionTypes";
import addInteractions from "../utils/addInteractions";

const initialState = {
  current: {}
};

const enterprise = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ENTERPRISE:
      const enterprise = addInteractions(action.enterprise);
      if (Array.isArray(enterprise.etablissements)) {
        enterprise.etablissements.forEach(establishment => {
          establishment = addInteractions(establishment);
        });
      }
      return {
        ...state,
        current: enterprise
      };
    case RESET_STORE:
      return {};
    default:
      return state;
  }
};

export default enterprise;
