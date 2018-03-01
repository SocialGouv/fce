import { copyKeys } from "../utils";
const { Etablissement } = require(__DIST
  ? "frentreprise"
  : "../../lib/frentreprise/src/frentreprise");

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
        "departement",
        "region",
        "date_creation",
        "etat_etablissement",
        "date_etat",
        "activite",
        "date_debut_activite_economique",
        "modalite_activite",
        "marchand",
        "association",
        "lien_status",
        "etablissement_employeur",
        "tranche_effectif_insee",
        "annee_tranche_effectif_insee",
        "dernier_effectif__physique",
        "date_dernier_effectif_physique",
        "source_dernier_effectif_physique",
        "unite_controle_competente",
        "code_idcc",
        "annee_idcc",
        "nombre_idcc",
        "declaration_agefiph",
        "derniere_annee_conformite_connue",
        "date_fin_exercice",
        "chiffre_affaire",
        "eti_pepite",
        "filiere_strategique",
        "structure_insertion_activite_economique",
        "mutations économiques",
        "activite_partielle_24_derniers_mois",
        "pse_en_projet_ou_en_cours",
        "direccte"
      ],
      null
    );
  }
}

module.exports = DireccteEtablissement;
