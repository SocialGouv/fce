import Config from "../../Config";
import Http from "../../Http";
import {
  FETCH_PSI_ERROR,
  FETCH_PSI_START,
  FETCH_PSI_SUCCESS,
} from "../constants/ActionTypes";

export const loadPsi = (identifier) => (dispatch) => {
  const siren = identifier.slice(0, 9);

  dispatch({
    type: FETCH_PSI_START,
  });

  return Http.get(`/psi/${siren}`, { timeout: Config.get("pgApi.timeout") })
    .then((res) => {
      dispatch({
        payload: { ...res.data.result },
        type: FETCH_PSI_SUCCESS,
      });
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        payload: error,
        type: FETCH_PSI_ERROR,
      });
    });
};
