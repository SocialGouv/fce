import { SET_CURRENT_ENTERPRISE, RESET_STORE } from "../constants/ActionTypes";
import addInteractionsToEstablishment from "../utils/addInteractionsToEstablishment";

const initialState = {
  current: {}
};

const enterprise = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ENTERPRISE:
      const enterprise = action.enterprise;
      if (Array.isArray(enterprise.etablissements)) {
        enterprise.etablissements.forEach(establishment => {
          establishment = addInteractionsToEstablishment(establishment);
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
