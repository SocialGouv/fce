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
import Enterprise from "../../containers/Enterprise";
import Admin from "../../containers/Admin";
import { Error403, Error404 } from "../../components/Errors";

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
                  <PrivateRoute
                    exact
                    path="/admin"
                    component={Admin}
                    isAdmin={true}
                  />
                  <Route exact path="/login" render={() => <Login />} />
                  <Route exact path="/403" render={() => <Error403 />} />
                  <Route exact path="/404" render={() => <Error404 />} />
                  <Redirect to="/404" />
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
