require("../mongo/db");
const Interaction = require("./InteractionModel");
const TIMEOUT = 15000;

beforeEach(() => {
  return Interaction.remove({});
}, TIMEOUT);

afterEach(() => {
  return Interaction.remove({});
}, TIMEOUT);

test(
  "default",
  () => {
    const interactionData = {
      siret: "SIRET1",
      unite: "Unité 3",
      type_intervention: "Enquête",
      cible_intervention: "Chantier",
      pole: "C",
      date: new Date()
    };

    const interaction = new Interaction(interactionData);

    return interaction
      .save()
      .then(() => {
        return Interaction.findBySIRET(interactionData.siret);
      })
      .then(data => {
        const res = data[0];
        expect(res.siret).toBe(interactionData.siret);
        expect(res.unite).toBe(interactionData.unite);
        expect(res.type_intervention).toBe(interactionData.type_intervention);
        expect(res.cible_intervention).toBe(interactionData.cible_intervention);
        expect(res.pole).toBe(interactionData.pole);
        return;
      });
  },
  TIMEOUT
);

test(
  "add 3 interactions",
  () => {
    const interactionsData = [
      {
        siret: "SIRET1",
        unite: "Unité 3",
        type_intervention: "Enquête",
        cible_intervention: "Chantier",
        pole: "C",
        date: new Date("2017-12")
      },
      {
        siret: "SIRET2",
        unite: "Unité 3",
        type_intervention: "Enquête",
        cible_intervention: "Chantier",
        pole: "C",
        date: new Date()
      },
      {
        siret: "SIRET1",
        unite: "Unité 3",
        type_intervention: "Enquête",
        cible_intervention: "Chantier",
        pole: "3E",
        date: new Date("2018-01")
      }
    ];

    return new Interaction(interactionsData[0])
      .save()
      .then(() => {
        return new Interaction(interactionsData[1]).save();
      })
      .then(() => {
        return new Interaction(interactionsData[2]).save();
      })
      .then(() => {
        return Interaction.findBySIRET("SIRET1");
      })
      .then(data => {
        expect(data.length).toBe(2);
        const inter1 = data[0];
        const inter2 = data[1];

        expect(inter1.pole).toBe("3E");
        expect(inter2.pole).toBe("C");
        return;
      });
  },
  TIMEOUT
);
