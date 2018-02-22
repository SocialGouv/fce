import {
  LOGIN_USER,
  LOGOUT_USER,
  RESET_LOGIN_USER,
  SET_LOGIN_FAIL
} from "../constants/ActionTypes";

const initialState = {
  isAuthenticated: false,
  user: null,
  loginSuccess: null,
  loginMessage: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, {
        isAuthenticated: true,
        user: action.user,
        loginSuccess: true,
        loginMessage: null
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isAuthenticated: false,
        user: null,
        loginSuccess: null,
        loginMessage: null
      });
    case RESET_LOGIN_USER:
      return Object.assign({}, state, {
        loginSuccess: null,
        loginMessage: null
      });
    case SET_LOGIN_FAIL:
      return Object.assign({}, state, {
        loginSuccess: false,
        loginMessage: action.message
      });
    default:
      return state;
  }
};

export default auth;
