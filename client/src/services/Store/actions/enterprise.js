import * as types from "../constants/ActionTypes";

export const setCurrentEnterprise = enterprise => (dispatch, getState) => {
  dispatch({
    type: types.SET_CURRENT_ENTERPRISE,
    enterprise
  });
};

export const loadEstablishment = siret => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let response = {
        data: {
          query: { q: siret, isSIRET: true, isSIREN: false },
          results: []
        }
      };
      const enterprise = response.data.results.length
        ? response.data.results[0]
        : null;
      dispatch(setCurrentEnterprise(enterprise));
      resolve(response);
    }, 500);
  });
};

export const loadEntreprise = siren => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let response = {
        data: {
          query: { q: siren, isSIRET: false, isSIREN: true },
          results: []
        }
      };
      const enterprise = response.data.results.length
        ? response.data.results[0]
        : null;
      dispatch(setCurrentEnterprise(enterprise));
      resolve(response);
    }, 500);
  });
};
