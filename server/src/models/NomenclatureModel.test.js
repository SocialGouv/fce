require("../mongo/db");

const Nomenclature = require("./NomenclatureModel");

beforeEach(() => {
  return Nomenclature.remove({});
});

afterEach(() => {
  return Nomenclature.remove({});
});

test("default - Code_activite_NAF", () => {
  const nData = {
    categorie: "Code_activite_NAF",
    code: "0112Z",
    libelle: "Culture du riz"
  };

  const nomenclature = new Nomenclature(nData);

  return nomenclature
    .save()
    .then(() => {
      return Nomenclature.findByCode(nData.categorie, nData.code);
    })
    .then(data => {
      const res = data[0];
      expect(res.categorie).toBe(nData.categorie);
      expect(res.code).toBe(nData.code);
      expect(res.libelle).toBe(nData.libelle);
    });
});

test("Code_CJ3", () => {
  const nData = {
    categorie: "Code_CJ3",
    code: "2110",
    libelle_CJ3: "Indivision entre personnes physiques",
    libelle_CJ1: "Groupement de droit privé non doté de la personnalité morale"
  };

  const nomenclature = new Nomenclature(nData);

  return nomenclature
    .save()
    .then(() => {
      return Nomenclature.findByCode(nData.categorie, nData.code);
    })
    .then(data => {
      const res = data[0];
      expect(res.categorie).toBe(nData.categorie);
      expect(res.code).toBe(nData.code);
      expect(res.libelle).toBeUndefined();
      expect(res.libelle_CJ3).toBe(nData.libelle_CJ3);
      expect(res.libelle_CJ1).toBe(nData.libelle_CJ1);
    });
});
