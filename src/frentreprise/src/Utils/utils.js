export default {
  convertDate(timestamp) {
    // If timestamp is too high, it probably is using miliseconds already
    if (timestamp > 100000000000) timestamp /= 1000;

    return (+timestamp && new Date(timestamp * 1000)) || undefined;
  },

  getCleanAddress(ad) {
    return `
    ${ad.numero_voie || ""} ${ad.type_voie || ""} ${ad.nom_voie || ""}
    ${ad.complement_adresse || ""} ${ad.code_postal || ""}
    ${ad.localite || ""}
    `
      .trim()
      .split("\n")
      .map(l => l.trim().replace(/\s+/g, " "))
      .filter(l => l.length > 0)
      .join("\n");
  },

  requestAPI: async (Axios, URL, params) => {
    try {
      const request = await Axios.get(URL, params);

      if (request && request.data) {
        console.log(`Request successed for ${request.request.res.responseUrl}`);
        return out || {};
      }
    } catch (exception) {
      if (exception && "request" in exception) {
        let { message, request, response, config } = exception;

        if (typeof config !== "object") config = {};
        if (typeof request.res !== "object") request.res = {};
        if (typeof response !== "object") response = {};
        if (!response.data) response.data = "(no data)";

        let { responseUrl } = request.res;
        responseUrl =
          responseUrl ||
          request._currentUrl ||
          (typeof request._currentRequest === "object" ||
          typeof request.path === "string"
            ? `${("" + (config.baseURL || "(unknown host)")).replace(
                /^(https?:\/\/[^\/]*).*$/i,
                "$1"
              )}${(request._currentRequest && request._currentRequest.path) ||
                request.path}`
            : "unknown url");

        const bodyData =
          typeof response.data === "object"
            ? JSON.stringify(response.data, true, 2)
            : response.data;

        const proxy = JSON.stringify(config.proxy || false, true, 2);
        console.error(
          `
--
⚠️  ${message}
${responseUrl}
Proxy: ${proxy}
--
${bodyData}
--
`.trim()
        );
      } else {
        console.error(exception);
      }
    }

    return Promise.resolve({});
  }
};
