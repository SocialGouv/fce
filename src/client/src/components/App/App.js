import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import PiwikReactRouter from "piwik-react-router";
import configureStore from "../../services/Store";

import "./app.scss";
import ScrollToTop from "./ScrollToTop";
import Header from "./Header";
import Footer from "./Footer";
import Search from "../../containers/Search";
import Enterprise from "../../containers/Enterprise";
import { Error403, Error404 } from "../../components/Errors";
import PaperBG from "../../assets/img/paper.png";

let { store, persistor } = configureStore();
let history = createBrowserHistory();

const piwik = PiwikReactRouter({
  url: "",
  siteId: 1
});

const appStyle = {
  background: `url(${PaperBG})`
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
              <div className="app-container" style={appStyle}>
                <Switch>
                  <Route exact path="/" component={Search} />
                  <Route exact path="/search" component={Search} />
                  <Route
                    exact
                    path="/enterprise/:siren"
                    component={Enterprise}
                  />
                  <Route
                    exact
                    path="/establishment/:siret"
                    component={Enterprise}
                  />
                  <Route exact path="/403" render={() => <Error403 />} />
                  <Route exact path="/404" render={() => <Error404 />} />
                  <Redirect to="/404" />
                </Switch>
              </div>
              <Footer />
            </ScrollToTop>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
