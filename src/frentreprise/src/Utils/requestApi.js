import tunnel from "tunnel";

export default async (
  identifier,
  { axios, axiosConfig, token },
  ...apiCalls
) => {
  let out = {};

  const config = {
    ...axiosConfig,
    params: {
      token: token,
      context: "Tiers",
      recipient: "Direccte Occitanie",
      object: "FCEE - Direccte Occitanie",
      non_diffusables: true
    },
  };

  if (config.proxy && config.proxy.tunnel === true) {
    const agentConfig = { proxy: {} };

    if (config.proxy.host) {
      agentConfig.proxy.host = config.proxy.host;
    }

    if (config.proxy.port) {
      agentConfig.proxy.port = config.proxy.port;
    }

    if (config.proxy.auth) {
      agentConfig.proxy.proxyAuth = `${config.proxy.auth.username || ""}:${config.proxy.auth.password || ""
        }`;
    }

    config.proxy = false;
    config.httpsAgent = tunnel.httpsOverHttp(agentConfig);
  }

  const requests = apiCalls
    .filter((fn) => typeof fn === "function")
    .map((fn) => fn(identifier, axios, config));

  await Promise.all(requests).then((results) => {
    Object.assign(out, ...results);
  });

  return out;
};
