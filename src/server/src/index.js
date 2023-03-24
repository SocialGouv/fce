import express from "express";
import bodyParser from "body-parser";
import * as Sentry from "@sentry/node";
import cors from "cors";

import apiRouter from "./api";
import { isDev } from "./utils/isDev";
import {setupGraphql} from "./graphql/graphql";
import {registerBceProxy} from "./proxy/bce";

require("dotenv").config();
const config = require("config");
const app = express();
const port = (config.has("port") && +config.get("port")) || 80;
const sentryUrlKey = config.get("sentryUrlKey");

if (!isDev()) {
  Sentry.init({ dsn: sentryUrlKey });
}

async function init() {
  app.use(cors());

  registerBceProxy(app);

  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

  await setupGraphql(app); // must be setup after body parser or parser won't work on other routes

  app.get("/", (req, res) => {
    console.log("getting");
    res.status(200)
      .json({
        status: "ok",
        message: "server running"
      });
  });
}

function run() {
  app.use(Sentry.Handlers.requestHandler());
  app.use("/api", apiRouter);

  app.use(Sentry.Handlers.errorHandler());

  app.get("/healthz", (req, res) => {
    res.status(200)
      .send("ok")
  });

  app.listen(
    port,
    () => {
      console.log(`Listening on ${port}`);
    }
  );

  return app;
}

init();
export default run();
