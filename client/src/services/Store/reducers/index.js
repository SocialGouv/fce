import { combineReducers } from "redux";
import auth from "./auth";
import search from "./search";
import common from "./common";
import enterprise from "./enterprise";

const reducers = combineReducers({
  auth,
  search,
  enterprise,
  common
});

export default reducers;
