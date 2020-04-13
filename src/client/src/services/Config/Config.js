import _get from "lodash.get";

const hosts2config = require("./configs/hosts2configs.json");

let config = null;
const log = console.warning || console.error || console.log;

const globalConfig = {
  maintenanceMode: process.env.REACT_APP_MAINTENANCE === "true",
  sentryUrlKey:
    "https://fecf5988311f413c9bba70e80454cc3a@sentry.fabrique.social.gouv.fr/35",
  auth: {
    expire: 86400 // 1j
  },
  sidebarEstablishmentsLimit: 20,
  monthsProceduresLimit: 36,
  interactions: {
    poles: ["C", "3E_SEER", "3E_SRC", "T"],
    types: {
      control: ["interactions_T", "interactions_T", "interactions_3E_SRC"],
      visit: ["interactions_3E_SEER"]
    }
  },
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
    debounce: 500
  },
  establishmentState: {
    actif: "A",
    ferme: "F"
  },
  appSearch: {
    client: {
      searchKey: process.env.REACT_APP_SEARCH_KEY,
      engineName: process.env.REACT_APP_SEARCH_ENGINE_NAME,
      endpointBase: process.env.REACT_APP_SEARCH_ENDPOINT_BASE
    },
    defaultOptions: {
      result_fields: {
        siren: { raw: {} },
        siret: { raw: {} },
        enterprise_name: { raw: {} },
        etatadministratifetablissement: { raw: {} },
        etablissementsiege: { raw: {} },
        codepostaletablissement: { raw: {} },
        libellecommuneetablissement: { raw: {} },
        trancheeffectifsetablissement: { raw: {} },
        activiteprincipaleetablissement: { raw: {} },
        activiteprincipaleetablissement_libelle: { raw: {} },
        enseigne1etablissement: { raw: {} }
      },
      page: {
        size: 20
      }
    }
  },
  poleSrcControlType: {
    FPC: "Formation professionnelle continue",
    CSA: "Taxe apprentissage",
    "Apprentissage (hors CSA)": "Apprentissage (hors taxe)",
    FSE: "FSE"
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
  sources: {
    customDateFormats: {
      EOS: { default: "DD/MM/YYYY", monthYear: "MMM YY" },
      Sirène: { default: "DD/MM/YYYY", year: "YYYY" },
      DSN: "MMM YY",
      Siene: "MMM YY",
      "ASP Extranet IAE2.0": "MMM YY",
      "ASP Extranet CUI": "MMM YY",
      "Ari@ne": "MMM YY",
      Extrapro: "MMM YY"
    }
  },
  agrementsIae: {
    ei: "Entreprise d'insertion",
    ai: "Association intermédiaire",
    aci: "Atelier et chantier d'insertion",
    etti: "Entreprise de travail temporaire d'insertion"
  },
  legifranceSearchUrl:
    "https://www.legifrance.gouv.fr/initRechAccordsEntreprise.do?champRaisonSociale=",
  codeInseeLength: 5
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
