import { copyKeys } from "../../utils";
const { Etablissement } = require("frentreprise");

class DireccteEtablissement extends Etablissement {
  export(keys) {
    return {
      ...copyKeys(
        this,
        [
          "siege_social",
          "siret",
          "enseigne",
          "categorie_etablissement",
          "adresse",
          "adresse_components",
          "departement",
          "region",
          "code_region",
          "date_creation",
          "etat_etablissement",
          "etat_etablissement_libelle",
          "date_fin",
          "date_dernier_traitement_etablissement",
          "date_debut_activite_economique",
          "modalite_activite",
          "marchand",
          "etablissement_employeur",
          "tranche_effectif_insee",
          "annee_tranche_effectif_insee",
          "dernier_effectif_physique",
          "date_dernier_effectif_physique",
          "source_dernier_effectif_physique",
          "unite_controle_competente",
          "code_idcc",
          "libelle_idcc",
          "agefiph_derniere_annee_conformite_connue",
          "donnees_ecofi",
          "eti_pepite",
          "filiere_strategique",
          "structure_insertion_activite_economique",
          "structure_insertion_activite_economique_types",
          "activite_partielle_24_derniers_mois",
          "pse_en_projet_ou_en_cours",
          "interactions_3E",
          "interactions_T",
          "interactions_C",
          "association",
          "document_association",
          "predecesseur",
          "successeur",
          "caractere_saisonnier",
          "caractere_auxiliaire",
          "accords",
          "pole_competitivite",
          "ea",
          "alternance",
          "prime_embauche_pme",
          "naf",
          "libelle_naf",
          "nom_commercial",
          "nom",
          "prenom",
          "agrements_iae",
          "_dataSources",
          "_success"
        ],
        null
      ),
      _raw: this.getData()
    };
  }
}

module.exports = DireccteEtablissement;
