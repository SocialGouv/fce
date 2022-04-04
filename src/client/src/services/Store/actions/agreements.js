import Http from "../../Http";
import {
  FETCH_AGREEMENTS_ERROR,
  FETCH_AGREEMENTS_START,
  FETCH_AGREEMENTS_SUCCESS,
} from "../constants/ActionTypes";

export const loadAgreements = (identifier) => (dispatch) => {
  const siren = identifier.slice(0, 9);

  dispatch({
    type: FETCH_AGREEMENTS_START,
  });

  return Http.get(`/agreements/${siren}`)
    .then((res) => {
      dispatch({
        payload: res.data.agreements,
        type: FETCH_AGREEMENTS_SUCCESS,
      });
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        payload: error,
        type: FETCH_AGREEMENTS_ERROR,
      });
    });
};
