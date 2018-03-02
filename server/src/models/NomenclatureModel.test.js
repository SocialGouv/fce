require("../mongo/db");

const Nomenclature = require("./NomenclatureModel");
const TIMEOUT = 10000;

beforeEach(() => {
  return Nomenclature.remove({});
}, TIMEOUT);

afterEach(() => {
  return Nomenclature.remove({});
}, TIMEOUT);

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
      return Nomenclature.findOneByCategoryAndCode(nData.categorie, nData.code);
    })
    .then(data => {
      expect(data.categorie).toBe(nData.categorie);
      expect(data.code).toBe(nData.code);
      expect(data.libelle).toBe(nData.libelle);
    });
}, TIMEOUT);

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
      return Nomenclature.findOneByCategoryAndCode(nData.categorie, nData.code);
    })
    .then(data => {
      expect(data.categorie).toBe(nData.categorie);
      expect(data.code).toBe(nData.code);
      expect(data.libelle).toBeUndefined();
      expect(data.libelle_CJ3).toBe(nData.libelle_CJ3);
      expect(data.libelle_CJ1).toBe(nData.libelle_CJ1);
    });
}, TIMEOUT);
