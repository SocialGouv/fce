import { combineReducers } from "redux";
import search from "./search";
import enterprise from "./enterprise";
import sources from "./sources";
import agreements from "./agreements";
import psi from "./psi";
import apprentissage from "./apprentissage";

const reducers = combineReducers({
  search,
  enterprise,
  sources,
  agreements,
  psi,
  apprentissage
});

export default reducers;
