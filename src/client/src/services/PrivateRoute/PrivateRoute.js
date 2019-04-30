import React from "react";
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

  return (
    <Route
      {...rest}
      render={props => {
        const authorization = checkAuthorization();
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

export default PrivateRoute;
