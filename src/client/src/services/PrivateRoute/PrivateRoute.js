import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect, useHistory } from "react-router-dom";
import Auth from "../Auth";

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  let history = useHistory();

  async function getTempAuthAndRedirect(credential, location) {
    await Auth.tempLogin(credential)
      .then(() => {
        history.push(location.pathname);
      })
      .catch(() => {
        history.push("/login");
      });
  }

  const checkAuthorization = () => {
    const credential = new URLSearchParams(location.search).get("credential");

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
  location: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

export default PrivateRoute;
