import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.debug("rendering private route");

  const checkAuthorization = (auth, isAdminRoute) => {
    if (!auth || !auth.isAuthenticated) {
      return {
        auth: false,
        redirect: "/login"
      };
    }

    if (isAdminRoute && !auth.user.isAdmin) {
      return {
        auth: false,
        redirect: "/403"
      };
    }

    return {
      auth: true
    };
  };

  return (
    <Route
      {...rest}
      render={props => {
        const authorization = checkAuthorization(rest.auth, rest.isAdmin);
        return authorization.auth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: authorization.redirect,
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(PrivateRoute);
