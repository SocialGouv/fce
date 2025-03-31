import withAuth from "../middlewares/auth";
import httpProxy from "express-http-proxy";
import config from "config";

export const registerBceProxy = (app) => {
  app.use(
    "/api/bce/graphql",
    withAuth,
    httpProxy(config.get("bce.url"), {
      proxyReqPathResolver(req) {
        return `/v1/graphql${req.url}`;
      },
      proxyReqOptDecorator(proxyReqOpts, srcReq) {
        // Debug : on log le tokenSet pour vérifier
        console.log("Session in proxy:", srcReq.session);

        // On force le header Authorization à contenir le JWT
        proxyReqOpts.headers["Authorization"] = `Bearer ${config.get(
          "bce.token"
        )}`;

        return proxyReqOpts;
      },
    })
  );
};
