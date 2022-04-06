import {
  getDistinctEstablishmentsSiret,
  getEnterpriseInteractions,
  getEstablishmentsLastInteractions,
  getLastInteraction,
  groupInteractionsBySiret,
} from "./interactions";

const sampleInteractions = [
  {
    agent: null,
    date: "2018-03-28",
    note: null,
    pole: "T",
    siret: "34326262205742",
    type: null,
    unite: "UC 00 - unité de contrôle 0 d'inspection des Hautes Pyrénées",
  },
  {
    agent: null,
    date: "2019-03-28",
    note: null,
    pole: "T",
    siret: "34326262205742",
    type: null,
    unite: "Unité de Contrôle 4 Secteur Nord-Ouest de Haute-Garonne",
  },
  {
    agent: null,
    date: "2019-03-28",
    note: null,
    pole: "T",
    siret: "34326262206666",
    type: null,
    unite: "Unité de Contrôle 4 Secteur Nord-Ouest de Haute-Garonne",
  },
  {
    agent: null,
    date: "2020-03-28",
    note: null,
    pole: "T",
    siret: "34326262206666",
    type: null,
    unite: "Unité de Contrôle 4 Secteur Nord-Ouest de Haute-Garonne",
  },
  {
    agent: null,
    date: "2020-03-30",
    note: null,
    pole: "C",
    siret: "34326262205742",
    type: null,
    unite: "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
  },
  {
    agent: null,
    date: "2018-12-03",
    note: null,
    pole: "C",
    siret: "34326262205742",
    type: null,
    unite: "Unité de contrôle des Pyrénées Orientales",
  },
  {
    agent: null,
    date: "2020-03-30",
    note: null,
    pole: "C",
    siret: "34326262207777",
    type: null,
    unite: "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
  },
  {
    agent: null,
    date: "2020-01-30",
    note: null,
    pole: "C",
    siret: "34326262207777",
    type: null,
    unite: "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
  },
  {
    agent: null,
    date: "2019-11-15",
    note: null,
    pole: "3E_SRC",
    siret: "34326262205742",
    type: null,
    unite: "DDPP DE L'EURE",
  },
  {
    agent: null,
    date: "2020-02-01",
    note: null,
    pole: "3E_SRC",
    siret: "34326262205742",
    type: null,
    unite: "DDPP DES BOUCHES DU RHONE",
  },
  {
    agent: null,
    date: "2019-11-15",
    note: null,
    pole: "3E_SRC",
    siret: "34326262208888",
    type: null,
    unite: "DDPP DE L'EURE",
  },
  {
    agent: null,
    date: "2019-03-04",
    note: null,
    pole: "3E_SRC",
    siret: "34326262208888",
    type: null,
    unite: "DDPP DES BOUCHES DU RHONE",
  },
];

test("get last interaction by date for one establishment", () => {
  const singleEstablishmentInteractions = sampleInteractions.filter(
    ({ siret }) => siret === "34326262205742"
  );

  expect(getLastInteraction(singleEstablishmentInteractions)).toEqual({
    agent: null,
    date: "2020-03-30",
    note: null,
    pole: "C",
    siret: "34326262205742",
    type: null,
    unite: "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
  });
});

test("get distinct siret numbers from a list of interactions", () => {
  expect(getDistinctEstablishmentsSiret(sampleInteractions)).toEqual([
    "34326262205742",
    "34326262206666",
    "34326262207777",
    "34326262208888",
  ]);
});

test("get interactions sorted by siret", () => {
  expect(groupInteractionsBySiret(sampleInteractions)).toEqual([
    [
      {
        agent: null,
        date: "2018-03-28",
        note: null,
        pole: "T",
        siret: "34326262205742",
        type: null,
        unite: "UC 00 - unité de contrôle 0 d'inspection des Hautes Pyrénées",
      },
      {
        agent: null,
        date: "2019-03-28",
        note: null,
        pole: "T",
        siret: "34326262205742",
        type: null,
        unite: "Unité de Contrôle 4 Secteur Nord-Ouest de Haute-Garonne",
      },
      {
        agent: null,
        date: "2020-03-30",
        note: null,
        pole: "C",
        siret: "34326262205742",
        type: null,
        unite:
          "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
      },
      {
        agent: null,
        date: "2018-12-03",
        note: null,
        pole: "C",
        siret: "34326262205742",
        type: null,
        unite: "Unité de contrôle des Pyrénées Orientales",
      },
      {
        agent: null,
        date: "2019-11-15",
        note: null,
        pole: "3E_SRC",
        siret: "34326262205742",
        type: null,
        unite: "DDPP DE L'EURE",
      },
      {
        agent: null,
        date: "2020-02-01",
        note: null,
        pole: "3E_SRC",
        siret: "34326262205742",
        type: null,
        unite: "DDPP DES BOUCHES DU RHONE",
      },
    ],
    [
      {
        agent: null,
        date: "2019-03-28",
        note: null,
        pole: "T",
        siret: "34326262206666",
        type: null,
        unite: "Unité de Contrôle 4 Secteur Nord-Ouest de Haute-Garonne",
      },
      {
        agent: null,
        date: "2020-03-28",
        note: null,
        pole: "T",
        siret: "34326262206666",
        type: null,
        unite: "Unité de Contrôle 4 Secteur Nord-Ouest de Haute-Garonne",
      },
    ],
    [
      {
        agent: null,
        date: "2020-03-30",
        note: null,
        pole: "C",
        siret: "34326262207777",
        type: null,
        unite:
          "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
      },
      {
        agent: null,
        date: "2020-01-30",
        note: null,
        pole: "C",
        siret: "34326262207777",
        type: null,
        unite:
          "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
      },
    ],
    [
      {
        agent: null,
        date: "2019-11-15",
        note: null,
        pole: "3E_SRC",
        siret: "34326262208888",
        type: null,
        unite: "DDPP DE L'EURE",
      },
      {
        agent: null,
        date: "2019-03-04",
        note: null,
        pole: "3E_SRC",
        siret: "34326262208888",
        type: null,
        unite: "DDPP DES BOUCHES DU RHONE",
      },
    ],
  ]);
});

test("get the last interaction of each establishment", () => {
  expect(getEstablishmentsLastInteractions(sampleInteractions)).toEqual([
    {
      agent: null,
      date: "2020-03-30",
      note: null,
      pole: "C",
      siret: "34326262205742",
      type: null,
      unite: "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
    },
    {
      agent: null,
      date: "2020-03-28",
      note: null,
      pole: "T",
      siret: "34326262206666",
      type: null,
      unite: "Unité de Contrôle 4 Secteur Nord-Ouest de Haute-Garonne",
    },
    {
      agent: null,
      date: "2020-03-30",
      note: null,
      pole: "C",
      siret: "34326262207777",
      type: null,
      unite: "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
    },
    {
      agent: null,
      date: "2019-11-15",
      note: null,
      pole: "3E_SRC",
      siret: "34326262208888",
      type: null,
      unite: "DDPP DE L'EURE",
    },
  ]);
});

const sampleEnterprise = {
  interactions_3E_SRC: [
    {
      agent: null,
      date: "2019-11-15",
      etablissement: {
        adresse_composant: {
          code_postal: "31000",
          localite: "TOULOUSE",
        },
        etat_etablissement: "A",
      },
      note: null,
      pole: "3E_SRC",
      siret: "34326262205742",
      type: null,
      unite: "DDPP DE L'EURE",
    },
    {
      agent: null,
      date: "2020-02-01",
      etablissement: {
        adresse_composant: {
          code_postal: "31000",
          localite: "TOULOUSE",
        },
        etat_etablissement: "A",
      },
      note: null,
      pole: "3E_SRC",
      siret: "34326262205742",
      type: null,
      unite: "DDPP DES BOUCHES DU RHONE",
    },
    {
      agent: null,
      date: "2019-11-15",
      etablissement: {
        adresse_composant: {
          code_postal: "64000",
          localite: "BAYONNE",
        },
        etat_etablissement: "F",
      },
      note: null,
      pole: "3E_SRC",
      siret: "34326262207777",
      type: null,
      unite: "DDPP DE L'EURE",
    },
    {
      agent: null,
      date: "2019-03-04",
      etablissement: {
        adresse_composant: {
          code_postal: "81000",
          localite: "ALBI",
        },
        etat_etablissement: "A",
      },
      note: null,
      pole: "3E_SRC",
      siret: "34326262208888",
      type: null,
      unite: "DDPP DES BOUCHES DU RHONE",
    },
  ],
  interactions_C: [
    {
      agent: null,
      date: "2020-03-30",
      etablissement: {
        adresse_composant: {
          code_postal: "31000",
          localite: "TOULOUSE",
        },
        etat_etablissement: "A",
      },
      note: null,
      pole: "C",
      siret: "34326262205742",
      type: null,
      unite: "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
    },
    {
      agent: null,
      date: "2018-12-03",
      etablissement: {
        adresse_composant: {
          code_postal: "31000",
          localite: "TOULOUSE",
        },
        etat_etablissement: "A",
      },
      note: null,
      pole: "C",
      siret: "34326262205742",
      type: null,
      unite: "Unité de contrôle des Pyrénées Orientales",
    },
    {
      agent: null,
      date: "2020-03-30",
      etablissement: {
        adresse_composant: {
          code_postal: "32000",
          localite: "AUCH",
        },
        etat_etablissement: "A",
      },
      note: null,
      pole: "C",
      siret: "34326262206666",
      type: null,
      unite: "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
    },
    {
      agent: null,
      date: "2020-01-30",
      etablissement: {
        adresse_composant: {
          code_postal: "64000",
          localite: "BAYONNE",
        },
        etat_etablissement: "F",
      },
      note: null,
      pole: "C",
      siret: "34326262207777",
      type: null,
      unite: "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
    },
  ],
  interactions_T: [
    {
      agent: null,
      date: "2018-03-28",
      etablissement: {
        adresse_composant: {
          code_postal: "31000",
          localite: "TOULOUSE",
        },
        etat_etablissement: "A",
      },
      note: null,
      pole: "T",
      siret: "34326262205742",
      type: null,
      unite: "UC 00 - unité de contrôle 0 d'inspection des Hautes Pyrénées",
    },
    {
      agent: null,
      date: "2019-03-28",
      etablissement: {
        adresse_composant: {
          code_postal: "31000",
          localite: "TOULOUSE",
        },
        etat_etablissement: "A",
      },
      note: null,
      pole: "T",
      siret: "34326262205742",
      type: null,
      unite: "Unité de Contrôle 4 Secteur Nord-Ouest de Haute-Garonne",
    },
    {
      agent: null,
      date: "2019-03-28",
      etablissement: {
        adresse_composant: {
          code_postal: "32000",
          localite: "AUCH",
        },
        etat_etablissement: "A",
      },
      note: null,
      pole: "T",
      siret: "34326262206666",
      type: null,
      unite: "Unité de Contrôle 4 Secteur Nord-Ouest de Haute-Garonne",
    },
    {
      agent: null,
      date: "2020-03-28",
      etablissement: {
        adresse_composant: {
          code_postal: "81000",
          localite: "ALBI",
        },
        etat_etablissement: "A",
      },
      note: null,
      pole: "T",
      siret: "34326262208888",
      type: null,
      unite: "Unité de Contrôle 4 Secteur Nord-Ouest de Haute-Garonne",
    },
  ],
};

test("get interaction of each establishment", () => {
  expect(
    getEnterpriseInteractions({
      enterprise: sampleEnterprise,
      type: ["interactions_3E_SRC", "interactions_T", "interactions_C"],
    })
  ).toEqual([
    {
      commune: "31000 TOULOUSE",
      date: "30/03/2020",
      etat: "A",
      pole: "C",
      siret: "34326262205742",
    },
    {
      commune: "32000 AUCH",
      date: "30/03/2020",
      etat: "A",
      pole: "C",
      siret: "34326262206666",
    },
    {
      commune: "81000 ALBI",
      date: "28/03/2020",
      etat: "A",
      pole: "T",
      siret: "34326262208888",
    },
    {
      commune: "64000 BAYONNE",
      date: "30/01/2020",
      etat: "F",
      pole: "C",
      siret: "34326262207777",
    },
  ]);
});
