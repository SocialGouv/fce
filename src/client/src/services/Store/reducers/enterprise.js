import Config from "../../Config";
import {
  RESET_STORE,
  SET_CURRENT_ENTERPRISE,
  SET_SOURCE_COMPLETED_ENTERPRISE,
  SET_START_LOADING_ENTERPRISE,
} from "../constants/ActionTypes";
import updateEnterpriseAndEstablishments from "../utils/updateEnterpriseAndEstablishments";

const initialState = {
  current: {},
  loading: {
    nbSourcesCompleted: 0,
    status: null,
  },
};

const enterprise = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ENTERPRISE: {
      return {
        ...state,
        current: updateEnterpriseAndEstablishments(
          state.current,
          action.enterprise
        ),
      };
    }
    case SET_START_LOADING_ENTERPRISE: {
      return {
        ...state,
        loading: {
          ...initialState.loading,
          status: Config.get("state.loading"),
        },
      };
    }
    case SET_SOURCE_COMPLETED_ENTERPRISE: {
      const nbSourcesCompleted = state.loading.nbSourcesCompleted + 1;
      const isFinished =
        nbSourcesCompleted === Config.get("dataSources").length;

      return {
        ...state,
        loading: {
          nbSourcesCompleted,
          status: isFinished
            ? Config.get("state.finish")
            : Config.get("state.loading"),
        },
      };
    }
    case RESET_STORE:
      return {};
    default:
      return state;
  }
};

export default enterprise;
