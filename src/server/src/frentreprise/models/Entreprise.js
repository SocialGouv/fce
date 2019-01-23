import { copyKeys } from "../../utils";
import DireccteEtablissement from "./Etablissement";

const { Entreprise } = require("frentreprise");

export default class DireccteEntreprise extends Entreprise {
  constructor(data, etsModel = DireccteEtablissement) {
    super(data, etsModel);
  }

  export() {
    const data = copyKeys(
      this,
      [
        "siren",
        "raison_sociale",
        "nom_commercial",
        "nom",
        "prenom",
        "sigle",
        "categorie_juridique",
        "date_immatriculation_rcs",
        "date_de_creation",
        "date_de_radiation",
        "etat_entreprise",
        "categorie_entreprise",
        "tranche_effectif",
        "annee_tranche_effectif",
        "nombre_etablissements_actifs",
        "mandataires_sociaux",
        "siret_siege_social",
        "attestation_dgfip",
        "attestation_acoss",
        "capital_social",
        "forme_juridique",
        "forme_juridique_code",
        "naf",
        "libelle_naf",
        "entreprise_employeur",
        "_dataSources"
      ],
      null
    );

    data["etablissements"] = this.etablissements.map(ets => {
      return ets.export();
    });

    return data;
  }
}

module.exports = DireccteEntreprise;
