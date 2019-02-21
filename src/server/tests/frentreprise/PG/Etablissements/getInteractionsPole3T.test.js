import getInteractionsPole3T from "../../../../src/frentreprise/datasources/PG/Etablissements/getInteractionsPole3T";

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
      interactions_3T: [
        {
          date: "2017-01-04",
          unite: "Unité de contrôle n°1 de l'Hérault",
          agent: "Yann Akepourlui",
          note: "Etablissement",
          type: "Enquête",
          pole: "3T"
        },
        {
          date: "2017-02-04",
          unite: "Unité de contrôle n°1 de l'Hérault",
          agent: "Yann Akepourlui",
          note: "Etablissement",
          type: "Enquête",
          pole: "3T"
        }
      ]
    };
    const result = await getInteractionsPole3T("01565003900041", model);
    expect(result).toEqual(expected);
  });

  test("returns an empty object when no results", async () => {
    const model = {
      findAllBySIRET: () => Promise.resolve([])
    };

    const result = await getInteractionsPole3T("ERRORSIRET", model);
    expect(result).toEqual({});
  });
});
