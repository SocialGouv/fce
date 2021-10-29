import { combineReducers } from "redux";
import search from "./search";
import enterprise from "./enterprise";
import sources from "./sources";
import agreements from "./agreements";
import egapro from "./egapro";
import psi from "./psi";
import apprentissage from "./apprentissage";
import successions from "./succession";

const reducers = combineReducers({
  search,
  enterprise,
  sources,
  agreements,
  egapro,
  psi,
  apprentissage,
  successions
});

export default reducers;
