import * as types from "../constants/ActionTypes";
import Http from "../../Http";

export const setCurrentEnterprise = enterprise => (dispatch, getState) => {
  dispatch({
    type: types.SET_CURRENT_ENTERPRISE,
    enterprise
  });
};

export const loadEstablishment = siret => (dispatch, getState) => {
  return dispatch(getEnterprise(siret));
};

export const loadEntreprise = siren => (dispatch, getState) => {
  return dispatch(getEnterprise(siren));
};

const getEnterprise = term => (dispatch, getState) => {
  return Http.get("/search", {
    params: {
      q: term
    }
  })
    .then(function(response) {
      const enterprise = response.data.results.length
        ? response.data.results[0]
        : null;
      dispatch(setCurrentEnterprise(enterprise));
      return Promise.resolve(response);
    })
    .catch(function(error) {
      return Promise.reject(error);
    });
};
