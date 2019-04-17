import { combineReducers } from "redux";
import search from "./search";
import enterprise from "./enterprise";

const reducers = combineReducers({
  search,
  enterprise
});

export default reducers;
