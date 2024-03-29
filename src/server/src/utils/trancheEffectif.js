const TRANCHES = [
  {
    "code": "-",
    "libelle": "Non référencé"
  },
  {
    "code": "NN",
    "libelle": "Unités non employeuse"
  },
  {
    "code": "01",
    "libelle": "1 ou 2 salarié"
  },
  {
    "code": "02",
    "libelle": "3 à 5 salariés"
  },
  {
    "code": "03",
    "libelle": "6 à 9 salariés"
  },
  {
    "code": "11",
    "libelle": "10 à 19 salariés"
  },
  {
    "code": "12",
    "libelle": "20 à 49 salariés"
  },
  {
    "code": "21",
    "libelle": "50 à 99 salariés"
  },
  {
    "code": "22",
    "libelle": "100 à 249 salariés"
  },
  {
    "code": "31",
    "libelle": "250 à 499 salariés"
  },
  {
    "code": "32",
    "libelle": "500 à 999 salariés"
  },
  {
    "code": "41",
    "libelle": "1 000 à 1 999 salariés"
  },
  {
    "code": "42",
    "libelle": "2 000 à 4 999 salariés"
  },
  {
    "code": "51",
    "libelle": "5 000 salariés et plus"
  }
];

export const getTrancheLibelleFromCode = (codeTranche) =>
  TRANCHES.find(({ code }) => code === codeTranche)?.libelle || "Non référencé"
