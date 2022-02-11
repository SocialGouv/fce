import axios from "axios";
import {omit, pick} from "lodash";
import {createMemoryStore} from "./memory-store";

export const createCacheAdapter = ({
  store = createMemoryStore()
} = {}) => {
  return async (config) => {
    const key = config.url;

    const value = await store.get(key);
    if (value) {
      return value;
    } else {
      const axiosConfig = omit(config, [
        "transformRequest",
        "transformResponse",
        "adapter"
      ])
      try {
        const response = await axios.request(axiosConfig);

        if (response.status >= 400 && response.status !== 404) {
          return response;
        }

        const serializableResponse = pick(
          response,
          [
            "status",
            "statusText",
            "config",
            "data",
            "headers",
          ]
        )

        await store.set(key, serializableResponse);

        return response;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  }
}
