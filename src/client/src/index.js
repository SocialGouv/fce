import "./polyfills";
import "./assets/stylesheets/styles.css";

import * as Sentry from "@sentry/browser";
import React from "react";
import { createRoot } from "react-dom/client";
import smoothscroll from "smoothscroll-polyfill";

import App from "./components/App";
import Config from "./services/Config";

smoothscroll.polyfill();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((workers) => {
    if (Array.isArray(workers)) {
      console.log(`Found ${workers.length} service workers...`);
      workers.forEach((worker) => {
        if (worker && worker.unregister) {
          console.log("Removing service worker:", worker);
          worker.unregister().then((...args) => {
            console.log(...args);
            window.location.reload(true);
          }, console.error);
        }
      });
    }
  }, console.error);
}

const SENTRY_URL = Config.get("sentryUrl");

if (SENTRY_URL) {
  Sentry.init({
    dsn: SENTRY_URL,
  });
}

// Create the root for rendering
const container = document.getElementById("root");
const root = createRoot(container);

// Render the App component
root.render(<App />);
