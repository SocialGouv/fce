import * as types from "../constants/ActionTypes";

export const loginUser = (username, password) => (dispatch, getState) => {
  dispatch(_resetLogin());

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      dispatch(
        _loginUser({
          username: username,
          password: password,
          token: "YouTokenToMe?",
          loggedInAt: new Date()
        })
      );
      resolve();
    }, 500);
  });
};

const _resetLogin = () => ({
  type: types.RESET_LOGIN_USER
});

const _setLoginFail = message => ({
  type: types.SET_LOGIN_FAIL,
  message
});

const _loginUser = user => ({
  type: types.LOGIN_USER,
  user
});

export const logoutUser = () => (dispatch, getState) => {
  dispatch({
    type: types.LOGOUT_USER
  });
};
