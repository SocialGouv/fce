import Auth, {getTokenFromRequest} from "../utils/auth";

export default async function withAuth (req, res, next) {
  try {
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
