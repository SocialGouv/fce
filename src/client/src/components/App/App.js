import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import configureStore from "../../services/Store";

import "./app.css";
import { Container } from "reactstrap";
import ScrollToTop from "./ScrollToTop";
import Header from "./Header";
import Footer from "./Footer";
import Search from "../../containers/Search";
import SearchResults from "../../containers/SearchResults";
import AdvancedSearch from "../../containers/AdvancedSearch";
import Enterprise from "../../containers/Enterprise";
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
                  <Route exact path="/" component={Search} />
                  <Route exact path="/search" component={Search} />
                  <Route
                    exact
                    path="/search/advanced"
                    component={AdvancedSearch}
                  />
                  <Route
                    exact
                    path="/search/results"
                    component={SearchResults}
                  />
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
              </Container>
              <Footer />
            </ScrollToTop>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
