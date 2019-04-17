const hosts2config = require("./configs/hosts2configs.json");

let config = null;
const log = console.warning || console.error || console.log;
const globalConfig = {
  auth: {
    expire: 86400 // 1j
  },
  interactions: ["C", "3E", "T"],
  region: {
    occitanie: 76
  },
  emailInformation: {
    to: "oc.documentation@direccte.gouv.fr",
    subject: "FCE - demande d’informations complémentaires"
  },
  advancedSearch: {
    minTerms: 2,
    debounce: 500,
    terms: ["q", "naf", "commune", "siegeSocial"]
  },
  accords: [
    { key: "epargne", value: "Epargne salariale" },
    { key: "remuneration", value: "Salaires / Rémunérations" },
    { key: "temps_travail", value: "Durée du travail / Repos" },
    { key: "egalite_pro", value: "Egalité professionnelle femmes / hommes" },
    { key: "emploi", value: "Emploi / GPEC" },
    { key: "conditions_travail", value: "Conditions de travail" },
    {
      key: "protection_sociale",
      value: "Prévoyance / protection sociale complémentaire"
    },
    {
      key: "nouvelles_technologies",
      value: "Nouvelles technologies numériques"
    },
    { key: "classifications", value: "Classifications" },
    {
      key: "droit_syndical",
      value: "Droit syndical, représentation du personnel"
    },
    { key: "formation", value: "Formation professionnelle" },
    { key: "autres", value: "Autres" }
  ]
};

function initConfig() {
  if (window && window.location && window.location.hostname) {
    if (hosts2config[window.location.hostname]) {
      return (config = {
        ...globalConfig,
        ...require(`./configs/${hosts2config[window.location.hostname]}.json`)
      });
    } else {
      log("No config file for hostname : " + window.location.hostname);
    }
  } else {
    log("Cannot get value of : window.location.hostname");
  }
  config = {};
}

initConfig();

export default {
  get: key => (config && config[key]) || null,
  reset: initConfig
};
