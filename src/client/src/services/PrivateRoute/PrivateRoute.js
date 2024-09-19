import PropTypes from "prop-types";
import React from "react";
import { Navigate, Route } from "react-router-dom";

import Layout from "../../components/App/Layout";
import { getSirenFromSiret } from "../../utils/establishment/establishment";
import Auth from "../Auth";
import CustomLayout from "./CustomLayout.jsx";

const PrivateRoute = ({
  component: Component,
  isEstablishmentDisplayed = false,
  isEntrepriseDisplayed = false,
  isEstablishmentsDisplayed = false,
  displayMessage = false,
  location,
  ...rest
}) => {
  const getTempAuthAndRedirect = async (credential, location) => {
    try {
      await Auth.tempLogin(credential);
      redirect(location.pathname);
    } catch (error) {
      redirect("/login");
    }
  };

  const checkAuthorization = () => {
    const credential = new URLSearchParams(location.search).get("credential");

    if (Auth.isLogged()) {
      return { auth: true };
    } else if (credential) {
      getTempAuthAndRedirect(credential, location);
      return { auth: false, redirect: location.pathname };
    } else {
      return { auth: false, redirect: "/home" };
    }
  };

  const { auth, redirect } = checkAuthorization();
  const siret = rest?.computedMatch?.params?.siret;
  const siren = rest?.computedMatch?.params?.siren || getSirenFromSiret(siret);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? (
          <Layout displayMessage={displayMessage}>
            {isEstablishmentDisplayed ||
            isEntrepriseDisplayed ||
            isEstablishmentsDisplayed ? (
              <CustomLayout
                isEstablishmentDisplayed={isEstablishmentDisplayed}
                isEntrepriseDisplayed={isEntrepriseDisplayed}
                isEstablishmentsDisplayed={isEstablishmentsDisplayed}
                siren={siren}
                siret={siret}
              >
                <Component {...props} />
              </CustomLayout>
            ) : (
              <Component {...props} />
            )}
          </Layout>
        ) : (
          <Navigate
            to={{ pathname: redirect, state: { from: props.location } }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
  displayMessage: PropTypes.bool,
  isEntrepriseDisplayed: PropTypes.bool,
  isEstablishmentDisplayed: PropTypes.bool,
  isEstablishmentsDisplayed: PropTypes.bool,
  location: PropTypes.object,
};

export default PrivateRoute;
