require("../mongo/db");

const Commune = require("./CommuneModel");
const TIMEOUT = 15000;

beforeEach(() => {
  return Commune.remove({});
}, TIMEOUT);

afterEach(() => {
  return Commune.remove({});
}, TIMEOUT);

test(
  "default",
  () => {
    const nData = {
      code_commune: "31100",
      libelle_commune: "Calmont"
    };

    const commune = new Commune(nData);

    return commune
      .save()
      .then(() => {
        return Commune.findOne({ code_commune: nData.code_commune });
      })
      .then(data => {
        expect(data.code_commune).toBe(nData.code_commune);
        expect(data.libelle_commune).toBe(nData.libelle_commune);
      });
  },
  TIMEOUT
);
