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

    dataSources.map(({ id, priority }) => {
      Http.get("/entity", {
        params: {
          q: term,
          dataSource: id
        }
      })
        .then(response => {
          console.error("Un success", response.data.query.dataSource);
          const enterprise = response?.data?.results?.[0];
          if (enterprise) {
            dispatch(setCurrentEnterprise(enterprise));
          }
          resolve(response);
        })
        .catch(e => {
          nbErrors++;
          console.error("Une erreur", e);
          if (nbErrors === dataSources.length) {
            console.error("FATAL ERROR !!!");
            reject(e);
          }
        });
    });
  });
  /*Promise.any(
    Config.get("dataSources").map(({ id, priority }) => {
      console.log({ id, priority });
    })
  );*/

  /*return Http.get("/entity", {
    params: {
      q: term,
      dataSource: "PG"
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
    });*/
};
