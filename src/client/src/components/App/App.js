import "./app.scss";

import { ApolloProvider } from "@apollo/client";
import { createBrowserHistory } from "history";
import PiwikReactRouter from "piwik-react-router";
import React from "react";
import { Provider } from "react-redux";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";

import { Error403, Error404 } from "../../components/Errors";
import IEChecker from "../../components/IEChecker";
import Enterprise from "../../containers/Enterprise";
import LegacyEtablissement from "../../containers/Enterprise/LegacyEtablissement";
import Login from "../../containers/Login";
import PublicPage from "../../containers/PublicPage";
import Search from "../../containers/Search";
// import UnsubscribePage from "../../containers/UnsubscribePage";
import SetMatomo from "../../helpers/Matomo/SetMatomo";
import Config from "../../services/Config";
import { apolloClient } from "../../services/GraphQL/GraphQL";
import PrivateRoute from "../../services/PrivateRoute";
import configureStore from "../../services/Store";
import HomePage from "../HomePage";
import Maintenance from "../Maintenance";
import Statistics from "../PublicPage/Statistics";
import RequestAccess from "../RequestAccessForm/RequestAccess";
import Layout from "./Layout";
import ScrollToTop from "./ScrollToTop";

const { store, persistor } = configureStore();
const history = createBrowserHistory();
const isActiveMaintenanceMode = Config.get("maintenanceMode");
const matomoConfig = Config.get("matomo");

const getHistory = (matomoConfig) => {
  if (!matomoConfig) {
    return createBrowserHistory();
  }

  const piwik = PiwikReactRouter(matomoConfig);
  return piwik.connectToHistory(history, SetMatomo(matomoConfig));
};

const App = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={getHistory(matomoConfig)}>
            <ScrollToTop>
              <div className="app">
                <Switch>
                  <Switch>
                    {/* <Route
                      exact
                      path="/unsubscribe/:hash"
                      render={(props) => (
                        <Layout>
                          <UnsubscribePage {...props} />
                        </Layout>
                      )}
                    /> */}
                    <Route>
                      <IEChecker>
                        {isActiveMaintenanceMode ? (
                          <Maintenance />
                        ) : (
                          <Switch>
                            <PrivateRoute exact path="/" component={Search} />
                            <PrivateRoute
                              exact
                              path="/search"
                              component={Search}
                            />
                            <PrivateRoute
                              exact
                              path="/enterprise/:siren"
                              component={Enterprise}
                            />
                            <PrivateRoute
                              exact
                              path="/establishment/:siret"
                              component={LegacyEtablissement}
                            />
                            <Route
                              exact
                              path="/home"
                              render={() => (
                                <Layout
                                  hasLandingHeader={true}
                                  hasSharedButton={true}
                                >
                                  <HomePage />
                                </Layout>
                              )}
                            />

                            <Route
                              exact
                              path="/login"
                              render={() => (
                                <Layout hasLandingHeader={true}>
                                  <Login />
                                </Layout>
                              )}
                            />

                            <Route
                              exact
                              path="/request-access"
                              render={() => (
                                <Layout hasLandingHeader={true}>
                                  <RequestAccess />
                                </Layout>
                              )}
                            />

                            <Route
                              exact
                              path="/mentions-legales"
                              render={() => (
                                <Layout>
                                  <PublicPage />
                                </Layout>
                              )}
                            />
                            <Route
                              exact
                              path="/faq"
                              render={() => (
                                <Layout>
                                  <PublicPage />
                                </Layout>
                              )}
                            />
                            <Route
                              exact
                              path="/aide"
                              render={() => (
                                <Layout>
                                  <PublicPage />
                                </Layout>
                              )}
                            />
                            <Route
                              exact
                              path="/a-propos"
                              render={() => (
                                <Layout>
                                  <PublicPage />
                                </Layout>
                              )}
                            />
                            <Route
                              exact
                              path="/politique-de-confidentialite"
                              render={() => (
                                <Layout>
                                  <PublicPage />
                                </Layout>
                              )}
                            />
                            <Route
                              exact
                              path="/sources-des-donnees"
                              render={() => (
                                <Layout>
                                  <PublicPage />
                                </Layout>
                              )}
                            />
                            <Route
                              exact
                              path="/statistics"
                              render={() => (
                                <Layout>
                                  <Statistics />
                                </Layout>
                              )}
                            />
                            <Route
                              exact
                              path="/403"
                              render={() => (
                                <Layout>
                                  <Error403 />
                                </Layout>
                              )}
                            />
                            <Route
                              exact
                              path="/404"
                              render={() => (
                                <Layout>
                                  <Error404 />
                                </Layout>
                              )}
                            />
                            <Redirect to="/404" />
                          </Switch>
                        )}
                      </IEChecker>
                    </Route>
                  </Switch>
                </Switch>
              </div>
            </ScrollToTop>
          </Router>
        </PersistGate>
      </ApolloProvider>
    </Provider>
  );
};

export default App;
