import React, { useEffect, useReducer } from "react";
import PublicPageDefault from "../../components/PublicPage";
import Faq from "../../components/PublicPage/Faq";
import Help from "../../components/PublicPage/Help";
import Config from "../../services/Config";
import { handleError } from "../../helpers/utils";
import { useLocation } from "react-router-dom";

const components = new Map([
  ["/faq", Faq],
  ["/aide", Help]
]);

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

const PublicPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();

  const ViewComponent = components.get(location.pathname) || PublicPageDefault;

  const path =
    location.pathname in Config.get("strapi.path")
      ? Config.get(`strapi.path.${location.pathname}`)
      : location.pathname;

  const endpoint = `${Config.get("strapi.domain")}${path}`;

  useEffect(() => {
    dispatch({ type: "fetchStart" });
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        dispatch({ type: "fetchSuccess", payload: data });
      })
      .catch(error => {
        dispatch({ type: "fetchError" });
        handleError(error);
      });
  }, [endpoint]);

  return (
    <ViewComponent
      pageData={state.pageData}
      isLoading={state.isLoading}
      hasError={state.hasError}
    />
  );
};

export default PublicPage;
