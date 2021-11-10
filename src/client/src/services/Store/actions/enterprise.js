import * as types from "../constants/ActionTypes";
import Http from "../../Http";
import Config from "../../Config";

export const setCurrentEnterprise = enterprise => dispatch => {
  dispatch({
    type: types.SET_CURRENT_ENTERPRISE,
    enterprise
  });
};

export const loadEstablishment = siret => dispatch => {
  return dispatch(getEnterprise(siret));
};

export const loadEntreprise = siren => dispatch => {
  return dispatch(getEnterprise(siren));
};

const getEnterprise = term => dispatch => {
  return new Promise((resolve, reject) => {
    const dataSources = Config.get("dataSources");
    let nbErrors = 0;

    dispatch({
      type: types.SET_START_LOADING_ENTERPRISE
    });

    dataSources.forEach(({ id }) => {
      Http.get("/entity", {
        params: {
          q: term,
          dataSource: id
        }
      })
        .then(response => {
          console.log(response?.data?.results);
          const enterprise = response?.data?.results?.[0];
          if (enterprise) {
            dispatch(setCurrentEnterprise(enterprise));
          }
          dispatch({
            type: types.SET_SOURCE_COMPLETED_ENTERPRISE
          });
          resolve(response);
        })
        .catch(e => {
          nbErrors++;
          dispatch({
            type: types.SET_SOURCE_COMPLETED_ENTERPRISE
          });
          if (nbErrors === dataSources.length) {
            reject(e);
          }
        });
    });
  });
};
