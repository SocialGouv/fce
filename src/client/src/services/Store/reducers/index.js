import { combineReducers } from "redux";
import search from "./search";
import enterprise from "./enterprise";
import sources from "./sources";
import agreements from "./agreements";

const reducers = combineReducers({
  search,
  enterprise,
  sources,
  agreements
});

export default reducers;
