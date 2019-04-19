import "./polyfills";
import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/stylesheets/styles.css";
import App from "./components/App";
import smoothscroll from "smoothscroll-polyfill";

smoothscroll.polyfill();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(workers => {
    Array.isArray(workers) &&
      (console.log(`Found ${workers.length} service workers...`) || true) &&
      workers.forEach(
        worker =>
          worker &&
          worker.unregister &&
          console.log(
            "Removing service worker :",
            worker
              .unregister()
              .then(
                (...args) =>
                  document.location.reload(true) && console.log(...args),
                console.error
              ) && worker
          )
      );
  }, console.error);
}

ReactDOM.render(<App />, document.getElementById("root"));
