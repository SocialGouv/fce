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
import ScrollToTop from "./ScrollToTop";
import Header from "./Header";
import Footer from "./Footer";
import Enterprise from "../../containers/Enterprise";
import Login from "../../containers/Login";
import MagicLink from "../../containers/MagicLink";
import Search from "../../containers/Search";
import LegalNotices from "../../components/LegalNotices";
import Cgu from "../../components/Cgu";
import IEChecker from "../../components/IEChecker";
import { Error403, Error404 } from "../../components/Errors";

let { store, persistor } = configureStore();
let history = createBrowserHistory();

if (Config.get("piwik")) {
  const piwik = PiwikReactRouter(Config.get("piwik"));
  history = piwik.connectToHistory(history);
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <ScrollToTop>
            <div className="app">
              <Header />

              <div className="app-container">
                <IEChecker>
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
                    <Route exact path="/cgu" render={() => <Cgu />} />
                    <Route exact path="/403" render={() => <Error403 />} />
                    <Route exact path="/404" render={() => <Error404 />} />
                    <Redirect to="/404" />
                  </Switch>
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
