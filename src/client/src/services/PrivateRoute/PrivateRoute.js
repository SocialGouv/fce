import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import Auth from "../Auth";

const PrivateRoute = ({ component: Component, location, history, ...rest }) => {
  async function getTempAuthAndRedirect(cred, location) {
    const auth = await Auth.tempLogin(cred).then(response => {
      history.push(location.pathname);
    });
  }

  const checkAuthorization = () => {
    const credential = new URLSearchParams(location.search).get("cred");

    if (Auth.isLogged()) {
      return {
        auth: true
      };
    } else if (credential) {
      getTempAuthAndRedirect(credential, location);
      return {
        auth: false,
        redirect: location.pathname
      };
    } else {
      return {
        auth: false,
        redirect: "/login"
      };
    }
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
