import { combineReducers } from "redux";
import search from "./search";
import enterprise from "./enterprise";
import sources from "./sources";
import agreements from "./agreements";
import psi from "./psi";

const reducers = combineReducers({
  search,
  enterprise,
  sources,
  agreements,
  psi
});

export default reducers;
