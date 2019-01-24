import { nestcribe_path as test } from "../../../utils";

import association from "../../../../src/DataSources/ApiGouv/EtablissementsAPI/association";

test("DataSources/ApiGouv/EtablissementsAPI/association", () => {
  it("get is association", async () => {
    const apiData = {
      association: {
        id: "W313016535",
        titre: "PODSHOWS",
        objet:
          "aider et promouvoir les moyens d'expressions sous la forme de médias numériques et plus généralement toutes opérations industrielles, commerciales ou financières, mobilières ou immobilières, pouvant se rattacher directement ou indirectement à l'objet social ou susceptibles d'en faciliter l'extension ou le développement",
        siret: "53742454100010",
        siret_siege_social: "53742454100010",
        date_creation: null,
        date_declaration: "2017-10-13",
        date_publication: "2011-09-24",
        date_dissolution: null,
        adresse_siege: {
          complement: "CHEZ M THOMAS FOREST V14 CHEZ MONSIEUR THOMAS FOREST  ",
          numero_voie: ["17", "17"],
          type_voie: ["ALL", "ALL"],
          libelle_voie: ["DU MONT VALLIER", "DU MONT VALLIER"],
          distribution: null,
          code_insee: ["31555", "31555"],
          code_postal: ["31770", "31770"],
          commune: ["Colomiers", "Colomiers"]
        },
        code_civilite_dirigeant: null,
        civilite_dirigeant: null,
        code_etat: null,
        etat: "true",
        code_groupement: null,
        groupement: null,
        mise_a_jour: "2017-10-13"
      }
    };

    const Axios = {
      get: () =>
        Promise.resolve({
          data: apiData
        })
    };

    const result = await association("SIRET", Axios, {});
    expect(result).toEqual({
      association: {
        id: "W313016535",
        titre: "PODSHOWS",
        objet:
          "aider et promouvoir les moyens d'expressions sous la forme de médias numériques et plus généralement toutes opérations industrielles, commerciales ou financières, mobilières ou immobilières, pouvant se rattacher directement ou indirectement à l'objet social ou susceptibles d'en faciliter l'extension ou le développement",
        siret: "53742454100010",
        siret_siege_social: "53742454100010",
        date_creation: null,
        date_declaration: "2017-10-13",
        date_publication: "2011-09-24",
        date_dissolution: null,
        adresse_siege: {
          complement: "CHEZ M THOMAS FOREST V14 CHEZ MONSIEUR THOMAS FOREST  ",
          numero_voie: ["17", "17"],
          type_voie: ["ALL", "ALL"],
          libelle_voie: ["DU MONT VALLIER", "DU MONT VALLIER"],
          distribution: null,
          code_insee: ["31555", "31555"],
          code_postal: ["31770", "31770"],
          commune: ["Colomiers", "Colomiers"]
        },
        code_civilite_dirigeant: null,
        civilite_dirigeant: null,
        code_etat: null,
        etat: "true",
        code_groupement: null,
        groupement: null,
        mise_a_jour: "2017-10-13"
      }
    });
  });

  it("get not association", async () => {
    const apiData = {
      association: {
        id: null,
        titre: "OCCITECH",
        objet: null,
        siret: "48776861600038",
        siret_siege_social: "48776861600038",
        date_creation: null,
        date_declaration: null,
        date_publication: null,
        date_dissolution: null,
        adresse_siege: {
          complement: "  ",
          numero_voie: "35",
          type_voie: "BD",
          libelle_voie: "DES RECOLLETS",
          distribution: null,
          code_insee: "31555",
          code_postal: "31400",
          commune: "TOULOUSE"
        },
        code_civilite_dirigeant: null,
        civilite_dirigeant: null,
        code_etat: null,
        etat: "true",
        code_groupement: null,
        groupement: null,
        mise_a_jour: null
      }
    };

    const Axios = {
      get: () =>
        Promise.resolve({
          data: apiData
        })
    };

    const result = await association("SIRET", Axios, {});
    expect(result).toEqual(undefined);
  });

  it("returns an empty data when it fails", async () => {
    const Axios = {
      get: () => Promise.reject()
    };

    const consoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementationOnce(() => {});

    const result = await association("ERRORSIREN", Axios, {});
    expect(result).toEqual(undefined);
  });
});
