import {
    FETCH_EGAPRO_START,
    FETCH_EGAPRO_SUCCESS,
    FETCH_EGAPRO_ERROR
} from "../constants/ActionTypes";

const initialState = {
    isLoading: false,
    index: [],
    error: null,
    identifier: null
};

const egapro = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EGAPRO_START:
            return { ...initialState, isLoading: true };

        case FETCH_EGAPRO_SUCCESS:
            return {
                isLoading: false,
                error: null,
                index: action.index,
                identifier: action.identifier,
            };

        case FETCH_EGAPRO_ERROR:
            return {
                ...initialState,
                error: action.payload
            };

        default:
            return state;
    }
}

export default egapro;