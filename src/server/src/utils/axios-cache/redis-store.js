export const createRedisStore = ({
  client,
  ttl = 24 * 60 * 60
} = {}) => {
  const clientConnection = client.connect();

  clientConnection.catch(err => {
    console.error(err)
  })

  client.on("error", (err) => {
    console.error("Redis client error", err);
  })

  return {
    get: async (key) => {
      await clientConnection;

      const rawValue = await client.get(key);
      return rawValue ? JSON.parse(rawValue) : null;
    },
    set: async (key, value) => {
      await clientConnection;

      await client.set(key, JSON.stringify(value), {
        EX: ttl
      });
    }
  }
}
