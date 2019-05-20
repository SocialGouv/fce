import Auth from "../utils/auth";

export default async (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (!authorizationHeader) {
      throw new Error("Missing Authorization header");
    }

    const token = authorizationHeader.replace("Bearer ", "");
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
      message: "Authentication failed"
    });
  }
};
