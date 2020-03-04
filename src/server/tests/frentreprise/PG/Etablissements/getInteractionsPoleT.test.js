import getInteractionsPoleT from "../../../../src/frentreprise/datasources/PG/Etablissements/getInteractionsPoleT";

describe("frentreprise/datasources/PG/Etablissements/getInteractionsPole3E", () => {
  test("get interractions", async () => {
    const dbRows = [
      {
        id: 11,
        siret: "01565003900041",
        date: "04/01/2017",
        realise_pour: "Unité de contrôle n°1 de l'Hérault",
        intervenant: "Yann Akepourlui",
        action_sur: "Etablissement",
        type_intervention: "Enquête"
      },
      {
        id: 12,
        siret: "01565003900041",
        date: "04/02/2017",
        realise_pour: "Unité de contrôle n°1 de l'Hérault",
        intervenant: "Yann Akepourlui",
        action_sur: "Etablissement",
        type_intervention: "Enquête"
      }
    ];

    const model = {
      findAllBySIRET: () => Promise.resolve(dbRows)
    };

    const expected = {
      interactions_T: [
        {
          date: "2017-01-04",
          unite: "Unité de contrôle n°1 de l'Hérault",
          agent: "Yann Akepourlui",
          note: "Etablissement",
          type: "Enquête",
          pole: "T"
        },
        {
          date: "2017-02-04",
          unite: "Unité de contrôle n°1 de l'Hérault",
          agent: "Yann Akepourlui",
          note: "Etablissement",
          type: "Enquête",
          pole: "T"
        }
      ]
    };
    const result = await getInteractionsPoleT("01565003900041", model);
    expect(result).toEqual(expected);
  });

  test("returns an empty object when no results", async () => {
    const model = {
      findAllBySIRET: () => Promise.resolve([])
    };

    const result = await getInteractionsPoleT("ERRORSIRET", model);
    expect(result).toEqual({});
  });
});
