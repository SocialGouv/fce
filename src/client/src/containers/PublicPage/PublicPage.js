import React, { useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import PublicPageView from "../../components/PublicPage";
import Config from "../../services/Config";
import { handleError } from "../../helpers/utils";

const strapiEndpoint = Config.get("strapi.endpoint");

const initialState = {
  isLoading: false,
  pageData: null,
  hasError: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "fetchStart":
      return {
        isLoading: true,
        pageData: null,
        hasError: false
      };

    case "fetchSuccess":
      return {
        isLoading: false,
        pageData: action.payload,
        hasError: false
      };

    case "fetchError":
      return {
        loading: false,
        pageData: null,
        hasError: true
      };

    default:
      return state;
  }
};

const PublicPage = ({ pageIdentifier }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const strapiPageUrl = `${strapiEndpoint}${Config.get(
    `strapi.pageIds.${pageIdentifier}`
  )}`;

  useEffect(() => {
    dispatch({ type: "fetchStart" });
    fetch(strapiPageUrl)
      .then(response => response.json())
      .then(data => {
        dispatch({ type: "fetchSuccess", payload: data });
      })
      .catch(error => {
        dispatch({ type: "fetchError" });
        handleError(error);
      });
  }, [pageIdentifier, strapiPageUrl]);

  return (
    <PublicPageView
      pageData={state.pageData}
      isLoading={state.isLoading}
      hasError={state.hasError}
    />
  );
};

PublicPage.propTypes = {
  pageIdentifier: PropTypes.string.isRequired
};

export default PublicPage;
