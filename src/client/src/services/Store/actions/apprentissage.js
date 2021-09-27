import {
  FETCH_APPRENTISSAGE_START,
  FETCH_APPRENTISSAGE_SUCCESS,
  FETCH_APPRENTISSAGE_ERROR
} from "../constants/ActionTypes";
import Http from "../../Http";

export const loadApprentissage = identifier => (dispatch, getState) => {
  const state = getState();

  if (state.apprentissage.identifier === identifier) {
    return;
  }

  dispatch({
    type: FETCH_APPRENTISSAGE_START
  });

  return Http.get(`/apprentissage/${identifier}`)
    .then(res => {
      dispatch({
        type: FETCH_APPRENTISSAGE_SUCCESS,
        apprentissage: res.data,
        identifier: identifier
      });
    })
    .catch(error => {
      console.error(error);
      dispatch({
        type: FETCH_APPRENTISSAGE_ERROR,
        payload: error
      });
    });
};
