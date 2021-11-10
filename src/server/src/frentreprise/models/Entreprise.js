import { copyKeys } from "../../utils";
import DireccteEtablissement from "./Etablissement";
// eslint-disable-next-line node/no-missing-import
import { Entreprise } from "frentreprise";

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
        "date_de_creation",
        "date_mise_a_jour",
        "date_de_radiation",
        "diffusable_commercialement",
        "entreprise_employeur",
        "etat_entreprise",
        "idcc",
        "interactions_3E_SEER",
        "interactions_3E_SRC",
        "interactions_T",
        "interactions_C",
        "libelle_naf",
        "mandataires_sociaux",
        "naf",
        "nom_commercial",
        "nom",
        "nombre_etablissements_actifs",
        "prenom",
        "pse",
        "lice",
        "rcc",
        "raison_sociale",
        "sigle",
        "siren",
        "siret_siege_social",
        "tranche_effectif",
        "rcs_date_immatriculation",
        "rcs_observations",
        "accords",
        "activite_partielle",
        "numero_tva_intracommunautaire",
        "apprentissage",
        "effectifMensuelEtp",
        "effectifAnnuelEtp",
        "_dataSources",
        "_success",
      ],
      null
    );

    data["etablissements"] = this.etablissements.map((ets) => {
      return ets.export();
    });

    return data;
  }
}
