import Http from "../../Http";
import {
  FETCH_SUCCESSION_ERROR,
  FETCH_SUCCESSION_START,
  FETCH_SUCCESSION_SUCCESS,
} from "../constants/ActionTypes";

export const loadSuccessions = (siret) => (dispatch) => {
  dispatch({
    type: FETCH_SUCCESSION_START,
  });

  return Http.get(`/successions/${siret}`)
    .then((res) => {
      dispatch({
        successions: res.data.results,
        type: FETCH_SUCCESSION_SUCCESS,
      });
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        payload: error,
        type: FETCH_SUCCESSION_ERROR,
      });
    });
};
