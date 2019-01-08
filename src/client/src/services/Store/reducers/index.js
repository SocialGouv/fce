import { combineReducers } from "redux";
import auth from "./auth";
import search from "./search";
import enterprise from "./enterprise";

const reducers = combineReducers({
  auth,
  search,
  enterprise
});

export default reducers;
