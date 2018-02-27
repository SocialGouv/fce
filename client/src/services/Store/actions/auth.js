import * as types from "../constants/ActionTypes";

export const loginUser = (username, password) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let response = {
        data: {
          user: {
            username: username,
            token: "YouTokenToMe?",
            loggedInAt: new Date()
          }
        }
      };
      dispatch(_loginUser(response.data.user));
      resolve(response);
    }, 500);
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
