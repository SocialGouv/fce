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
        "attestation_acoss",
        "attestation_dgfip",
        "annee_tranche_effectif",
        "capital_social",
        "categorie_entreprise",
        "categorie_juridique",
        "categorie_juridique_code",
        "date_immatriculation_rcs",
        "date_de_creation",
        "date_mise_a_jour",
        "date_de_radiation",
        "entreprise_employeur",
        "etat_entreprise",
        "libelle_naf",
        "mandataires_sociaux",
        "naf",
        "nom_commercial",
        "nom",
        "nombre_etablissements_actifs",
        "prenom",
        "raison_sociale",
        "sigle",
        "siren",
        "siret_siege_social",
        "tranche_effectif",
        "_dataSources",
        "_success"
      ],
      null
    );

    data["etablissements"] = this.etablissements.map(ets => {
      return ets.export();
    });

    return {
      ...data,
      _raw: this.getData()
    };
  }
}

module.exports = DireccteEntreprise;
