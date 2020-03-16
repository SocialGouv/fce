import { SET_SOURCES } from "../constants/ActionTypes";

const initialState = [];

const search = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOURCES:
      return action.payload;

    default:
      return state;
  }
};

export default search;
