export default {
  convertDate(timestamp) {
    // If timestamp is too high, it probably is using miliseconds already
    if (timestamp > 100000000000) timestamp /= 1000;

    return (timestamp && new Date(timestamp * 1000)) || undefined;
  },

  getCleanAddress(ad) {
    return `
    ${ad.numero_voie || ""} ${ad.type_voie || ""} ${ad.nom_voie || ""}
    ${ad.complement_adresse || ""} ${ad.code_postal || ""}
    ${ad.localite || ""}
    `
      .trim()
      .split("\n")
      .map(l => l.trim())
      .join("\n");
  },

  requestAPI: async (Axios, URL, params, callback) => {
    const out = {};

    try {
      const request = await Axios.get(URL, params);

      if (request && request.data) {
        await Promise.resolve(callback(out, request.data));
      }
    } catch (exception) {
      console.error(exception);
    }

    return out;
  }
};
