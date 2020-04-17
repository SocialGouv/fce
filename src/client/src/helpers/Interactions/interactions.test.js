import {
  getLastInteraction,
  getDistinctEstablishments,
  getInteractionsBySiret,
  getEstablishmentsLastInteractions
} from "./interactions";

const establishments = [
  {
    siret: "34326262205742",
    etat_etablissement: "F",
    adresse_components: { code_postal: "31000", localite: "TOULOUSE" }
  },
  {
    siret: "34326262206666",
    etat_etablissement: "F",
    adresse_components: { code_postal: "75000", localite: "PARIS" }
  },
  {
    siret: "34326262207777",
    etat_etablissement: "A",
    adresse_components: { code_postal: "75000", localite: "PARIS" }
  },
  {
    siret: "34326262208888",
    etat_etablissement: "A",
    adresse_components: { code_postal: "31000", localite: "TOULOUSE" }
  }
];

const interactions = [
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
  const singleEstablishmentInteractions = interactions.filter(
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
  expect(getDistinctEstablishments(interactions)).toEqual([
    "34326262205742",
    "34326262206666",
    "34326262207777",
    "34326262208888"
  ]);
});

test("get interactions sorted by siret", () => {
  expect(getInteractionsBySiret(interactions, establishments)).toEqual([
    [
      {
        siret: "34326262205742",
        etat: "F",
        commune: "31000 TOULOUSE",
        date: "2018-03-28",
        pole: "T"
      },
      {
        siret: "34326262205742",
        etat: "F",
        commune: "31000 TOULOUSE",
        date: "2019-03-28",
        pole: "T"
      },
      {
        siret: "34326262205742",
        etat: "F",
        commune: "31000 TOULOUSE",
        date: "2020-03-30",
        pole: "C"
      },
      {
        siret: "34326262205742",
        etat: "F",
        commune: "31000 TOULOUSE",
        date: "2018-12-03",
        pole: "C"
      },
      {
        siret: "34326262205742",
        etat: "F",
        commune: "31000 TOULOUSE",
        date: "2019-11-15",
        pole: "3E_SRC"
      },
      {
        siret: "34326262205742",
        etat: "F",
        commune: "31000 TOULOUSE",
        date: "2020-02-01",
        pole: "3E_SRC"
      }
    ],
    [
      {
        siret: "34326262206666",
        etat: "F",
        commune: "75000 PARIS",
        date: "2019-03-28",
        pole: "T"
      },
      {
        siret: "34326262206666",
        etat: "F",
        commune: "75000 PARIS",
        date: "2020-03-28",
        pole: "T"
      }
    ],
    [
      {
        siret: "34326262207777",
        etat: "A",
        commune: "75000 PARIS",
        pole: "C",
        date: "2020-03-30"
      },
      {
        siret: "34326262207777",
        etat: "A",
        commune: "75000 PARIS",
        pole: "C",
        date: "2020-01-30"
      }
    ],
    [
      {
        siret: "34326262208888",
        etat: "A",
        commune: "31000 TOULOUSE",
        date: "2019-11-15",
        pole: "3E_SRC"
      },
      {
        siret: "34326262208888",
        etat: "A",
        commune: "31000 TOULOUSE",
        date: "2019-03-04",
        pole: "3E_SRC"
      }
    ]
  ]);
});

test("get the last interaction of each establishment", () => {
  expect(
    getEstablishmentsLastInteractions(interactions, establishments)
  ).toEqual([
    {
      siret: "34326262205742",
      etat: "F",
      commune: "31000 TOULOUSE",
      date: "2020-03-30",
      pole: "C"
    },
    {
      siret: "34326262206666",
      etat: "F",
      commune: "75000 PARIS",
      date: "2020-03-28",
      pole: "T"
    },
    {
      siret: "34326262207777",
      etat: "A",
      commune: "75000 PARIS",
      pole: "C",
      date: "2020-03-30"
    },
    {
      siret: "34326262208888",
      etat: "A",
      commune: "31000 TOULOUSE",
      date: "2019-11-15",
      pole: "3E_SRC"
    }
  ]);
});
