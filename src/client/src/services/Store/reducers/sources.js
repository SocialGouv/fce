import { SET_SOURCES } from "../constants/ActionTypes";

const initialState = [];

const sources = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOURCES:
      return action.payload;

    default:
      return state;
  }
};

export default sources;
