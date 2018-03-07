import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/stylesheets/styles.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import smoothscroll from "smoothscroll-polyfill";

smoothscroll.polyfill();

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
