import Http from "../../Http";
import {
  FETCH_EGAPRO_ERROR,
  FETCH_EGAPRO_START,
  FETCH_EGAPRO_SUCCESS,
} from "../constants/ActionTypes";

export const loadEgapro = (siren) => (dispatch) => {
  dispatch({
    type: FETCH_EGAPRO_START,
  });

  return Http.get(`/egapro/${siren}`)
    .then((res) => {
      dispatch({
        identifier: siren,
        index: res.data.data,
        type: FETCH_EGAPRO_SUCCESS,
      });
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        payload: error,
        type: FETCH_EGAPRO_ERROR,
      });
    });
};
