import axios from "axios";
import { getYear, subMonths } from "date-fns";
import { getTwoCharactersMonth } from "../utils/date";
import { createCacheAdapter } from "../utils/axios-cache/axios-cache";
import { createCache } from "../utils/cache";

const ENTREPRISE_API_URL = "https://entreprise.api.gouv.fr/v3/";
const CUSTOM_ENTREPRISE_API_URL =
  "https://entreprise.api.gouv.fr/v4/djepva/api-association/";

const cache = createCache();

class ApiEntrepriseV3 {
  constructor({ log } = {}) {
    if (log) {
      this.request.interceptors.request.use((x) => {
        x.meta = x.meta || {};
        x.meta.requestStartedAt = Date.now();
        return x;
      });

      this.request.interceptors.response.use((response) => {
        console.log(
          `${response.config.url} : ${
            Date.now() - response.config.meta.requestStartedAt
          } ms`
        );
        return response;
      });
    }
  }
  request = axios.create({
    // baseURL: ENTREPRISE_API_URL,
    params: {
      token: process.env.API_GOUV_TOKEN,
      context: "Tiers",
      recipient: "17670001100016",
      object: "FCEE - Direccte Occitanie",
      non_diffusables: true,
    },
    adapter: createCacheAdapter({
      store: cache,
    }),
  });

  async getEtablissementBySiret(siret) {
    const { data } = await this.request.get(
      `${ENTREPRISE_API_URL}insee/sirene/etablissements/${siret}`
    );
    return data?.data;
  }
  async getRcsInfogreffeBySiren(siren) {
    try {
      const { data } = await this.request.get(
        `${ENTREPRISE_API_URL}infogreffe/rcs/unites_legales/${siren}/extrait_kbis`
      );
      return data?.data;
    } catch (error) {
      console.error(
        `Error fetching RcsInfogreffe for siren ${siren}: ${error}`
      );
      throw new Error("Failed to fetch RcsInfogreffe");
    }
  }
  async getMandatairesSociaux(siren) {
    const { data } = await this.request.get(
      `${ENTREPRISE_API_URL}infogreffe/rcs/unites_legales/${siren}/mandataires_sociaux`
    );
    return data?.data;
  }
  async getSiegeSocial(siren) {
    try {
      const { data } = await this.request.get(
        `${ENTREPRISE_API_URL}insee/sirene/unites_legales/${siren}/siege_social`
      );
      return data?.data;
    } catch (error) {
      console.error(`Error fetching siege social for siren ${siren}: ${error}`);
      throw new Error("Failed to fetch siege social");
    }
  }

  async getTva(siren) {
    try {
      const { data } = await this.request.get(
        `${ENTREPRISE_API_URL}european_commission/unites_legales/${siren}/numero_tva`
      );
      return data?.data?.tva_number;
    } catch (error) {
      console.error(`Error fetching numero TVA for siren ${siren}: ${error}`);
      throw new Error("Failed to fetch numero TVA");
    }
  }
  async getAssociation(siret) {
    try {
      const { data } = await this.request.get(
        `${CUSTOM_ENTREPRISE_API_URL}associations/open_data/${siret}`
      );
      return data;
    } catch (error) {
      console.error(
        `Error fetching numero association open data for siren ${siren}: ${error}`
      );
      throw new Error("Failed to fetch numero association open data");
    }
  }
}

export default ApiEntrepriseV3;
