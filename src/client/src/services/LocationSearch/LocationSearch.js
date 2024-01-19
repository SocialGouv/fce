import axios from "axios";

const API_BASE_URL = "https://geo.api.gouv.fr";

const DEPARTEMENTS_URL = `${API_BASE_URL}/departements`;
const COMMUNES_URL = `${API_BASE_URL}/communes`;
const REGIONS_URL = `${API_BASE_URL}/regions`;

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
export const serachDepartementsByRegion = (code) => {
  return requestApi(`${REGIONS_URL}/${code}/departements`);
};
const searchDepartmentByCodePostal = (code) =>
  requestApi(DEPARTEMENTS_URL, {
    code,
    fields: "nom,code",
    limit: 5,
  });
const searchRegionByName = (nom) =>
  requestApi(REGIONS_URL, {
    fields: "nom,code",
    limit: 5,
    nom,
  });

const searchRegionByCodePostal = (code) =>
  requestApi(REGIONS_URL, {
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
export const searchRegion = (query) =>
  isNaN(query) ? searchRegionByName(query) : searchRegionByCodePostal(query);

const searchCommuneByCodePostal = (codePostal) =>
  requestApi(COMMUNES_URL, {
    boost: "population",
    codePostal,
    fields: "nom,code,codesPostaux",
    limit: 30,
  });

export const searchCommune = (query) =>
  isNaN(query) ? searchCommuneByName(query) : searchCommuneByCodePostal(query);
