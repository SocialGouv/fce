import axios from "axios";
import config from "config";
import { get } from "lodash/fp"

const entrepriseApiBaseUrl = "https://entreprise.api.gouv.fr/v2";

const params = {
  token: config.get("APIGouv.token"),
  context: "Tiers",
  recipient: "Direccte Occitanie",
  object: "FCEE - Direccte Occitanie",
  non_diffusables: true
};

export const searchSiret = (siret) => axios.get(
  `${entrepriseApiBaseUrl}/etablissements/${siret}`,
  { params }
).then(get("data"));

export const searchSiren = (siren) => axios.get(
  `${entrepriseApiBaseUrl}/entreprises/${siren}`,
  { params }
).then(get("data"));

export const formatEntrepriseResponse = ({
  siren,
  raison_sociale: enterprise_name,
  tranche_effectif_salarie_entreprise: {
    code: lastdsntrancheeffectifsetablissement
  },
  naf_entreprise: activiteprincipaleetablissement,
  libelle_naf_entreprise: activiteprincipaleetablissement_libelle,
  etat_administratif: {
    value: etatadministratifetablissement
  }
}) => ({
  siren,
  enterprise_name,
  lastdsntrancheeffectifsetablissement,
  activiteprincipaleetablissement,
  activiteprincipaleetablissement_libelle,
  etatadministratifetablissement
});

export const formatEtablissementResponse = ({
  siret,
  siege_social: etablissementsiege,
  adresse: {
    code_postal: codepostaletablissement,
    localite: libellecommuneetablissement
  }
}) => ({
  siret,
  etablissementsiege,
  codepostaletablissement,
  libellecommuneetablissement,
});