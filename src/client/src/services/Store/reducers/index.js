import { combineReducers } from "redux";

import agreements from "./agreements";
import apprentissage from "./apprentissage";
import egapro from "./egapro";
import enterprise from "./enterprise";
import psi from "./psi";
import search from "./search";
import sources from "./sources";
import successions from "./succession";

const reducers = combineReducers({
  agreements,
  apprentissage,
  egapro,
  enterprise,
  psi,
  search,
  sources,
  successions,
});

export default reducers;
