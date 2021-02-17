import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import PiwikReactRouter from "piwik-react-router";
import classNames from "classnames";
import "./app.scss";
import configureStore from "../../services/Store";
import Config from "../../services/Config";
import PrivateRoute from "../../services/PrivateRoute";
import SetMatomo from "../../helpers/Matomo/SetMatomo";
import ScrollToTop from "./ScrollToTop";
import Maintenance from "../Maintenance";
import Header from "./Header";
import Footer from "./Footer";
import Statistics from "../PublicPage/Statistics";
import Enterprise from "../../containers/Enterprise";
import Login from "../../containers/Login";
import UnsubscribePage from "../../containers/UnsubscribePage";
import Search from "../../containers/Search";
import HomePage from "../HomePage";
import PublicPage from "../../containers/PublicPage";
import IEChecker from "../../components/IEChecker";
import { Error403, Error404 } from "../../components/Errors";
import { isIE } from "../../helpers/BrowserDetection";

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
                <Route exact path="/" component={HomePage} />
                <Header showBetaMessage={!isActiveMaintenanceMode} />
                <div className={classNames("app-container", { ie11: isIE })}>
                  <Switch>
                    <Route
                      path="/unsubscribe/:hash"
                      component={UnsubscribePage}
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
                              render={() => <Login />}
                            />
                            <Route
                              exact
                              path="/mentions-legales"
                              render={() => (
                                <PublicPage
                                  pageIdentifier={"mentions-legales"}
                                />
                              )}
                            />
                            <Route
                              exact
                              path="/a-propos"
                              render={() => (
                                <PublicPage pageIdentifier={"a-propos"} />
                              )}
                            />
                            <Route
                              exact
                              path="/cgu"
                              render={() => (
                                <PublicPage pageIdentifier={"cgu"} />
                              )}
                            />
                            <Route
                              exact
                              path="/sources-des-donnees"
                              render={() => (
                                <PublicPage
                                  pageIdentifier={"sources-des-donnees"}
                                />
                              )}
                            />
                            <Route
                              exact
                              path="/statistics"
                              render={() => <Statistics />}
                            />
                            <Route
                              exact
                              path="/403"
                              render={() => <Error403 />}
                            />
                            <Route
                              exact
                              path="/404"
                              render={() => <Error404 />}
                            />
                            <Redirect to="/404" />
                          </Switch>
                        )}
                      </IEChecker>
                    </Route>
                  </Switch>
                </div>
                <Footer />
              </Switch>
            </div>
          </ScrollToTop>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
