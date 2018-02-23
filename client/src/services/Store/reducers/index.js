import { combineReducers } from "redux";
import auth from "./auth";
import search from "./search";
import common from "./common";

const reducers = combineReducers({
  auth,
  search,
  common
});

export default reducers;
