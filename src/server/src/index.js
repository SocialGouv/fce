import express from "express";
import bodyParser from "body-parser";
import * as Sentry from "@sentry/node";
import cors from "cors";

import apiRouter from "./api";
import { isDev } from "./utils/isDev";
import { setupGraphql } from "./graphql/graphql";
import { registerBceProxy } from "./proxy/bce";

import { Issuer } from "openid-client";

import dotenv from "dotenv";
import config from "config";
import crypto from "crypto";
import cookieSession from "cookie-session";

dotenv.config();

const app = express();
const port = (config.has("port") && +config.get("port")) || 80;
const sentryUrlKey = config.get("sentryUrlKey");

const PROCONNECT_CLIENT_ID = config.get("proconnect.clientId") || "";
const PROCONNECT_CLIENT_SECRET = config.get("proconnect.clientSecret") || "";
const PROCONNECT_REDIRECT_URI = config.get("proconnect.redirectUri") || "";
const PROCONNECT_POST_LOGOUT_REDIRECT_URI =
  config.get("proconnect.postLogoutredirectUri") || "";
const ISSUER_URL = config.get("proconnect.urlDiscover") || "";
const SESSION = config.get("session.secret") || "";

let proconnectClient; // Variable pour stocker le client ProConnect une fois initialisé

if (!isDev()) {
  Sentry.init({ dsn: sentryUrlKey });
}

function generateRandomString(length) {
  return crypto.randomBytes(length).toString("hex");
}

async function init() {
  app.set("trust proxy", 1);

  //  Middleware CORS
  app.use(
    cors({
      origin: process.env.CLIENT_BASE_URL,
      credentials: true, // Autorise l'envoi des cookies avec les requêtes
    })
  );

  //  Middleware de session
  app.use(
    cookieSession({
      name: "pc_session",
      secret: SESSION, // Clé secrète pour signer le cookie de session
      secure: !isDev(),
      httpOnly: true,
      sameSite: isDev() ? "lax" : "none",
      maxAge: 60 * 60 * 1000,
    })
  );
  app.use((req, res, next) => {
    console.log("SESSION-ID:", req.sessionID, "route:", req.path);
    next();
  });
  //  Body parsers
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

  //  Intégration de ProConnect avec openid-client
  const proconnectIssuer = await Issuer.discover(ISSUER_URL);

  proconnectClient = new proconnectIssuer.Client({
    client_id: PROCONNECT_CLIENT_ID,
    client_secret: PROCONNECT_CLIENT_SECRET,
    redirect_uris: [PROCONNECT_REDIRECT_URI],
    response_types: ["code"],
    post_logout_redirect_uris: [PROCONNECT_POST_LOGOUT_REDIRECT_URI],
    id_token_signed_response_alg: "RS256",
    userinfo_signed_response_alg: "RS256",
  });

  registerBceProxy(app);

  await setupGraphql(app); // must be setup after body parser or parser won't work on other routes

  //  Routes
  app.get("/", (req, res) => {
    console.log("getting");
    res.status(200).json({
      status: "ok",
      message: "server running",
    });
  });

  // Route pour initier l'authentification avec ProConnect
  app.get("/api/auth/proconnect", (req, res) => {
    console.log("Before setting state in session:", req.session);

    const state = generateRandomString(32);
    const nonce = generateRandomString(32);

    // Stocker dans la session
    req.session.state = state;
    req.session.nonce = nonce;

    if (isDev()) {
      logger.debug({ state, nonce }, "Init ProConnect auth");
    }
    const authorizationUrl = proconnectClient.authorizationUrl({
      scope: "openid given_name usual_name email siret idp_id",
      state,
      nonce,
      // acr_values: "eidas1",
      claims: {
        id_token: {
          amr: {
            essential: true,
          },
        },
      },
    });

    res.redirect(authorizationUrl);
  });

  // Route de callback pour gérer la réponse de ProConnect
  app.get("/api/callback", async (req, res, next) => {
    try {
      const storedState = req.session?.state;
      const storedNonce = req.session?.nonce;

      if (!storedState || !storedNonce) {
        return res
          .status(400)
          .send("Session perdue : state ou nonce manquant.");
      }
      const params = proconnectClient.callbackParams(req);

      // Appel à proconnectClient.callback avec les checks appropriés
      const tokenSet = await proconnectClient.callback(
        PROCONNECT_REDIRECT_URI,
        params,
        {
          state: storedState,
          nonce: storedNonce,
        }
      );
      // Stocker tokenSet dans la session pour une utilisation ultérieure (par exemple, pour le logout)
      req.session.tokenSet = tokenSet;
      // Supprimer le state et le nonce de la session après l'appel réussi
      req.session.state = undefined;
      req.session.nonce = undefined;

      // Récupérer les informations utilisateur
      const userInfo = await proconnectClient.userinfo(tokenSet.access_token);
      req.session.user = userInfo;
      if (isDev()) {
        logger.debug({ tokenSet }, "TokenSet received from ProConnect");
      }
      if (isDev()) {
        logger.debug({ tokenSet }, "TokenSet received from ProConnect");
      }
      // Rediriger vers le frontend après l'authentification
      res.redirect("/");
    } catch (error) {
      console.error("Erreur lors de l'authentification :", error);
      next(error);
    }
  });

  app.get("/api/current_user", (req, res) => {
    if (req.session && req.session.user) {
      res.json({ user: req.session.user });
    } else {
      res.status(401).json({ error: "Utilisateur non connecté" });
    }
  });

  // Route de déconnexion
  app.get("/api/logout", (req, res) => {
    if (!proconnectClient || !req.session) {
      return res.redirect("/");
    }

    //  Récupère l’id_token pour la déconnexion OIDC
    const { tokenSet } = req.session;

    const endSessionUrl = tokenSet?.id_token
      ? proconnectClient.endSessionUrl({
          id_token_hint: tokenSet.id_token,
          post_logout_redirect_uri: PROCONNECT_POST_LOGOUT_REDIRECT_URI,
        })
      : "/";

    //  Efface entièrement la session (cookie-session)
    req.session = null;

    //  Redirige l’utilisateur vers le fournisseur
    res.redirect(endSessionUrl);
  });
}

function run() {
  app.use(Sentry.Handlers.requestHandler());
  app.use("/api", apiRouter);

  app.use(Sentry.Handlers.errorHandler());

  app.get("/healthz", (req, res) => {
    res.status(200).send("ok");
  });

  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });

  return app;
}

init();
export default run();
