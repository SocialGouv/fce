import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export const IfLoggedIn = connect(mapStateToProps)(({ children, auth }) => {
  if (auth && auth.isAuthenticated) {
    return children;
  }

  return null;
});

export const IfNotLoggedIn = connect(mapStateToProps)(({ children, auth }) => {
  if (!auth || !auth.isAuthenticated) {
    return children;
  }

  return null;
});
