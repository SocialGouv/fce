import { copyKeys } from "../utils";
import { Entreprise } from "frentreprise";

export default class DireccteEntreprise extends Entreprise {
  export() {
    const data = copyKeys(this, [
      "siren",
      "raison_sociale",
      "nom_commercial",
      "nom",
      "prenom",
      "sigle",
      "catégorie_juridique",
      "date_immatriculation_rcs",
      "date_de_creation",
      "date_de_radiation",
      "etat_entreprise",
      "date_etat",
      "categorie_entreprise",
      "activite",
      "tranche_effectif",
      "annee_tranche_effectif",
      "nombre_etablissements_actifs",
      "attestation_fiscale_dgfip",
      "attestation_sociale_acoss",
      "mandataires_sociaux"
    ]);

    data["etablissements"] = [this.etablissements.map(ets => ets.export())];

    return data;
  }
}

module.exports = DireccteEntreprise;
