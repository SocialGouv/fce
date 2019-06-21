import _get from "lodash.get";

const hosts2config = require("./configs/hosts2configs.json");

let config = null;
const log = console.warning || console.error || console.log;
const globalConfig = {
  auth: {
    expire: 86400 // 1j
  },
  sidebarEstablishmentsLimit: 20,
  interactions: ["C", "3E", "T"],
  region: {
    occitanie: 76
  },
  contact: {
    mailto: "chloe.mandelblat@direccte.gouv.fr"
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
  ],
  inseeSizeRanges: {
    NN: "Unité non employeuse",
    "0 salarié": "0 salarié (pas d'effectif au 31/12 )",
    "01": "1 ou 2 salariés",
    "02": "3 à 5 salariés",
    "03": "6 à 9 salariés",
    "11": "10 à 19 salariés",
    "12": "20 à 49 salariés",
    "21": "50 à 99 salariés",
    "22": "100 à 199 salariés",
    "31": "200 à 249 salariés",
    "32": "250 à 499 salariés",
    "41": "500 à 999 salariés",
    "42": "1 000 à 1 999 salariés",
    "51": "2 000 à 4 999 salariés",
    "52": "5 000 à 9 999 salariés",
    "53": "10 000 salariés et plus"
  },
  agrementsIae: {
    ei: "Entreprise d'insertion",
    ai: "Association intermédiaire",
    aci: "Atelier et chantier d'insertion",
    etti: "Entreprise de travail temporaire d'insertion"
  }
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
  get: key => config && _get(config, key),
  reset: initConfig
};
