import {
  FETCH_SUCCESSION_START,
  FETCH_SUCCESSION_SUCCESS,
  FETCH_SUCCESSION_ERROR
} from "../constants/ActionTypes";
import Http from "../../Http";

export const loadSuccessions = siret => dispatch => {
  dispatch({
    type: FETCH_SUCCESSION_START
  });

  return Http.get(`/successions/${siret}`)
    .then(res => {
      dispatch({
        type: FETCH_SUCCESSION_SUCCESS,
        successions: res.data.results
      });
    })
    .catch(error => {
      console.error(error);
      dispatch({
        type: FETCH_SUCCESSION_ERROR,
        payload: error
      });
    });
};
