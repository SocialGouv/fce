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
import Footer from "./Footer";
import Login from "../../containers/Login";
import Home from "../../containers/Home";

let { store, persistor } = configureStore();

class App extends React.Component {
  render() {
    console.debug("render app");
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <ScrollToTop>
              <Container className="app-container" fluid={true}>
                <Header />
                <main className="mainview" role="main">
                  <Switch>
                    <PrivateRoute exact path="/" component={Home} />

                    <Route exact path="/login" render={() => <Login />} />

                    <Redirect to="/login" />
                  </Switch>
                </main>
                <Footer />
              </Container>
            </ScrollToTop>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
