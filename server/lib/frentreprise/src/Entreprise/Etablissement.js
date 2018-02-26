const _data = Symbol.for("_data");

export default class Etablissement {
  constructor(data) {
    this[_data] = {};
    if (typeof data === "object") {
      this[_data] = data;
    }
  }

  get siege_social() {
    return this[_data]["siege_social"];
  }

  get siret() {
    return this[_data]["siret"];
  }

  get naf() {
    return this[_data]["naf"];
  }

  get libelle_naf() {
    return this[_data]["libelle_naf"];
  }

  get date_mise_a_jour() {
    return this[_data]["date_mise_a_jour"];
  }

  get etat_administratif_etablissement() {
    return this[_data]["etat_administratif_etablissement"];
  }

  get adresse() {
    return this[_data]["adresse"];
  }

  export() {
    const data = {};
    const export_keys = [
      "siege_social",
      "siret",
      "naf",
      "libelle_naf",
      "date_mise_a_jour",
      "etat_administratif_etablissement",
      "adresse"
    ];

    export_keys.forEach(key => {
      console.log(key, data, this);
      data[key] = this[key];
    }, this);

    return data;
  }
}
