import { nestcribe_path as test } from "../../../utils";

import infogreffe_rcs from "../../../../src/DataSources/ApiGouv/EntreprisesAPI/infogreffe_rcs";

test("DataSources/ApiGouv/EntreprisesAPI/infogreffe_rcs", () => {
  it("with observations", async () => {
    const apiData = {
      siren: "418166096",
      date_immatriculation: "1998-03-27",
      date_immatriculation_timestamp: 890953200,
      date_extrait: "21 AVRIL 2017",
      observations: [
        {
          date: "2000-02-23",
          date_timestamp: 951260400,
          numero: "12197",
          libelle: " LA SOCIETE NE CONSERVE AUCUNE ACTIVITE A SON ANCIEN SIEGE "
        }
      ]
    };

    const Axios = {
      get: () =>
        Promise.resolve({
          data: apiData
        })
    };

    const expected = {
      rcs_date_immatriculation: "1998-03-27",
      rcs_information_libelle:
        "LA SOCIETE NE CONSERVE AUCUNE ACTIVITE A SON ANCIEN SIEGE",
      rcs_information_date: "2000-02-23"
    };
    const result = await infogreffe_rcs("418166096", Axios, {});

    expect(result).toEqual(expected);
  });

  it("without observations", async () => {
    const apiData = {
      siren: "418166096",
      date_immatriculation: "1998-03-27",
      date_immatriculation_timestamp: 890953200,
      date_extrait: "21 AVRIL 2017",
      observations: []
    };

    const Axios = {
      get: () =>
        Promise.resolve({
          data: apiData
        })
    };

    const expected = {
      rcs_date_immatriculation: "1998-03-27"
    };
    const result = await infogreffe_rcs("418166096", Axios, {});

    expect(result).toEqual(expected);
  });

  it("returns an empty data when it fails", async () => {
    const Axios = {
      get: () => Promise.reject()
    };

    const consoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementationOnce(() => {});

    const result = await infogreffe_rcs("ERRORSIREN", Axios, {});
    expect(result).toEqual({});
  });
});
