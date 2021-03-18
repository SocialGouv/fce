import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import PiwikReactRouter from "piwik-react-router";

import "./app.scss";
import configureStore from "../../services/Store";
import Config from "../../services/Config";
import PrivateRoute from "../../services/PrivateRoute";
import HomePage from "../HomePage";
import Maintenance from "../Maintenance";
import Statistics from "../PublicPage/Statistics";
import UnsubscribePage from "../../containers/UnsubscribePage";
import Enterprise from "../../containers/Enterprise";
import Login from "../../containers/Login";
import PublicPage from "../../containers/PublicPage";
import Search from "../../containers/Search";
import Layout from "./Layout";
import ScrollToTop from "./ScrollToTop";
import IEChecker from "../../components/IEChecker";
import { Error403, Error404 } from "../../components/Errors";
import SetMatomo from "../../helpers/Matomo/SetMatomo";

let { store, persistor } = configureStore();
let history = createBrowserHistory();
const isActiveMaintenanceMode = Config.get("maintenanceMode");
const matomoConfig = Config.get("matomo");

const getHistory = matomoConfig => {
  if (!matomoConfig) {
    return createBrowserHistory();
  }

  const piwik = PiwikReactRouter(matomoConfig);
  return piwik.connectToHistory(history, SetMatomo(matomoConfig));
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={getHistory(matomoConfig)}>
          <ScrollToTop>
            <div className="app">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <Layout hasLandingHeader={true} hasSharedButton={true}>
                      <HomePage />
                    </Layout>
                  )}
                />
                <Switch>
                  <Route
                    exact
                    path="/unsubscribe/:hash"
                    render={props => (
                      <Layout>
                        <UnsubscribePage {...props} />
                      </Layout>
                    )}
                  />
                  <Route>
                    <IEChecker>
                      {isActiveMaintenanceMode ? (
                        <Maintenance />
                      ) : (
                        <Switch>
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
                            component={Enterprise}
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
                            path="/mentions-legales"
                            render={() => (
                              <Layout>
                                <PublicPage
                                  pageIdentifier={"mentions-legales"}
                                />
                              </Layout>
                            )}
                          />
                          <Route
                            exact
                            path="/a-propos"
                            render={() => (
                              <Layout>
                                <PublicPage pageIdentifier={"a-propos"} />
                              </Layout>
                            )}
                          />
                          <Route
                            exact
                            path="/cgu"
                            render={() => (
                              <Layout>
                                <PublicPage pageIdentifier={"cgu"} />
                              </Layout>
                            )}
                          />
                          <Route
                            exact
                            path="/sources-des-donnees"
                            render={() => (
                              <Layout>
                                <PublicPage
                                  pageIdentifier={"sources-des-donnees"}
                                />
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
    </Provider>
  );
};

export default App;
