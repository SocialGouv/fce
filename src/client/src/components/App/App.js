import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import PiwikReactRouter from "piwik-react-router";
import configureStore from "../../services/Store";

import "./app.scss";
import Config from "../../services/Config";
import PrivateRoute from "../../services/PrivateRoute";
import ScrollToTop from "./ScrollToTop";
import Header from "./Header";
import Search from "../../containers/Search";
import Enterprise from "../../containers/Enterprise";
import Login from "../../containers/Login";
import MagicLink from "../../containers/MagicLink";
import { Error403, Error404 } from "../../components/Errors";

let { store, persistor } = configureStore();
let history = createBrowserHistory();

const piwik = PiwikReactRouter(Config.get("piwik"));

const appStyle = {
  backgroundColor: `#ededed`
};

class App extends React.Component {
  render() {
    console.debug("render app");
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={piwik.connectToHistory(history)}>
            <ScrollToTop>
              <Header />
              <div className="beta-message">
                Ce site est un travail en cours, actuellement en beta.
              </div>
              <div className="app-container" style={appStyle}>
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
                    path="/magic-link/:key"
                    render={() => <MagicLink />}
                  />
                  <Route exact path="/403" render={() => <Error403 />} />
                  <Route exact path="/404" render={() => <Error404 />} />
                  <Redirect to="/404" />
                </Switch>
              </div>
            </ScrollToTop>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
