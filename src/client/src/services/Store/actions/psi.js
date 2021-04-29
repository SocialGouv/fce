import {
  FETCH_PSI_START,
  FETCH_PSI_SUCCESS,
  FETCH_PSI_ERROR
} from "../constants/ActionTypes";
import Http from "../../Http";
import Config from "../../Config";

export const loadPsi = identifier => dispatch => {
  const siren = identifier.slice(0, 9);

  dispatch({
    type: FETCH_PSI_START
  });

  return Http.get(`/psi/${siren}`, { timeout: Config.get("pgApi.timeout") })
    .then(res => {
      dispatch({
        type: FETCH_PSI_SUCCESS,
        payload: { ...res.data.result }
      });
    })
    .catch(error => {
      console.error(error);
      dispatch({
        type: FETCH_PSI_ERROR,
        payload: error
      });
    });
};
