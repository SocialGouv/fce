const request = require("supertest");
const server = require("../index.js");
require("../mongo/db");
const Etablissement = require("../models/EtablissementModel");
const TIMEOUT = 15000;

const _done = (err, done) => {
  if (err) {
    return done(err);
  }
  done();
};

describe("Search", () => {
  describe("simple", () => {
    beforeEach(() => {
      return Etablissement.remove({}).then(() => {
        const nData = {
          siret: "48776861600038",
          code_activite: "0112Z",
          nic_ministere: "0",
          raison_sociale: "occitech"
        };

        const etablissement = new Etablissement(nData);

        return etablissement.save();
      });
    }, TIMEOUT);

    afterEach(() => {
      return Etablissement.remove({});
    }, TIMEOUT);

    test("not exist", done => {
      request(server)
        .get("/api/search?q=cetteentreprisenexistepas")
        .set("Accept", "application/json")
        .expect(200)
        .end(function(err, res) {
          expect(res.body).toEqual({
            query: {
              format: "json",
              isSIREN: false,
              isSIRET: false,
              q: "cetteentreprisenexistepas",
              search: "simple"
            },
            results: [],
            size: 0
          });
          _done(err, done);
        });
    });

    test("exist", done => {
      request(server)
        .get("/api/search?q=occitech")
        .set("Accept", "application/json")
        .expect(200)
        .end(function(err, res) {
          expect(res.body.query).toEqual({
            format: "json",
            isSIREN: false,
            isSIRET: false,
            q: "occitech",
            search: "simple"
          });
          expect(res.body.size).toBe(1);

          const result = res.body.results[0];
          expect(result._dataSources).toEqual({ Mongo: true });
          expect(result.raison_sociale).toBe("occitech");
          expect(result.siren).toBe("487768616");
          _done(err, done);
        });
    });

    test("xlsx format", done => {
      request(server)
        .get("/api/search.xlsx?q=occitech")
        .set("Accept", "application/json")
        .expect(200)
        .end(function(err, res) {
          expect(res.body).toBeInstanceOf(Buffer);
          _done(err, done);
        });
    });
  });

  describe("advanced", () => {
    beforeEach(() => {
      return Etablissement.remove({}).then(() => {
        const nData = {
          siret: "48776861600038",
          code_activite: "0112Z",
          nic_ministere: "0",
          raison_sociale: "occitech"
        };

        const etablissement = new Etablissement(nData);

        return etablissement.save();
      });
    }, TIMEOUT);

    afterEach(() => {
      return Etablissement.remove({});
    }, TIMEOUT);

    test("not exist", done => {
      request(server)
        .get("/api/advancedSearch?raisonSociale=cetteentreprisenexistepas")
        .set("Accept", "application/json")
        .expect(200)
        .end(function(err, res) {
          expect(res.body).toEqual({
            query: {
              format: "json",
              params: {
                code_activite: "",
                code_departement: "",
                code_postal: "",
                interactions: [],
                libelle_commune: "",
                raison_sociale: "cetteentreprisenexistepas",
                siege_social: "",
                siren: ""
              },
              search: "advanced"
            },
            results: [],
            size: 0
          });
          _done(err, done);
        });
    });

    test("exist", done => {
      request(server)
        .get("/api/advancedSearch?raisonSociale=occitech")
        .set("Accept", "application/json")
        .expect(200)
        .end(function(err, res) {
          expect(res.body.query).toEqual({
            format: "json",
            params: {
              code_activite: "",
              code_departement: "",
              code_postal: "",
              interactions: [],
              libelle_commune: "",
              raison_sociale: "occitech",
              siege_social: "",
              siren: ""
            },
            search: "advanced"
          });
          expect(res.body.size).toBe(1);

          const result = res.body.results[0];
          expect(result._dataSources).toEqual({ Mongo: true });
          expect(result.raison_sociale).toBe("occitech");
          expect(result.siren).toBe("487768616");
          _done(err, done);
        });
    });

    test("xlsx format", done => {
      request(server)
        .get("/api/advancedSearch.xlsx?raisonSociale=occitech")
        .set("Accept", "application/json")
        .expect(200)
        .end(function(err, res) {
          expect(res.body).toBeInstanceOf(Buffer);
          _done(err, done);
        });
    });
  });
});
