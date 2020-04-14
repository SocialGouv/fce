import { combineReducers } from "redux";
import search from "./search";
import enterprise from "./enterprise";
import sources from "./sources";

const reducers = combineReducers({
  search,
  enterprise,
  sources
});

export default reducers;
