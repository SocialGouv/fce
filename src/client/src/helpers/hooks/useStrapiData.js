import { useEffect, useReducer } from "react";
import Config from "../../services/Config";
import { handleError } from "../../helpers/utils";

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

export const useStrapiData = (path) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const endpoint = `${Config.get("strapi.domain")}${path}`;
    console.log(endpoint);
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

    return state;
}