import * as types from "../constants/ActionTypes";
import Http from "../../Http";
import { setCurrentEnterprise } from "./enterprise";

export const loginUser = password => (dispatch, getState) => {
  dispatch(logoutUser());

  return Http.post("/login", {
    password
  })
    .then(function(response) {
      if (response.data.user) {
        dispatch(_loginUser(response.data.user));
      }
      return response;
    })
    .catch(function(error) {
      return error;
    });
};

const _loginUser = user => ({
  type: types.LOGIN_USER,
  user
});

export const logoutUser = () => (dispatch, getState) => {
  dispatch({
    type: types.LOGOUT_USER
  });
};
