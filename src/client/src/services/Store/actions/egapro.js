import {
    FETCH_EGAPRO_START,
    FETCH_EGAPRO_SUCCESS,
    FETCH_EGAPRO_ERROR,
} from "../constants/ActionTypes";
import Http from "../../Http";

export const loadEgapro = (siren) => (dispatch, getState) => {
    dispatch({
        type: FETCH_EGAPRO_START,
    });

    return Http.get(`/egapro/${siren}`)
        .then((res) => {
             dispatch({
                type: FETCH_EGAPRO_SUCCESS,
                index: res.data.data,
                identifier: siren,
            });
        })
        .catch((error) => {
            console.error(error);
            dispatch({
                type: FETCH_EGAPRO_ERROR,
                payload: error,
            });
        });
};
