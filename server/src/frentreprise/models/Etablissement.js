import { copyKeys } from "../../utils";
const { Etablissement } = require(__DIST
  ? "frentreprise"
  : "../../../lib/frentreprise/src/frentreprise");

class DireccteEtablissement extends Etablissement {
  export(keys) {
    return copyKeys(
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
        "activite",
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
        "codes_idcc",
        "annee_idcc",
        "nombre_idcc",
        "agefiph_derniere_annee_conformite_connue",
        "donnees_ecofi",
        "eti_pepite",
        "filiere_strategique",
        "structure_insertion_activite_economique",
        "structure_insertion_activite_economique_types",
        "activite_partielle_24_derniers_mois",
        "pse_en_projet_ou_en_cours",
        "direccte",
        "association",
        "document_association",
        "predecesseur",
        "successeur",
        "_dataSources"
      ],
      null
    );
  }
}

module.exports = DireccteEtablissement;
