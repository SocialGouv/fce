import { combineReducers } from "redux";
import auth from "./auth";
import search from "./search";

const reducers = combineReducers({
  auth,
  search
});

export default reducers;
