import axios from "axios";
import {getYear, subMonths} from "date-fns";
import { getTwoCharactersMonth } from "../utils/date";
import {createCacheAdapter} from "../utils/axios-cache/axios-cache";
import {createCache} from "../utils/cache";

const ENTREPRISE_API_URL = "https://entreprise.api.gouv.fr/v2/";

const cache = createCache();

class ApiEntreprise {
  constructor({ log } = {}) {
    if (log) {
      this.request.interceptors.request.use(x => {
        x.meta = x.meta || {};
        x.meta.requestStartedAt = Date.now();
        return x;
      });

      this.request.interceptors.response.use(response => {
        console.log(`${response.config.url} : ${Date.now() - response.config.meta.requestStartedAt} ms`);
        return response;
      });
    }
  }
  request = axios.create({
    baseURL: ENTREPRISE_API_URL,
    params: {
      token: process.env.API_GOUV_TOKEN,
      context: "Tiers",
      recipient: "Direccte Occitanie",
      object: "FCEE - Direccte Occitanie",
      non_diffusables: true
    },
    adapter: createCacheAdapter({
      store: cache
    })
  });

  async getEntrepriseBySiren(siren) {
    const { data } = await this.request.get(`entreprises/${siren}`);
    return data?.entreprise;
  }

  async getEtablissementBySiret(siret) {
    const { data } = await this.request.get(`etablissements/${siret}`);

    return data?.etablissement;
  }

  async getLastEntrepriseEffectifsMensuelBySirenAndDate(siren, { date, length = 3, max = 24 } = {}) {
    return this.getEntrepriseEffectifsMensuelBySirenAndDate(siren, date).then(
      async (effectif) =>  length <= 1 ?
        [effectif] :
        [effectif].concat(await this.getLastEntrepriseEffectifsMensuelBySirenAndDate(siren, { date: subMonths(date, 1), length: length - 1, max: max - 1})),
    ).catch(
      () => max <= 1 ? [] : this.getLastEntrepriseEffectifsMensuelBySirenAndDate(siren, { date: subMonths(date, 1), length, max: max - 1})
    )
  }

  async getEntrepriseEffectifsMensuelBySirenAndDate(siren, date = new Date()) {
    const month = getTwoCharactersMonth(date);
    const year = getYear(date);

    const { data } = await this.request.get(`effectifs_mensuels_acoss_covid/${year}/${month}/entreprise/${siren}`);
    return data;
  }

  async getEntrepriseEffectifsAnnuelsBySiren(siren) {
    const { data } = await this.request.get(`effectifs_annuels_acoss_covid/${siren}`);

    return data;
  }

  async getRcsInfogreffeBySiren(siren) {
    const { data } = await this.request.get(`extraits_rcs_infogreffe/${siren}`);

    return data;
  }

  async getAssociation(siret) {
    const { data } = await this.request.get(`/associations/${siret}`);
    return data;
  }

  async getExercice(siret) {
    try {
      const { data } = await this.request.get(`/exercices/${siret}`);
      return data?.exercices || [];
    } catch (err) {
      return [];
    }
  }

  async getLastEtablissementEffectifsMensuelBySiretAndDate(siret, { date, length = 3, max = 24 } = {}) {
    return this.getEtablissementEffectifMensuelBySiretAndDate(siret, date).then(
      async (effectif) =>  length <= 1 ?
        [effectif] :
        [effectif].concat(await this.getLastEtablissementEffectifsMensuelBySiretAndDate(siret, { date: subMonths(date, 1), length: length - 1, max: max - 1})),
    ).catch(
      () => max <= 1 ? [] : this.getLastEtablissementEffectifsMensuelBySiretAndDate(siret, { date: subMonths(date, 1), length, max: max - 1})
    )
  }

  async getEtablissementEffectifMensuelBySiretAndDate(siret, date) {
    const month = getTwoCharactersMonth(date);
    const year = getYear(date);

    const { data } = await this.request.get(`effectifs_mensuels_acoss_covid/${year}/${month}/etablissement/${siret}`);
    return data;
  }
}

export default ApiEntreprise;