import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import Auth from "../Auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const checkAuthorization = () => {
    if (!Auth.isLogged()) {
      return {
        auth: false,
        redirect: "/login"
      };
    }

    return {
      auth: true
    };
  };

  const authorization = checkAuthorization();

  return (
    <Route
      {...rest}
      render={props => {
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

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
  location: PropTypes.object
};

export default PrivateRoute;
