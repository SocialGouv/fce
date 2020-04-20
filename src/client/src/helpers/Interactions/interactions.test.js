import {
  getLastInteraction,
  getDistinctEstablishmentsSiret,
  groupInteractionsBySiret,
  getEstablishmentsLastInteractions,
  getEnterpriseInteractions
} from "./interactions";

const sampleInteractions = [
  {
    siret: "34326262205742",
    pole: "T",
    unite: "UC 00 - unité de contrôle 0 d'inspection des Hautes Pyrénées",
    type: null,
    date: "2018-03-28",
    agent: null,
    note: null
  },
  {
    siret: "34326262205742",
    pole: "T",
    unite: "Unité de Contrôle 4 Secteur Nord-Ouest de Haute-Garonne",
    type: null,
    date: "2019-03-28",
    agent: null,
    note: null
  },
  {
    siret: "34326262206666",
    pole: "T",
    unite: "Unité de Contrôle 4 Secteur Nord-Ouest de Haute-Garonne",
    type: null,
    date: "2019-03-28",
    agent: null,
    note: null
  },
  {
    siret: "34326262206666",
    pole: "T",
    unite: "Unité de Contrôle 4 Secteur Nord-Ouest de Haute-Garonne",
    type: null,
    date: "2020-03-28",
    agent: null,
    note: null
  },
  {
    siret: "34326262205742",
    pole: "C",
    unite: "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
    type: null,
    date: "2020-03-30",
    agent: null,
    note: null
  },
  {
    siret: "34326262205742",
    pole: "C",
    unite: "Unité de contrôle des Pyrénées Orientales",
    type: null,
    date: "2018-12-03",
    agent: null,
    note: null
  },
  {
    siret: "34326262207777",
    pole: "C",
    unite: "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
    type: null,
    date: "2020-03-30",
    agent: null,
    note: null
  },
  {
    siret: "34326262207777",
    pole: "C",
    unite: "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
    type: null,
    date: "2020-01-30",
    agent: null,
    note: null
  },
  {
    siret: "34326262205742",
    pole: "3E_SRC",
    unite: "DDPP DE L'EURE",
    type: null,
    date: "2019-11-15",
    agent: null,
    note: null
  },
  {
    siret: "34326262205742",
    pole: "3E_SRC",
    unite: "DDPP DES BOUCHES DU RHONE",
    type: null,
    date: "2020-02-01",
    agent: null,
    note: null
  },
  {
    siret: "34326262208888",
    pole: "3E_SRC",
    unite: "DDPP DE L'EURE",
    type: null,
    date: "2019-11-15",
    agent: null,
    note: null
  },
  {
    siret: "34326262208888",
    pole: "3E_SRC",
    unite: "DDPP DES BOUCHES DU RHONE",
    type: null,
    date: "2019-03-04",
    agent: null,
    note: null
  }
];

test("get last interaction by date for one establishment", () => {
  const singleEstablishmentInteractions = sampleInteractions.filter(
    ({ siret }) => siret === "34326262205742"
  );

  expect(getLastInteraction(singleEstablishmentInteractions)).toEqual({
    siret: "34326262205742",
    pole: "C",
    unite: "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
    type: null,
    date: "2020-03-30",
    agent: null,
    note: null
  });
});

test("get distinct siret numbers from a list of interactions", () => {
  expect(getDistinctEstablishmentsSiret(sampleInteractions)).toEqual([
    "34326262205742",
    "34326262206666",
    "34326262207777",
    "34326262208888"
  ]);
});

test("get interactions sorted by siret", () => {
  expect(groupInteractionsBySiret(sampleInteractions)).toEqual([
    [
      {
        siret: "34326262205742",
        pole: "T",
        unite: "UC 00 - unité de contrôle 0 d'inspection des Hautes Pyrénées",
        type: null,
        date: "2018-03-28",
        agent: null,
        note: null
      },
      {
        siret: "34326262205742",
        pole: "T",
        unite: "Unité de Contrôle 4 Secteur Nord-Ouest de Haute-Garonne",
        type: null,
        date: "2019-03-28",
        agent: null,
        note: null
      },
      {
        siret: "34326262205742",
        pole: "C",
        unite:
          "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
        type: null,
        date: "2020-03-30",
        agent: null,
        note: null
      },
      {
        siret: "34326262205742",
        pole: "C",
        unite: "Unité de contrôle des Pyrénées Orientales",
        type: null,
        date: "2018-12-03",
        agent: null,
        note: null
      },
      {
        siret: "34326262205742",
        pole: "3E_SRC",
        unite: "DDPP DE L'EURE",
        type: null,
        date: "2019-11-15",
        agent: null,
        note: null
      },
      {
        siret: "34326262205742",
        pole: "3E_SRC",
        unite: "DDPP DES BOUCHES DU RHONE",
        type: null,
        date: "2020-02-01",
        agent: null,
        note: null
      }
    ],
    [
      {
        siret: "34326262206666",
        pole: "T",
        unite: "Unité de Contrôle 4 Secteur Nord-Ouest de Haute-Garonne",
        type: null,
        date: "2019-03-28",
        agent: null,
        note: null
      },
      {
        siret: "34326262206666",
        pole: "T",
        unite: "Unité de Contrôle 4 Secteur Nord-Ouest de Haute-Garonne",
        type: null,
        date: "2020-03-28",
        agent: null,
        note: null
      }
    ],
    [
      {
        siret: "34326262207777",
        pole: "C",
        unite:
          "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
        type: null,
        date: "2020-03-30",
        agent: null,
        note: null
      },
      {
        siret: "34326262207777",
        pole: "C",
        unite:
          "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
        type: null,
        date: "2020-01-30",
        agent: null,
        note: null
      }
    ],
    [
      {
        siret: "34326262208888",
        pole: "3E_SRC",
        unite: "DDPP DE L'EURE",
        type: null,
        date: "2019-11-15",
        agent: null,
        note: null
      },
      {
        siret: "34326262208888",
        pole: "3E_SRC",
        unite: "DDPP DES BOUCHES DU RHONE",
        type: null,
        date: "2019-03-04",
        agent: null,
        note: null
      }
    ]
  ]);
});

test("get the last interaction of each establishment", () => {
  expect(getEstablishmentsLastInteractions(sampleInteractions)).toEqual([
    {
      siret: "34326262205742",
      pole: "C",
      unite: "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
      type: null,
      date: "2020-03-30",
      agent: null,
      note: null
    },
    {
      siret: "34326262206666",
      pole: "T",
      unite: "Unité de Contrôle 4 Secteur Nord-Ouest de Haute-Garonne",
      type: null,
      date: "2020-03-28",
      agent: null,
      note: null
    },
    {
      siret: "34326262207777",
      pole: "C",
      unite: "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
      type: null,
      date: "2020-03-30",
      agent: null,
      note: null
    },
    {
      siret: "34326262208888",
      pole: "3E_SRC",
      unite: "DDPP DE L'EURE",
      type: null,
      date: "2019-11-15",
      agent: null,
      note: null
    }
  ]);
});

const sampleEnterprise = {
  etablissements: [
    {
      siret: "34326262205742",
      etat_etablissement: "A",
      adresse_components: {
        code_postal: "31000",
        localite: "TOULOUSE"
      }
    },
    {
      siret: "34326262206666",
      etat_etablissement: "A",
      adresse_components: {
        code_postal: "32000",
        localite: "AUCH"
      }
    },
    {
      siret: "34326262207777",
      etat_etablissement: "F",
      adresse_components: {
        code_postal: "64000",
        localite: "BAYONNE"
      }
    },
    {
      siret: "34326262208888",
      etat_etablissement: "A",
      adresse_components: {
        code_postal: "81000",
        localite: "ALBI"
      }
    }
  ],
  interactions_C: [
    {
      siret: "34326262205742",
      pole: "C",
      unite: "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
      type: null,
      date: "2020-03-30",
      agent: null,
      note: null
    },
    {
      siret: "34326262205742",
      pole: "C",
      unite: "Unité de contrôle des Pyrénées Orientales",
      type: null,
      date: "2018-12-03",
      agent: null,
      note: null
    },
    {
      siret: "34326262206666",
      pole: "C",
      unite: "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
      type: null,
      date: "2020-03-30",
      agent: null,
      note: null
    },
    {
      siret: "34326262207777",
      pole: "C",
      unite: "UC 00 - unité de contrôle 0 d'inspection du travail de l'Ariège",
      type: null,
      date: "2020-01-30",
      agent: null,
      note: null
    }
  ],
  interactions_T: [
    {
      siret: "34326262205742",
      pole: "T",
      unite: "UC 00 - unité de contrôle 0 d'inspection des Hautes Pyrénées",
      type: null,
      date: "2018-03-28",
      agent: null,
      note: null
    },
    {
      siret: "34326262205742",
      pole: "T",
      unite: "Unité de Contrôle 4 Secteur Nord-Ouest de Haute-Garonne",
      type: null,
      date: "2019-03-28",
      agent: null,
      note: null
    },
    {
      siret: "34326262206666",
      pole: "T",
      unite: "Unité de Contrôle 4 Secteur Nord-Ouest de Haute-Garonne",
      type: null,
      date: "2019-03-28",
      agent: null,
      note: null
    },
    {
      siret: "34326262208888",
      pole: "T",
      unite: "Unité de Contrôle 4 Secteur Nord-Ouest de Haute-Garonne",
      type: null,
      date: "2020-03-28",
      agent: null,
      note: null
    }
  ],
  interactions_3E_SRC: [
    {
      siret: "34326262205742",
      pole: "3E_SRC",
      unite: "DDPP DE L'EURE",
      type: null,
      date: "2019-11-15",
      agent: null,
      note: null
    },
    {
      siret: "34326262205742",
      pole: "3E_SRC",
      unite: "DDPP DES BOUCHES DU RHONE",
      type: null,
      date: "2020-02-01",
      agent: null,
      note: null
    },
    {
      siret: "34326262207777",
      pole: "3E_SRC",
      unite: "DDPP DE L'EURE",
      type: null,
      date: "2019-11-15",
      agent: null,
      note: null
    },
    {
      siret: "34326262208888",
      pole: "3E_SRC",
      unite: "DDPP DES BOUCHES DU RHONE",
      type: null,
      date: "2019-03-04",
      agent: null,
      note: null
    }
  ]
};

test("get the last interaction of each establishment", () => {
  expect(
    getEnterpriseInteractions({
      enterprise: sampleEnterprise,
      type: ["interactions_3E_SRC", "interactions_T", "interactions_C"]
    })
  ).toEqual([
    {
      siret: "34326262205742",
      etat: "A",
      commune: "31000 TOULOUSE",
      date: "30/03/2020",
      pole: "C"
    },
    {
      siret: "34326262206666",
      etat: "A",
      commune: "32000 AUCH",
      date: "30/03/2020",
      pole: "C"
    },
    {
      siret: "34326262208888",
      etat: "A",
      commune: "81000 ALBI",
      date: "28/03/2020",
      pole: "T"
    },
    {
      siret: "34326262207777",
      etat: "F",
      commune: "64000 BAYONNE",
      date: "30/01/2020",
      pole: "C"
    }
  ]);
});
