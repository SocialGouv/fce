//

let config = null;

const globalConfig = {
  interactions: ["C", "3E", "T"],
  region: {
    occitanie: 76
  },
  emailInformation: {
    to: "oc.documentation@direccte.gouv.fr",
    subject: "FCE - demande d’informations complémentaires"
  }
};

function initConfig() {
  config = {
    ...globalConfig,
    "api_endpoint": process.env.REACT_APP_API_ENDPOINT || "/api"
  };
}

initConfig();

export default {
  get: key => (config && config[key]) || null,
  reset: initConfig
};
