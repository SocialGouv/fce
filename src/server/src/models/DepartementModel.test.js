require("../mongo/db");

const Departement = require("./DepartementModel");
const TIMEOUT = 15000;

beforeEach(() => {
  return Departement.remove({});
}, TIMEOUT);

afterEach(() => {
  return Departement.remove({});
}, TIMEOUT);

test(
  "default",
  () => {
    const nData = {
      code_departement: "32",
      libelle_departement: "Gers"
    };

    const departement = new Departement(nData);

    return departement
      .save()
      .then(() => {
        return Departement.findOne({
          code_departement: nData.code_departement
        });
      })
      .then(data => {
        expect(data.code_departement).toBe(nData.code_departement);
        expect(data.libelle_departement).toBe(nData.libelle_departement);
      });
  },
  TIMEOUT
);

test(
  "findOneByCode",
  () => {
    const nData = {
      code_departement: "32",
      libelle_departement: "Gers"
    };

    const departement = new Departement(nData);

    return departement
      .save()
      .then(() => {
        return Departement.findOneByCode(nData.code_departement);
      })
      .then(data => {
        expect(data.code_departement).toBe(nData.code_departement);
        expect(data.libelle_departement).toBe(nData.libelle_departement);
      });
  },
  TIMEOUT
);
