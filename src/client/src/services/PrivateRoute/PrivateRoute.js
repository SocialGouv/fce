import PropTypes from "prop-types";
import React from "react";
import { Redirect, Route, useHistory } from "react-router-dom";

import Layout from "../../components/App/Layout";
import Auth from "../Auth";

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const history = useHistory();

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
        auth: true,
      };
    } else if (credential) {
      getTempAuthAndRedirect(credential, location);
      return {
        auth: false,
        redirect: location.pathname,
      };
    } else {
      return {
        auth: false,
        redirect: "/home",
      };
    }
  };

  const authorization = checkAuthorization();

  return (
    <Route
      {...rest}
      render={(props) => {
        return authorization.auth ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: authorization.redirect,
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  location: PropTypes.object,
};

export default PrivateRoute;
