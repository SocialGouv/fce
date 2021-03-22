import {
  FETCH_AGREEMENTS_START,
  FETCH_AGREEMENTS_SUCCESS,
  FETCH_AGREEMENTS_ERROR
} from "../constants/ActionTypes";
import Http from "../../Http";

export const loadAgreements = identifier => dispatch => {
  const siren = identifier.slice(0, 9);

  dispatch({
    type: FETCH_AGREEMENTS_START
  });

  return Http.get(`/agreements/${siren}`)
    .then(res => {
      dispatch({
        type: FETCH_AGREEMENTS_SUCCESS,
        payload: res.data.agreements
      });
    })
    .catch(error => {
      console.error(error);
      dispatch({
        type: FETCH_AGREEMENTS_ERROR,
        payload: error
      });
    });
};
