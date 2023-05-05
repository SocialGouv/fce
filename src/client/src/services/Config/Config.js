import _get from "lodash.get";

import { formatNumber } from "../../helpers/utils";

const hosts2config = require("./configs/hosts2configs.json");

let config = null;
const log = console.warning || console.error || console.log;

const globalConfig = {
  accords: [
    { key: "epargne", value: "Epargne salariale" },
    { key: "remuneration", value: "Salaires / Rémunérations" },
    { key: "temps_travail", value: "Durée du travail / Repos" },
    { key: "egalite_pro", value: "Egalité professionnelle femmes / hommes" },
    { key: "emploi", value: "Emploi / GPEC" },
    { key: "conditions_travail", value: "Conditions de travail" },
    {
      key: "protection_sociale",
      value: "Prévoyance / protection sociale complémentaire",
    },
    {
      key: "nouvelles_technologies",
      value: "Nouvelles technologies numériques",
    },
    { key: "classifications", value: "Classifications" },
    {
      key: "droit_syndical",
      value: "Droit syndical, représentation du personnel",
    },
    { key: "formation", value: "Formation professionnelle" },
    { key: "autres", value: "Autres" },
  ],
  advancedSearch: {
    debounce: 500,
    minTerms: 2,
  },
  agrementsIae: {
    aci: "Atelier et chantier d'insertion",
    ai: "Association intermédiaire",
    ei: "Entreprise d'insertion",
    etti: "Entreprise de travail temporaire d'insertion",
  },
  api_endpoint: process.env.REACT_APP_API_URL || "/api",
  appSearch: {
    defaultOptions: {
      page: {
        size: 20,
      },
      result_fields: {
        activiteprincipaleetablissement: { raw: {} },
        activiteprincipaleetablissement_libelle: { raw: {} },
        codepostaletablissement: { raw: {} },
        enseigne1etablissement: { raw: {} },
        enterprise_name: { raw: {} },
        etablissementsiege: { raw: {} },
        etatadministratifetablissement: { raw: {} },
        lastdsntrancheeffectifsetablissement: { raw: {} },
        libellecommuneetablissement: { raw: {} },
        siren: { raw: {} },
        siret: { raw: {} },
        trancheeffectifsetablissement: { raw: {} },
      },
      sort: { etatadministratifetablissement: "asc" },
    },
  },
  auth: {
    // 1j,
    codeLength: 5,
    expire: 86400,
  },
  codeInseeLength: 5,
  contact: {
    mailto: "bce@travail.gouv.fr",
  },
  dataSources: [
    { id: "PG", priority: 100 },
    { id: "ApiGouv", priority: 80 },
    //{ id: "ApiGouvAssociations", priority: 80 }
  ],
  emailInformation: {
    subject: "FCE - demande d’informations complémentaires",
    to: "oc.documentation@direccte.gouv.fr",
  },
  establishmentState: {
    actif: "A",
    ferme: "F",
  },
  inseeSizeRanges: {
    "-": "-",
    0: "0 salarié",
    "0 salarié": "0 salarié (pas d'effectif au 31/12 )",
    "01": "1 ou 2 salariés",
    "02": "3 à 5 salariés",
    "03": "6 à 9 salariés",
    11: "10 à 19 salariés",
    12: "20 à 49 salariés",
    21: "50 à 99 salariés",
    22: "100 à 249 salariés",
    31: "250 à 499 salariés",
    32: "500 à 999 salariés",
    41: `${formatNumber(1000)} à ${formatNumber(1999)} salariés`,
    42: `${formatNumber(2000)} à ${formatNumber(4999)} salariés`,
    51: `${formatNumber(5000)} salariés et plus`,
    NN: "Unité non employeuse",
    SP: "Secteur public",
  },
  interactions: {
    poles: ["C", "3E_SEER", "3E_SRC", "T"],
    types: {
      control: ["interactions_C", "interactions_T", "interactions_3E_SRC"],
      visit: ["interactions_3E_SEER"],
    },
  },
  legifranceSearchUrl: {
    accords: "https://www.legifrance.gouv.fr/liste/acco?siret=",
    idcc: "https://www.legifrance.gouv.fr/liste/idcc?idcc_suggest=",
  },
  maintenanceMode: /*process.env.REACT_APP_MAINTENANCE === "true"*/ true,
  pgApi: {
    timeout: 10000,
  },
  poleSrcControlType: {
    "Apprentissage (hors CSA)": "Apprentissage (hors taxe)",
    CSA: "Taxe apprentissage",
    FPC: "Formation professionnelle continue",
    FSE: "FSE",
    "Refus d'enregistrement": "Refus d'enregistrement",
  },
  region: {
    occitanie: 76,
  },
  sidebarEstablishmentsLimit: 20,
  sources: {
    customDateFormats: {
      "ASP Extranet CUI": "MMM YY",
      "ASP Extranet IAE2.0": "MMM YY",
      "Ari@ne": "MMM YY",
      DSN: "MMM YYYY",
      EOS: { default: "DD/MM/YYYY", monthYear: "MMM YY" },
      Extrapro: "MMM YY",
      Siene: "MMM YY",
      Sirène: { default: "DD/MM/YYYY", year: "YYYY" },
    },
  },
  state: {
    error: "error",
    finish: "finish",
    loading: "loading",
    success: "success",
    unauthorize: "unauthorize",
  },
  strapi: {
    domain: `//strapi-${window.location.hostname}`,
    path: {
      "/a-propos": "/pages/1",
      "/mentions-legales": "/pages/4",
      "/politique-de-confidentialite": "/pages/6",
      "/sources-des-donnees": "/pages/3",
    },
  },
};

function initConfig() {
  if (window && window.location && window.location.hostname) {
    if (hosts2config[window.location.hostname]) {
      return (config = {
        ...globalConfig,
        ...require(`./configs/${hosts2config[window.location.hostname]}.json`),
      });
    } else {
      log("No config file for hostname : " + window.location.hostname);
    }
  } else {
    log("Cannot get value of : window.location.hostname");
  }
  config = {
    ...globalConfig,
  };
}

initConfig();

export default {
  get: (key) => config && _get(config, key),
  reset: initConfig,
};
