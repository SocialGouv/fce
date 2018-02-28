require("../mongo/db");

const Etablissement = require("./EtablissementModel");
const TIMEOUT = 15000;

beforeEach(() => {
  return Etablissement.remove({});
}, TIMEOUT);

afterEach(() => {
  return Etablissement.remove({});
}, TIMEOUT);

test(
  "default",
  () => {
    const nData = {
      siret: "01234",
      code_cj3: "0112Z",
      nic_ministere: "0",
      raison_sociale: "entreprise AA"
    };

    const etablissement = new Etablissement(nData);

    return etablissement
      .save()
      .then(() => {
        return Etablissement.findBySIRET(nData.siret);
      })
      .then(data => {
        expect(data.siret).toBe(nData.siret);
        expect(data.code_cj3).toBe(nData.code_cj3);
        expect(data.raison_sociale).toBe(nData.raison_sociale);
      });
  },
  TIMEOUT
);

test(
  "findByRaisonSociale - find 0",
  () => {
    const nData = [
      {
        siret: "01234",
        code_cj3: "0112Z",
        nic_ministere: "0",
        raison_sociale: "entreprise AA"
      },
      {
        siret: "01235",
        code_cj3: "0112Z",
        nic_ministere: "0",
        raison_sociale: "entreprise AB"
      }
    ];

    return new Etablissement(nData[0])
      .save()
      .then(() => {
        return new Etablissement(nData[1]).save();
      })
      .then(() => {
        return Etablissement.findByRaisonSociale("nope");
      })
      .then(data => {
        expect(data).toBe([]);

        return;
      });
  },
  TIMEOUT
);

test(
  "findByRaisonSociale - find 1",
  () => {
    const nData = [
      {
        siret: "01234",
        code_cj3: "0112Z",
        nic_ministere: "0",
        raison_sociale: "entreprise AA"
      },
      {
        siret: "01235",
        code_cj3: "0112Z",
        nic_ministere: "0",
        raison_sociale: "entreprise AB"
      }
    ];

    return new Etablissement(nData[0])
      .save()
      .then(() => {
        return new Etablissement(nData[1]).save();
      })
      .then(() => {
        return Etablissement.findByRaisonSociale("entreprise AA");
      })
      .then(data => {
        expect(data.length).toBe(1);

        expect(data[0].siret).toBe(nData[0].siret);
        expect(data[0].code_cj3).toBe(nData[0].code_cj3);
        expect(data[0].raison_sociale).toBe(nData[0].raison_sociale);
        return;
      });
  },
  TIMEOUT
);

test.only(
  "findByRaisonSociale - find 2",
  () => {
    const nData = [
      {
        siret: "01234",
        code_cj3: "0112Z",
        nic_ministere: "0",
        raison_sociale: "entreprise AA"
      },
      {
        siret: "01235",
        code_cj3: "0112Z",
        nic_ministere: "0",
        raison_sociale: "entreprise AB"
      }
    ];

    return new Etablissement(nData[0])
      .save()
      .then(() => {
        return new Etablissement(nData[1]).save();
      })
      .then(() => {
        return Etablissement.findByRaisonSociale("entreprise A");
      })
      .then(data => {
        expect(data.length).toBe(2);

        expect(data[0].siret).toBe(nData[0].siret);
        expect(data[1].siret).toBe(nData[1].siret);
        return;
      });
  },
  TIMEOUT
);
