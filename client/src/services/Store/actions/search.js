import * as types from "../constants/ActionTypes";

export const search = term => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let response = {
        data: {
          results: [
            {
              entreprise: {
                siren: "418166096",
                capital_social: 509525,
                numero_tva_intracommunautaire: "FR16418166096",
                forme_juridique: "SA à directoire (s.a.i.)",
                forme_juridique_code: "5699",
                nombre_etablissements_actifs: 1,
                nom_commercial: "BOULETTE-DE-VIANDE-TECHNOLOGY",
                procedure_collective: false,
                raison_sociale: "BOULETTE-DE-VIANDE-TECHNOLOGY",
                siret_siege_social: "41816609600069",
                code_effectif_entreprise: "22",
                date_creation: 891381600,
                nom: null,
                prenom: null,
                etat_administratif: {
                  value: "Actif",
                  date_mise_a_jour: 891381600
                },
                date_radiation: null,
                mandataires_sociaux: [
                  {
                    nom: "HISQUIN",
                    prenom: "FRANCOIS",
                    fonction: "PRESIDENT DU DIRECTOIRE",
                    date_naissance: "1965-01-27",
                    date_naissance_timestamp: -155523600,
                    dirigeant: true,
                    raison_sociale: "",
                    identifiant: "",
                    type: "PP"
                  },
                  {
                    nom: "NIBOUREL",
                    prenom: "CHRISTIAN",
                    fonction: "PRESIDENT DU CONSEIL DE SURVEILLANCE",
                    date_naissance: "1958-01-09",
                    date_naissance_timestamp: -378003600,
                    dirigeant: true,
                    raison_sociale: "",
                    identifiant: "",
                    type: "PP"
                  }
                ]
              },
              gateway_error: false
            },
            {
              entreprise: {
                siren: "418166095",
                capital_social: 509525,
                numero_tva_intracommunautaire: "FR16418166096",
                forme_juridique: "SA à directoire (s.a.i.)",
                forme_juridique_code: "5699",
                nombre_etablissements_actifs: 1,
                nom_commercial: "DINDON-TECHNOLOGY",
                procedure_collective: false,
                raison_sociale: "DINDON-TECHNOLOGY",
                siret_siege_social: "41816609600069",
                code_effectif_entreprise: "22",
                date_creation: 891381600,
                nom: null,
                prenom: null,
                etat_administratif: {
                  value: "Actif",
                  date_mise_a_jour: 891381600
                },
                date_radiation: null,
                mandataires_sociaux: [
                  {
                    nom: "HISQUIN",
                    prenom: "FRANCOIS",
                    fonction: "PRESIDENT DU DIRECTOIRE",
                    date_naissance: "1965-01-27",
                    date_naissance_timestamp: -155523600,
                    dirigeant: true,
                    raison_sociale: "",
                    identifiant: "",
                    type: "PP"
                  },
                  {
                    nom: "NIBOUREL",
                    prenom: "CHRISTIAN",
                    fonction: "PRESIDENT DU CONSEIL DE SURVEILLANCE",
                    date_naissance: "1958-01-09",
                    date_naissance_timestamp: -378003600,
                    dirigeant: true,
                    raison_sociale: "",
                    identifiant: "",
                    type: "PP"
                  }
                ]
              },
              gateway_error: false
            }
          ]
        }
      };
      dispatch(_setSearchResponses(response.data.results));
      resolve(response);
    }, 500);
  });
};

export const advancedSearch = terms => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let response = {
        data: {
          results: [
            {
              entreprise: {
                siren: "418166096",
                capital_social: 509525,
                numero_tva_intracommunautaire: "FR16418166096",
                forme_juridique: "SA à directoire (s.a.i.)",
                forme_juridique_code: "5699",
                nombre_etablissements_actifs: 1,
                nom_commercial: "BOULETTE-DE-VIANDE-TECHNOLOGY",
                procedure_collective: false,
                raison_sociale: "BOULETTE-DE-VIANDE-TECHNOLOGY",
                siret_siege_social: "41816609600069",
                code_effectif_entreprise: "22",
                date_creation: 891381600,
                nom: null,
                prenom: null,
                etat_administratif: {
                  value: "Actif",
                  date_mise_a_jour: 891381600
                },
                date_radiation: null,
                mandataires_sociaux: [
                  {
                    nom: "HISQUIN",
                    prenom: "FRANCOIS",
                    fonction: "PRESIDENT DU DIRECTOIRE",
                    date_naissance: "1965-01-27",
                    date_naissance_timestamp: -155523600,
                    dirigeant: true,
                    raison_sociale: "",
                    identifiant: "",
                    type: "PP"
                  },
                  {
                    nom: "NIBOUREL",
                    prenom: "CHRISTIAN",
                    fonction: "PRESIDENT DU CONSEIL DE SURVEILLANCE",
                    date_naissance: "1958-01-09",
                    date_naissance_timestamp: -378003600,
                    dirigeant: true,
                    raison_sociale: "",
                    identifiant: "",
                    type: "PP"
                  }
                ]
              },
              gateway_error: false
            },
            {
              entreprise: {
                siren: "418166095",
                capital_social: 509525,
                numero_tva_intracommunautaire: "FR16418166096",
                forme_juridique: "SA à directoire (s.a.i.)",
                forme_juridique_code: "5699",
                nombre_etablissements_actifs: 1,
                nom_commercial: "DINDON-TECHNOLOGY",
                procedure_collective: false,
                raison_sociale: "DINDON-TECHNOLOGY",
                siret_siege_social: "41816609600069",
                code_effectif_entreprise: "22",
                date_creation: 891381600,
                nom: null,
                prenom: null,
                etat_administratif: {
                  value: "Actif",
                  date_mise_a_jour: 891381600
                },
                date_radiation: null,
                mandataires_sociaux: [
                  {
                    nom: "HISQUIN",
                    prenom: "FRANCOIS",
                    fonction: "PRESIDENT DU DIRECTOIRE",
                    date_naissance: "1965-01-27",
                    date_naissance_timestamp: -155523600,
                    dirigeant: true,
                    raison_sociale: "",
                    identifiant: "",
                    type: "PP"
                  },
                  {
                    nom: "NIBOUREL",
                    prenom: "CHRISTIAN",
                    fonction: "PRESIDENT DU CONSEIL DE SURVEILLANCE",
                    date_naissance: "1958-01-09",
                    date_naissance_timestamp: -378003600,
                    dirigeant: true,
                    raison_sociale: "",
                    identifiant: "",
                    type: "PP"
                  }
                ]
              },
              gateway_error: false
            }
          ]
        }
      };
      dispatch(_setSearchResponses(response.data.results));
      resolve(response);
    }, 500);
  });
};

const _setSearchResponses = results => ({
  type: types.SEARCH_RESULTS,
  results
});
