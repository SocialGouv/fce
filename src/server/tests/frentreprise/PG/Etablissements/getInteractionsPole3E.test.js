import getInteractionsPole3E from "../../../../src/frentreprise/datasources/PG/Etablissements/getInteractionsPole3E";

describe("frentreprise/datasources/PG/Etablissements/getInteractionsPole3E", () => {
  test("get interractions", async () => {
    const dbRows = [
      {
        id: 11,
        siret: "01565003900041",
        date_visite: "04/01/2017",
        region: "Bourgogne-Franche-Comté",
        inspecteurs: "Yann Akepourlui",
        filieres: "Alimentaire",
        type_suivi: "EPV",
        suivi_eti: "Suivi par un référent au titre dune pépite"
      },
      {
        id: 12,
        siret: "01565003900041",
        date_visite: "04/02/2017",
        region: "Bourgogne-Franche-Comté",
        inspecteurs: "Zinedine Pacesoir",
        filieres: "Alimentaire",
        type_suivi: "EPV",
        suivi_eti: "Suivi par un référent au titre dune pépite"
      }
    ];

    const model = {
      findAllBySIRET: () => Promise.resolve(dbRows)
    };

    const expected = {
      interactions_3E: [
        {
          date: "2017-01-04",
          unite: `Service Entreprise Bourgogne-Franche-Comté`,
          agent: "Yann Akepourlui",
          filiere: "Alimentaire",
          type: "EPV",
          eti_pepite: "Suivi par un référent au titre dune pépite",
          pole: "3E"
        },
        {
          date: "2017-02-04",
          unite: `Service Entreprise Bourgogne-Franche-Comté`,
          agent: "Zinedine Pacesoir",
          filiere: "Alimentaire",
          type: "EPV",
          eti_pepite: "Suivi par un référent au titre dune pépite",
          pole: "3E"
        }
      ]
    };
    const result = await getInteractionsPole3E("01565003900041", model);
    expect(result).toEqual(expected);
  });

  test("returns an empty object when no results", async () => {
    const model = {
      findAllBySIRET: () => Promise.resolve([])
    };

    const result = await getInteractionsPole3E("ERRORSIRET", model);
    expect(result).toEqual({});
  });
});
