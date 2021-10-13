import { getTokenFromRequest } from "../utils/auth";

const removeExpired = (cache, now, period) =>
  cache.filter(time => now - time < period);

export const limitRate = ({ count, period }) => {
  const cache = new Map();

  const cleanup = () => {
    cache.forEach(([key, value]) => {
      const newCacheValue = removeExpired(value);

      if (newCacheValue.length === 0) {
        cache.delete(key);
      } else {
        cache.set(key, newCacheValue);
      }
    })
  };

  setInterval(cleanup, 30000);

  return (req, res, next) => {
    const token = getTokenFromRequest(req);

    if (!token) {
      next();
      return;
    }

    const previousCache = cache.get(token) || [];

    const activeCache = removeExpired(previousCache, Date.now(), period);

    if (activeCache.length > count) {
      console.log("Calls mitigated");
      res.status(403)
        .json({
          message : "Request rate exceeded"
        });
      return;
    }

    activeCache.push(Date.now());

    cache.set(token, activeCache);
    next();
  }
}
