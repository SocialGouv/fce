import * as types from "../constants/ActionTypes";
import Http from "../../Http";
import Config from "../../Config";

export const search = term => (dispatch, getState) => {
  dispatch(
    _setTerms({
      raisonSociale: term,
      csvURL: Http.buildURL(`${Http.defaults.baseURL}/search.xlsx`, {
        q: term
      })
    })
  );

  return Http.get("/search", {
    params: {
      q: term
    }
  })
    .then(function(response) {
      dispatch(_setSearchResponses(response.data.results));

      let terms = {};

      if (response.data.query.isSIRET) {
        terms = {
          siren: response.data.results && response.data.results[0].siren
        };
        dispatch(
          _setTerms({
            ...terms,
            csvURL: Http.buildURL(
              `${Http.defaults.baseURL}/advancedSearch.xlsx`,
              terms
            )
          })
        );
      } else if (response.data.query.isSIREN) {
        terms = {
          siren: response.data.query.q
        };

        dispatch(
          _setTerms({
            ...terms,
            csvURL: Http.buildURL(
              `${Http.defaults.baseURL}/advancedSearch.xlsx`,
              terms
            )
          })
        );
      }

      return Promise.resolve(response);
    })
    .catch(function(error) {
      return Promise.reject(error);
    });
};

export const advancedSearch = terms => (dispatch, getState) => {
  // Just in case, to prevent infinite recursion
  if (terms.csvURL) {
    delete terms.csvURL;
  }

  dispatch(
    _setTerms({
      ...terms,
      csvURL: Http.buildURL(
        `${Http.defaults.baseURL}/advancedSearch.xlsx`,
        terms
      )
    })
  );

  return Http.get("/advancedSearch", {
    params: {
      ...terms
    }
  })
    .then(function(response) {
      dispatch(_setSearchResponses(response.data.results));
      return Promise.resolve(response);
    })
    .catch(function(error) {
      return Promise.reject(error);
    });
};

export const getNomenclatures = terms => (dispatch, getState) => {
  dispatch(_setTerms(terms));

  return Http.get("/entities")
    .then(function(response) {
      if (typeof response.data.results === "object") {
        response.data.results.polesInteractions = Config.get(
          "interactions"
        ).map(interaction => {
          return {
            value: interaction,
            label: `Pôle ${interaction}`
          };
        });
      }
      dispatch(_setNomenclatures(response.data.results));
      return Promise.resolve(response);
    })
    .catch(function(error) {
      return Promise.reject(error);
    });
};

const _setSearchResponses = results => ({
  type: types.SEARCH_RESULTS,
  results
});

const _setNomenclatures = nomenclatures => ({
  type: types.SEARCH_NOMENCLATURES,
  nomenclatures
});

const _setTerms = terms => ({
  type: types.SEARCH_TERMS,
  terms
});
