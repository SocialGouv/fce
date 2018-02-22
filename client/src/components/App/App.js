import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import configureStore from "../../services/Store";
import PrivateRoute from "../../services/PrivateRoute";

import "./app.css";
import ScrollToTop from "./ScrollToTop";
import Header from "./Header";
import Footer from "./Footer";
import Login from "../Login";
import Home from "../Home";

let { store, persistor } = configureStore();

class App extends React.Component {
  render() {
    console.debug("render app");
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <ScrollToTop>
              <div className="app-container">
                <Header />
                <main className="mainview" role="main">
                  <Switch>
                    <PrivateRoute exact path="/" component={Home} />

                    <Route exact path="/login" render={() => <Login />} />

                    <Redirect to="/login" />
                  </Switch>
                </main>
                <Footer />
              </div>
            </ScrollToTop>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
