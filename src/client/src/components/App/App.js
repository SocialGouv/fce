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
import { SetMatomo } from "../../helpers/SetMatomo";
import ScrollToTop from "./ScrollToTop";
import Maintenance from "../Maintenance";
import Header from "./Header";
import Footer from "./Footer";
import Enterprise from "../../containers/Enterprise";
import Login from "../../containers/Login";
import MagicLink from "../../containers/MagicLink";
import Search from "../../containers/Search";
import LegalNotices from "../PublicPages/LegalNotices";
import Cgu from "../PublicPages/Cgu";
import About from "../PublicPages/About";
import DataSource from "../PublicPages/DataSource";
import IEChecker from "../../components/IEChecker";
import { Error403, Error404 } from "../../components/Errors";

let { store, persistor } = configureStore();
let history = createBrowserHistory();
const isActiveMaintenanceMode = Config.get("maintenanceMode");
const configMatomo = Config.get("matomo");

if (configMatomo) {
  const piwik = PiwikReactRouter(configMatomo);
  history = piwik.connectToHistory(history, SetMatomo(configMatomo));
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <ScrollToTop>
            <div className="app">
              <Header showBetaMessage={!isActiveMaintenanceMode} />
              <div className="app-container">
                <IEChecker>
                  {isActiveMaintenanceMode ? (
                    <Maintenance />
                  ) : (
                    <Switch>
                      <PrivateRoute exact path="/" component={Search} />
                      <PrivateRoute exact path="/search" component={Search} />
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
                      <Route exact path="/login" render={() => <Login />} />
                      <Route
                        exact
                        path="/magic-link/:key/browser/:browser"
                        render={() => <MagicLink />}
                      />
                      <Route
                        exact
                        path="/mentions-legales"
                        render={() => <LegalNotices />}
                      />
                      <Route exact path="/about" render={() => <About />} />
                      <Route exact path="/cgu" render={() => <Cgu />} />
                      <Route
                        exact
                        path="/datasource"
                        render={() => <DataSource />}
                      />
                      <Route exact path="/403" render={() => <Error403 />} />
                      <Route exact path="/404" render={() => <Error404 />} />
                      <Redirect to="/404" />
                    </Switch>
                  )}
                </IEChecker>
              </div>

              <Footer />
            </div>
          </ScrollToTop>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
