import config from "config";
import { createClient } from "redis";
import { createRedisStore } from "./axios-cache/redis-store";
import {createMemoryStore} from "./axios-cache/memory-store";

const createRedis = () => {
  try {
    const client = createClient({
      url: config.get("cache.redisUrl"),
    });

    return createRedisStore({ client });
  } catch (err) {
    console.error(err);
  }
}

export const createCache = () => config.get("cache.type") === "redis" ? createRedis() : createMemoryStore();
