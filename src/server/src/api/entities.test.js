const request = require("supertest");
const server = require("../index.js");
require("../mongo/db");
const TIMEOUT = 15000;
const Nomenclature = require("../models/NomenclatureModel");
const CodePostal = require("../models/CodePostalModel");
const Departement = require("../models/DepartementModel");
const Commune = require("../models/CommuneModel");

const _done = (err, done) => {
  if (err) {
    return done(err);
  }
  done();
};

const generateNomenclature = () => {
  const nData = {
    categorie: "code_activite_naf",
    code: "0112Z",
    libelle: "Culture du riz"
  };

  const nomenclature = new Nomenclature(nData);

  return nomenclature.save();
};

const generateCodePostal = () => {
  const nData = {
    code_postal: "31560",
    code_commune: "31100",
    libelle_commune: "Calmont"
  };

  const codePostal = new CodePostal(nData);

  return codePostal.save();
};

const generateDepartement = () => {
  const nData = {
    code_departement: "32",
    libelle_departement: "Gers"
  };

  const departement = new Departement(nData);

  return departement.save();
};

const generateCommune = () => {
  const nData = {
    code_commune: "31100",
    libelle_commune: "Calmont"
  };

  const commune = new Commune(nData);

  return commune.save();
};

describe("Entities", () => {
  beforeEach(() => {
    return Nomenclature.remove({})
      .then(() => {
        return generateNomenclature();
      })
      .then(() => {
        return CodePostal.remove({});
      })
      .then(() => {
        return generateCodePostal();
      })
      .then(() => {
        return Departement.remove({});
      })
      .then(() => {
        return generateDepartement();
      })
      .then(() => {
        return Commune.remove({});
      })
      .then(() => {
        return generateCommune();
      });
  }, TIMEOUT);

  afterEach(() => {
    return Nomenclature.remove({})
      .then(() => {
        return CodePostal.remove({});
      })
      .then(() => {
        return Departement.remove({});
      })
      .then(() => {
        return Commune.remove({});
      });
  }, TIMEOUT);

  test("communes", done => {
    request(server)
      .get("/api/communes")
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        expect(res.body.results.length).toBe(1);
        expect(res.body.results[0].libelle_commune).toBe("Calmont");

        _done(err, done);
      });
  });

  test("departements", done => {
    request(server)
      .get("/api/departements")
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        expect(res.body.results.length).toBe(1);
        expect(res.body.results[0].libelle_departement).toBe("Gers");

        _done(err, done);
      });
  });

  test("postalCodes", done => {
    request(server)
      .get("/api/postalCodes")
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        expect(res.body.results.length).toBe(1);
        expect(res.body.results[0].code_postal).toBe("31560");

        _done(err, done);
      });
  });

  test("nafCodes", done => {
    request(server)
      .get("/api/nafCodes")
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        expect(res.body.results.length).toBe(1);
        expect(res.body.results[0].code).toBe("0112Z");

        _done(err, done);
      });
  });

  test("entities", done => {
    request(server)
      .get("/api/entities")
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        const results = res.body.results;
        expect(results.communes.length).toBe(1);
        expect(results.communes[0].libelle_commune).toBe("Calmont");
        expect(results.departements.length).toBe(1);
        expect(results.departements[0].libelle_departement).toBe("Gers");
        expect(results.postalCodes.length).toBe(1);
        expect(results.postalCodes[0].code_postal).toBe("31560");
        expect(results.nafCodes.length).toBe(1);
        expect(results.nafCodes[0].code).toBe("0112Z");

        _done(err, done);
      });
  });
});
