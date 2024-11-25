import Auth, { getTokenFromRequest } from "../utils/auth";

export default async function withAuth(req, res, next) {
  try {
    console.log(req.session);

    // Vérifier si l'utilisateur est déjà authentifié via la session (ProConnect)
    if (req.session && req.session.user) {
      console.log("req.session && req.session.user true");

      // Utilisateur connecté via ProConnect
      req.user = req.session.user;
      return next();
    }

    // Sinon, vérifier l'authentification via token (Auth classique)
    const token = getTokenFromRequest(req);
    if (!token) {
      throw new Error("Missing Authorization header");
    }

    const user = await Auth.checkToken(token);

    if (!user) {
      throw new Error("Invalid token");
    }

    req.user = user;
    next();
  } catch (e) {
    console.error("auth middleware", e);
    res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
}
