import config from "config";

const parseAuthHeader = (header) => header.split(" ");

const isBearerType = (type) => type.toLowerCase() === "bearer";

const isValidToken = (token) => token === config.get("api.token")

export const adminAuth = () => (req, res, next) => {
  const authHeader = req.get("authorization");

  const [type, token] = parseAuthHeader(authHeader);

  if (!isBearerType(type)) {
    res.status(403)
      .json({
        message: "Invalid authorization header type"
      });
    return;
  }

  if (!isValidToken(token)) {
    res.status(403)
      .json({
        message: "Invalid token"
      });

    return;
  }


  next();
}
