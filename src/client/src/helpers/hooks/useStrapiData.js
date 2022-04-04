import { useEffect, useReducer } from "react";

import Config from "../../services/Config";
import { handleError } from "../utils";

const initialState = {
  hasError: false,
  isLoading: false,
  pageData: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "fetchStart":
      return {
        hasError: false,
        isLoading: true,
        pageData: null,
      };

    case "fetchSuccess":
      return {
        hasError: false,
        isLoading: false,
        pageData: action.payload,
      };

    case "fetchError":
      return {
        hasError: true,
        loading: false,
        pageData: null,
      };

    default:
      return state;
  }
};

export const useStrapiData = (path) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const endpoint = `${Config.get("strapi.domain")}${path}`;

  useEffect(() => {
    dispatch({ type: "fetchStart" });
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ payload: data, type: "fetchSuccess" });
      })
      .catch((error) => {
        dispatch({ type: "fetchError" });
        handleError(error);
      });
  }, [endpoint]);

  return state;
};
