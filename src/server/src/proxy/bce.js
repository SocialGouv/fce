import withAuth from "../middlewares/auth";
import httpProxy from "express-http-proxy";
import config from "config";

export const registerBceProxy = (app) => {
  app.use("/api/bce/graphql", withAuth, httpProxy(config.get("bce.url"), {
    parseReqBody: false,
    proxyReqPathResolver(req) {
      return `/v1/graphql${req.url}`;
    },
    proxyReqOptDecorator(proxyReqOpts) {
      proxyReqOpts.headers["Authorization"] = `Bearer ${config.get("bce.token")}`;
      return proxyReqOpts;
    }
  }));
}
