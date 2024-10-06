import "./app.scss";

import { ApolloProvider } from "@apollo/client";
import { createBrowserHistory } from "history";
import PiwikReactRouter from "piwik-react-router";
import PropTypes from "prop-types";
import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";

import { Error403, Error404 } from "../../components/Errors";
import IEChecker from "../../components/IEChecker";
import Enterprise from "../../containers/Enterprise";
import LegacyEtablissement from "../../containers/Enterprise/LegacyEtablissement";
import ListEtablissements from "../../containers/Enterprise/ListEtablissements.jsx";
import Login from "../../containers/Login";
import PublicPage from "../../containers/PublicPage";
import Search from "../../containers/Search";
import SetMatomo from "../../helpers/Matomo/SetMatomo.js";
import Auth from "../../services/Auth/Auth.js";
import Config from "../../services/Config";
import { useIsNotFound } from "../../services/Elastic/elastic.js";
import { apolloClient } from "../../services/GraphQL/GraphQL";
import CustomLayout from "../../services/PrivateRoute/CustomLayout.jsx";
import configureStore from "../../services/Store";
import { getSirenFromSiret } from "../../utils/establishment/establishment.js";
import HomePage from "../HomePage";
import Maintenance from "../Maintenance";
import Statistics from "../PublicPage/Statistics";
import RequestAccess from "../RequestAccessForm/RequestAccess";
import Layout from "./Layout";
import ScrollToTop from "./ScrollToTop";

const { store, persistor } = configureStore();

const browserHistory = createBrowserHistory();
const isActiveMaintenanceMode = Config.get("maintenanceMode");
const globalMatomoConfig = Config.get("matomo");

const setupMatomo = (history, matomoConfig) => {
  if (matomoConfig) {
    const piwik = PiwikReactRouter(matomoConfig);
    piwik.connectToHistory(history, SetMatomo(matomoConfig));
  }
};

const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  const auth = Auth.isLogged();
  return auth ? children : <Navigate to={redirectTo} />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

const App = () => {
  setupMatomo(browserHistory, globalMatomoConfig);

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <ScrollToTop>
              <div className="app">
                <Routes>
                  {isActiveMaintenanceMode ? (
                    <Route path="/" element={<Maintenance />} />
                  ) : (
                    <>
                      <Route
                        path="/"
                        element={
                          <ProtectedRoute redirectTo="/home">
                            <IEChecker>
                              <Layout displayMessage>
                                <Search />
                              </Layout>
                            </IEChecker>
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/search"
                        element={
                          <ProtectedRoute redirectTo="/home">
                            <IEChecker>
                              <Layout displayMessage>
                                <Search />
                              </Layout>
                            </IEChecker>
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/enterprise/:siren"
                        element={
                          <ProtectedRoute redirectTo="/home">
                            <EnterpriseWrapper />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/establishment/:siret"
                        element={
                          <ProtectedRoute redirectTo="/home">
                            <EstablishmentWrapper />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/list-establishments/:siren"
                        element={
                          <ProtectedRoute redirectTo="/home">
                            <ListEstablishmentsWrapper />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/home"
                        element={
                          <IEChecker>
                            <Layout hasLandingHeader hasSharedButton>
                              <HomePage />
                            </Layout>
                          </IEChecker>
                        }
                      />
                      <Route
                        path="/login"
                        element={
                          <IEChecker>
                            <Layout hasLandingHeader>
                              <Login />
                            </Layout>
                          </IEChecker>
                        }
                      />
                      <Route
                        path="/request-access"
                        element={
                          <IEChecker>
                            <Layout hasLandingHeader>
                              <RequestAccess />
                            </Layout>
                          </IEChecker>
                        }
                      />
                      <Route
                        path="/mentions-legales"
                        element={
                          <IEChecker>
                            <Layout>
                              <PublicPage />
                            </Layout>
                          </IEChecker>
                        }
                      />
                      <Route
                        path="/faq"
                        element={
                          <IEChecker>
                            <Layout>
                              <PublicPage />
                            </Layout>
                          </IEChecker>
                        }
                      />
                      <Route
                        path="/aide"
                        element={
                          <IEChecker>
                            <Layout>
                              <PublicPage />
                            </Layout>
                          </IEChecker>
                        }
                      />
                      <Route
                        path="/a-propos"
                        element={
                          <IEChecker>
                            <Layout>
                              <PublicPage />
                            </Layout>
                          </IEChecker>
                        }
                      />
                      <Route
                        path="/politique-de-confidentialite"
                        element={
                          <IEChecker>
                            <Layout>
                              <PublicPage />
                            </Layout>
                          </IEChecker>
                        }
                      />
                      <Route
                        path="/sources-des-donnees"
                        element={
                          <IEChecker>
                            <Layout>
                              <PublicPage />
                            </Layout>
                          </IEChecker>
                        }
                      />
                      <Route
                        path="/statistics"
                        element={
                          <IEChecker>
                            <Layout>
                              <Statistics />
                            </Layout>
                          </IEChecker>
                        }
                      />
                      <Route
                        path="/403"
                        element={
                          <IEChecker>
                            <Layout>
                              <Error403 />
                            </Layout>
                          </IEChecker>
                        }
                      />
                      <Route
                        path="/404"
                        element={
                          <IEChecker>
                            <Layout>
                              <Error404 />
                            </Layout>
                          </IEChecker>
                        }
                      />
                      <Route path="*" element={<Navigate to="/404" />} />
                    </>
                  )}
                </Routes>
              </div>
            </ScrollToTop>
          </BrowserRouter>
        </PersistGate>
      </ApolloProvider>
    </Provider>
  );
};

const EnterpriseWrapper = () => {
  const { siren } = useParams();
  const siret = getSirenFromSiret(siren);
  const isNotFound = useIsNotFound(siret, siren);

  return (
    <IEChecker>
      <Layout>
        <CustomLayout
          isNotFound={isNotFound}
          isEntrepriseDisplayed
          siren={siren}
          siret={siret}
        >
          <Enterprise siren={siren} />
        </CustomLayout>
      </Layout>
    </IEChecker>
  );
};

const EstablishmentWrapper = () => {
  const { siret } = useParams();
  const siren = getSirenFromSiret(siret);
  const isNotFound = useIsNotFound(siret, siren);

  return (
    <IEChecker>
      <Layout>
        <CustomLayout
          isNotFound={isNotFound}
          isEstablishmentDisplayed
          siren={siren}
          siret={siret}
        >
          <LegacyEtablissement siret={siret} />
        </CustomLayout>
      </Layout>
    </IEChecker>
  );
};

const ListEstablishmentsWrapper = () => {
  const { siren } = useParams();
  const isNotFound = useIsNotFound("", siren);

  return (
    <IEChecker>
      <Layout>
        <CustomLayout
          isNotFound={isNotFound}
          isEstablishmentsDisplayed
          siren={siren}
        >
          <ListEtablissements siren={siren} />
        </CustomLayout>
      </Layout>
    </IEChecker>
  );
};

export default App;
