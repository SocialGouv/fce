import axios from "axios";

const API_BASE_URL = "https://geo.api.gouv.fr";

const DEPARTEMENTS_URL = `${API_BASE_URL}/departements`;
const COMMUNES_URL = `${API_BASE_URL}/communes`;

const requestApi = async (url, params) => {
    try {
        const response = await axios.get(url, {
            params
        });

        return response.data;
    } catch (e) {
        console.error(e);
        return [];
    }
}

const searchDepartementByName = (nom) => requestApi(DEPARTEMENTS_URL, {
    nom,
    limit: 5,
    fields: "nom,code"
})

const searchDepartmentByCodePostal = (code) => requestApi(DEPARTEMENTS_URL, {
    code,
    limit: 5,
    fields: "nom,code"
});

export const searchDepartement = (query) =>
    isNaN(query) ? searchDepartementByName(query) : searchDepartmentByCodePostal(query);

const searchCommuneByName = (nom) =>
    requestApi(COMMUNES_URL, {
        nom,
        limit: 30,
        fields: "nom,code,codesPostaux",
        boost: "population"
    });

const searchCommuneByCodePostal = (codePostal) =>
    requestApi(COMMUNES_URL, {
        codePostal,
        limit: 30,
        fields: "nom,code,codesPostaux",
        boost: "population"
    });

export const searchCommune = (query) =>
    isNaN(query) ? searchCommuneByName(query) : searchCommuneByCodePostal(query);