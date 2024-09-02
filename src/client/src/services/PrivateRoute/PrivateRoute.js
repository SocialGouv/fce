import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";

import Layout from "../../components/App/Layout";
import { getSirenFromSiret } from "../../utils/establishment/establishment";
import Auth from "../Auth";
import { useElasticQuery } from "../Elastic/elastic.js";
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
  const history = useHistory();

  const getTempAuthAndRedirect = async (credential, location) => {
    try {
      await Auth.tempLogin(credential);
      history.push(location.pathname);
    } catch (error) {
      history.push("/login");
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
  const { data, error, loading, makeQuery } = useElasticQuery();

  useEffect(() => {
    makeQuery(siret || siren, {
      page: { current: 0, size: 10 },
      params: null,
    });
  }, [siren, makeQuery]);
  const isNotFound =
    !loading && (error || !data?.results || data.results.length === 0);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? (
          <Layout isNotFound={isNotFound} displayMessage={displayMessage}>
            {isEstablishmentDisplayed ||
            isEntrepriseDisplayed ||
            isEstablishmentsDisplayed ? (
              <CustomLayout
                isEstablishmentDisplayed={isEstablishmentDisplayed}
                isEntrepriseDisplayed={isEntrepriseDisplayed}
                isEstablishmentsDisplayed={isEstablishmentsDisplayed}
                isNotFound={isNotFound}
                siren={siren}
                siret={siret}
              >
                {!isNotFound && <Component {...props} />}
              </CustomLayout>
            ) : (
              <Component {...props} />
            )}
          </Layout>
        ) : (
          <Redirect
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  isEntrepriseDisplayed: PropTypes.bool,
  isEstablishmentDisplayed: PropTypes.bool,
  isEstablishmentsDisplayed: PropTypes.bool,
  location: PropTypes.object,
};

export default PrivateRoute;
