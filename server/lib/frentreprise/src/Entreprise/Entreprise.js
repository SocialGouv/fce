import Etablissement from "./Etablissement";

const _data = Symbol.for("_data");
const _ets = Symbol.for("_ets");

export default class Entreprise {
  constructor(data) {
    this[_data] = {};
    this[_ets] = [];
    if (typeof data === "object") {
      this[_data] = data;
    }
  }

  get siren() {
    return this[_data]["siren"];
  }

  get capital_social() {
    return this[_data]["capital_social"];
  }

  get numero_tva_intracommunautaire() {
    return this[_data]["numero_tva_intracommunautaire"];
  }

  get forme_juridique() {
    return this[_data]["forme_juridique"];
  }

  get forme_juridique_code() {
    return this[_data]["forme_juridique_code"];
  }

  get nombre_etablissements_actifs() {
    return this[_data]["nombre_etablissements_actifs"];
  }

  get nom_commercial() {
    return this[_data]["nom_commercial"];
  }

  get procedure_collective() {
    return this[_data]["procedure_collective"];
  }

  get raison_sociale() {
    return this[_data]["raison_sociale"];
  }

  get siret_siege_social() {
    return this[_data]["siret_siege_social"];
  }

  get code_effectif_entreprise() {
    return this[_data]["code_effectif_entreprise"];
  }

  get date_creation() {
    return this[_data]["date_creation"];
  }

  get nom() {
    return this[_data]["nom"];
  }

  get prenom() {
    return this[_data]["prenom"];
  }

  get etat_administratif() {
    return this[_data]["etat_administratif"];
  }

  get date_radiation() {
    return this[_data]["date_radiation"];
  }

  get mandataires_sociaux() {
    return this[_data]["mandataires_sociaux"];
  }

  get etablissements() {
    return [...this[_ets]];
  }

  importEtablissement(etsData) {
    this[_ets].push(new Etablissement(etsData));
  }

  export() {
    const data = {};
    const export_keys = [
      "siren",
      "capital_social",
      "numero_tva_intracommunautaire",
      "forme_juridique",
      "forme_juridique_code",
      "nombre_etablissements_actifs",
      "nom_commercial",
      "procedure_collective",
      "raison_sociale",
      "siret_siege_social",
      "code_effectif_entreprise",
      "date_creation",
      "nom",
      "prenom",
      "etat_administratif",
      "date_radiation",
      "mandataires_sociaux"
    ];

    export_keys.forEach(key => {
      data[key] = this[key];
    }, this);

    data["etablissements"] = [this.etablissements.map(ets => ets.export())];

    return data;
  }
}
