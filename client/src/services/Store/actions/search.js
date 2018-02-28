import * as types from "../constants/ActionTypes";

export const search = term => (dispatch, getState) => {
  dispatch(_setTerms({ raisonSociale: term }));

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let response = {
        data: {
          query: { q: "79418530600014", isSIRET: true, isSIREN: false },
          results: [
            {
              siren: null,
              raison_sociale: "SIMTIE",
              nom_commercial: null,
              nom: null,
              prenom: null,
              sigle: null,
              categorie_juridique:
                "Société à responsabilité limitée (sans autre indication)",
              date_immatriculation_rcs: null,
              date_de_creation: "2013-06-30T22:00:00.000Z",
              date_de_radiation: "2016-04-11T22:00:00.000Z",
              etat_entreprise: {
                label: "Actif",
                date: "2013-06-30T22:00:00.000Z"
              },
              categorie_entreprise: "PME",
              activite: null,
              tranche_effectif: null,
              annee_tranche_effectif: null,
              nombre_etablissements_actifs: null,
              attestation_fiscale_dgfip: null,
              attestation_sociale_acoss: null,
              mandataires_sociaux: null,
              etablissements: [
                [
                  {
                    siege_social: true,
                    siret: "79418530600014",
                    enseigne: null,
                    categorie_etablissement: null,
                    adresse: {
                      l1: "SIMTIE",
                      l2: "6 RUE FRANCOIS ARAGO",
                      l3: "31830 PLAISANCE DU TOUCH",
                      l4: null,
                      l5: null,
                      l6: null,
                      l7: null,
                      numero_voie: "6",
                      type_voie: "RUE",
                      nom_voie: "FRANCOIS ARAGO",
                      complement_adresse: null,
                      code_postal: "31830",
                      localite: "PLAISANCE DU TOUCH",
                      code_insee_localite: "31424"
                    },
                    departement: null,
                    region: null,
                    date_creation: null,
                    etat_etablissement: null,
                    date_etat: null,
                    activite: null,
                    date_debut_activite_economique: null,
                    modalite_activite: null,
                    marchand: null,
                    association: null,
                    lien_status: null,
                    etablissement_employeur: null,
                    tranche_effectif_insee: null,
                    annee_tranche_effectif_insee: null,
                    dernier_effectif__physique: null,
                    date_dernier_effectif_physique: null,
                    source_dernier_effectif_physique: null,
                    unite_controle_competente: null,
                    code_idcc: null,
                    annee_idcc: null,
                    nombre_idcc: null,
                    declaration_agefiph: null,
                    derniere_annee_conformite_connue: null,
                    date_fin_exercice: null,
                    chiffre_affaire: null,
                    eti_pepite: null,
                    filiere_strategique: null,
                    structure_insertion_activite_economique: null,
                    "mutations économiques": null,
                    activite_partielle_24_derniers_mois: null,
                    pse_en_projet_ou_en_cours: null,
                    direccte: null
                  }
                ]
              ]
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
  dispatch(_setTerms(terms));

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

const _setTerms = terms => ({
  type: types.SEARCH_TERMS,
  terms
});
