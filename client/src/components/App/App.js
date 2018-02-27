import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import configureStore from "../../services/Store";
import PrivateRoute from "../../services/PrivateRoute";

import "./app.css";
import { Container } from "reactstrap";
import ScrollToTop from "./ScrollToTop";
import Header from "./Header";
import Login from "../../containers/Login";
import Search from "../../containers/Search";
import SearchResults from "../../containers/SearchResults";
import AdvancedSearch from "../../containers/AdvancedSearch";

let { store, persistor } = configureStore();

class App extends React.Component {
  render() {
    console.debug("render app");
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <ScrollToTop>
              <Header />
              <Container className="app-container" fluid={true}>
                <Switch>
                  <PrivateRoute exact path="/" component={Search} />
                  <PrivateRoute exact path="/search" component={Search} />
                  <PrivateRoute
                    exact
                    path="/search/advanced"
                    component={AdvancedSearch}
                  />
                  <PrivateRoute
                    exact
                    path="/search/results"
                    component={SearchResults}
                  />
                  <Route exact path="/login" render={() => <Login />} />
                  <Redirect to="/login" />
                </Switch>
              </Container>
            </ScrollToTop>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
