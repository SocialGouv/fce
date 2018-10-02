import * as types from "../constants/ActionTypes";
import Http from "../../Http";

export const loginUser = password => (dispatch, getState) => {
  dispatch(logoutUser());

  return Http.post("/login", {
    password
  })
    .then(function(response) {
      if (response.data.user) {
        dispatch(_loginUser(response.data.user));
      }
      return Promise.resolve(response);
    })
    .catch(function(error) {
      return Promise.reject(error);
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
  dispatch({
    type: types.RESET_STORE
  });
};
