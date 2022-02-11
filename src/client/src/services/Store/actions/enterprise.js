import Config from "../../Config";
import Http from "../../Http";
import * as types from "../constants/ActionTypes";

export const setCurrentEnterprise = (enterprise) => (dispatch) => {
  dispatch({
    enterprise,
    type: types.SET_CURRENT_ENTERPRISE,
  });
};

export const loadEstablishment = (siret) => (dispatch) => {
  return dispatch(getEnterprise(siret));
};

export const loadEntreprise = (siren) => (dispatch) => {
  return dispatch(getEnterprise(siren));
};

const getEnterprise = (term) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const dataSources = Config.get("dataSources").filter(
      ({ id }) => id !== "PG" || term.length !== 9
    );
    let nbErrors = 0;

    dispatch({
      type: types.SET_START_LOADING_ENTERPRISE,
    });

    dataSources.forEach(({ id }) => {
      Http.get("/entity", {
        params: {
          dataSource: id,
          q: term,
        },
      })
        .then((response) => {
          const enterprise = response?.data?.results?.[0];
          if (enterprise) {
            dispatch(setCurrentEnterprise(enterprise));
          }
          dispatch({
            type: types.SET_SOURCE_COMPLETED_ENTERPRISE,
          });
          resolve(response);
        })
        .catch((e) => {
          nbErrors++;
          dispatch({
            type: types.SET_SOURCE_COMPLETED_ENTERPRISE,
          });
          if (nbErrors === dataSources.length) {
            reject(e);
          }
        });
    });
  });
};
