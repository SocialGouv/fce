import Http from "../../Http";
import {
  FETCH_APPRENTISSAGE_ERROR,
  FETCH_APPRENTISSAGE_START,
  FETCH_APPRENTISSAGE_SUCCESS,
} from "../constants/ActionTypes";

export const loadApprentissage = (identifier) => (dispatch, getState) => {
  const state = getState();

  if (state.apprentissage.identifier === identifier) {
    return null;
  }

  dispatch({
    type: FETCH_APPRENTISSAGE_START,
  });

  return Http.get(`/apprentissage/${identifier}`)
    .then((res) => {
      dispatch({
        apprentissage: res.data,
        identifier: identifier,
        type: FETCH_APPRENTISSAGE_SUCCESS,
      });
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        payload: error,
        type: FETCH_APPRENTISSAGE_ERROR,
      });
    });
};
