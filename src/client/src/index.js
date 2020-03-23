import "./polyfills";
import React from "react";
import ReactDOM from "react-dom";
import "./assets/stylesheets/styles.css";
import App from "./components/App";
import smoothscroll from "smoothscroll-polyfill";
import * as Sentry from "@sentry/browser";
import Config from "./services/Config";

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

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: Config.get("sentryUrlKey")
  });
}

ReactDOM.render(<App />, document.getElementById("root"));
