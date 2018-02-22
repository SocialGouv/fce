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
                <main className="mainview" role="main">
                  <Switch>
                    <PrivateRoute exact path="/" component={Search} />

                    <Route exact path="/login" render={() => <Login />} />

                    <Redirect to="/login" />
                  </Switch>
                </main>
              </Container>
            </ScrollToTop>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
