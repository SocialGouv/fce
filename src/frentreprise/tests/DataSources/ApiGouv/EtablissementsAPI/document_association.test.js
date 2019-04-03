import { nestcribe_path as test } from "../../../utils";

import document_association from "../../../../src/DataSources/ApiGouv/EtablissementsAPI/document_association";

test("DataSources/ApiGouv/EtablissementsAPI/association", () => {
  it("get is association", async () => {
    const apiData = {
      documents: [
        {
          type: "Statuts",
          url:
            "https://storage.entreprise.api.gouv.fr/siade/1548168164-aaf68542816cd77150c1b3a43a7014044591fcbb-document_asso.pdf",
          timestamp: "1315815581"
        },
        {
          type: "Procès verbal",
          url:
            "https://storage.entreprise.api.gouv.fr/siade/1548168164-f720c73b655ccdd45c2b6e14ebad17fb1dac4a2a-document_asso.pdf",
          timestamp: "1315815593"
        },
        {
          type: "Liste dirigeants",
          url:
            "https://storage.entreprise.api.gouv.fr/siade/1548168165-93931b123d6ec6dbf226c010f6466bcd37be2e57-document_asso.pdf",
          timestamp: "1315815605"
        },
        {
          type: "Procès verbal",
          url:
            "https://storage.entreprise.api.gouv.fr/siade/1548168165-883f40a6339c60981e76f05834128d9f18da9512-document_asso.pdf",
          timestamp: "1421852431"
        },
        {
          type: "formulaire déclaration",
          url:
            "https://storage.entreprise.api.gouv.fr/siade/1548168165-bb2b8cdc0b0af229884085587601b96c3413664d-document_asso.pdf",
          timestamp: "1421852431"
        },
        {
          type: "télé-récépissé   signé   automatiquement",
          url:
            "https://storage.entreprise.api.gouv.fr/siade/1548168165-b567a4e1788a9e4f3aa88bce325315d46d3adc79-document_asso.pdf",
          timestamp: "1421852455"
        },
        {
          type: "télé-récépissé   signé   automatiquement",
          url:
            "https://storage.entreprise.api.gouv.fr/siade/1548168166-6a6f7d2df05a67c3baa29d3a88c7e29ff3a85f15-document_asso.pdf",
          timestamp: "1485434290"
        },
        {
          type: "Statuts",
          url:
            "https://storage.entreprise.api.gouv.fr/siade/1548168166-2d98eb278611857ef1c029a23497c19b0d1e9822-document_asso.pdf",
          timestamp: "1485434277"
        },
        {
          type: "Procès verbal",
          url:
            "https://storage.entreprise.api.gouv.fr/siade/1548168166-de8690aff71c90916c68df85f9ecf17fc37e95d6-document_asso.pdf",
          timestamp: "1485434278"
        },
        {
          type: "formulaire déclaration",
          url:
            "https://storage.entreprise.api.gouv.fr/siade/1548168167-da9a004431d22b9f208cc3170a2db11fc940fdcc-document_asso.pdf",
          timestamp: "1485434278"
        },
        {
          type: "Récepissé de création",
          url:
            "https://storage.entreprise.api.gouv.fr/siade/1548168167-9f7b34f09964fa1474c56b8cb8a29dff8ebc404c-document_asso.pdf",
          timestamp: "1315813776"
        },
        {
          type: "Récépissé de modification",
          url:
            "https://storage.entreprise.api.gouv.fr/siade/1548168167-606c185ce61e90a63a153936fda456355028db7f-document_asso.pdf",
          timestamp: "1421852429"
        },
        {
          type: "Récépissé de modification",
          url:
            "https://storage.entreprise.api.gouv.fr/siade/1548168167-a5f676819739ba16e4938d229756550e816e8786-document_asso.pdf",
          timestamp: "1485434275"
        },
        {
          type: "télé-récépissé   signé   automatiquement",
          url:
            "https://storage.entreprise.api.gouv.fr/siade/1548168168-5be588c4bfc30349cfc17ba96e4614da40006622-document_asso.pdf",
          timestamp: "1508137885"
        },
        {
          type: "formulaire déclaration",
          url:
            "https://storage.entreprise.api.gouv.fr/siade/1548168168-2fcebd312559a6b3ba57be4d7ea5821262d409b1-document_asso.pdf",
          timestamp: "1508137871"
        },
        {
          type: "Statuts",
          url:
            "https://storage.entreprise.api.gouv.fr/siade/1548168168-014570c5f79f411d09160576e06fb71bb251270d-document_asso.pdf",
          timestamp: "1508137871"
        },
        {
          type: "Récépissé de modification",
          url:
            "https://storage.entreprise.api.gouv.fr/siade/1548168168-1c713094b4d039abe687b6fce6f3ae8af0469f4d-document_asso.pdf",
          timestamp: "1508137870"
        },
        {
          type: "Procès verbal",
          url:
            "https://storage.entreprise.api.gouv.fr/siade/1548168169-f34abe7b36c264634af672a5566dab2e00e2b020-document_asso.pdf",
          timestamp: "1508137871"
        }
      ],
      nombre_documents: 18,
      nombre_documents_deficients: 0
    };

    const Axios = {
      get: () =>
        Promise.resolve({
          data: apiData
        })
    };

    const result = await document_association("SIRET", Axios, {});
    expect(result).toEqual({
      document_association: {
        type: "Statuts",
        url:
          "https://storage.entreprise.api.gouv.fr/siade/1548168168-014570c5f79f411d09160576e06fb71bb251270d-document_asso.pdf",
        timestamp: "1508137871"
      }
    });
  });

  it("get not association", async () => {
    const apiData = {
      documents: [],
      nombre_documents: 0,
      nombre_documents_deficients: 0
    };

    const Axios = {
      get: () =>
        Promise.resolve({
          data: apiData
        })
    };

    const result = await document_association("SIRET", Axios, {});
    expect(result).toEqual(undefined);
  });

  it("returns an empty data when it fails", async () => {
    const Axios = {
      get: () => Promise.reject()
    };

    const consoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementationOnce(() => {});

    const result = await document_association("ERRORSIREN", Axios, {});
    expect(result).toEqual(undefined);
  });
});
