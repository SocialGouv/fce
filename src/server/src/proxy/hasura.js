import httpProxy from "express-http-proxy";
import config from "config";
import withAuth from "../middlewares/auth";

export const registerHasuraProxy = (app) => {
  app.use("/api/graphql", withAuth, httpProxy(config.get("hasura.url"), {
    parseReqBody: false,
    proxyReqPathResolver(req) {
      return `/v1/graphql${req.url}`;
    },
    proxyReqOptDecorator(proxyReqOpts) {
      proxyReqOpts.headers["x-hasura-admin-secret"] = config.get("hasura.adminSecret");
      return proxyReqOpts;
    }
  }));
}