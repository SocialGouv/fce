import axios from "axios";

const API_BASE_URL = "https://geo.api.gouv.fr";

const DEPARTEMENTS_URL = `${API_BASE_URL}/departements`;
const COMMUNES_URL = `${API_BASE_URL}/communes`;

const requestApi = async (url, params) => {
  try {
    const response = await axios.get(url, {
      params,
    });

    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const searchDepartementByName = (nom) =>
  requestApi(DEPARTEMENTS_URL, {
    fields: "nom,code",
    limit: 5,
    nom,
  });

const searchDepartmentByCodePostal = (code) =>
  requestApi(DEPARTEMENTS_URL, {
    code,
    fields: "nom,code",
    limit: 5,
  });

export const searchDepartement = (query) =>
  isNaN(query)
    ? searchDepartementByName(query)
    : searchDepartmentByCodePostal(query);

const searchCommuneByName = (nom) =>
  requestApi(COMMUNES_URL, {
    boost: "population",
    fields: "nom,code,codesPostaux",
    limit: 30,
    nom,
  });

const searchCommuneByCodePostal = (codePostal) =>
  requestApi(COMMUNES_URL, {
    boost: "population",
    codePostal,
    fields: "nom,code,codesPostaux",
    limit: 30,
  });

export const searchCommune = (query) =>
  isNaN(query) ? searchCommuneByName(query) : searchCommuneByCodePostal(query);
