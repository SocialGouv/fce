const VILLES_ARRONDISSEMENT = [
  75056, // PARIS
  13055, // MARSEILLE
  69123 // LYON
];

const SPREAD_ARRONDISSEMENT_CODES = {
  75056: [
    75101,
    75102,
    75103,
    75104,
    75105,
    75106,
    75107,
    75108,
    75109,
    75110,
    75111,
    75112,
    75113,
    75114,
    75115,
    75116,
    75117,
    75118,
    75119,
    75120
  ],
  13055: [
    13201,
    13202,
    13203,
    13204,
    13205,
    13206,
    13207,
    13208,
    13209,
    13210,
    13211,
    13212,
    13213,
    13214,
    13215,
    13216
  ],
  69123: [69381, 69382, 69383, 69384, 69385, 69386, 69387, 69388, 69389]
};

const getCodeCommuneForArrondissement = codeCommune =>
  VILLES_ARRONDISSEMENT.includes(+codeCommune)
    ? SPREAD_ARRONDISSEMENT_CODES[+codeCommune]
    : [+codeCommune];

// Replace Paris, Marseille and Lyon codeCommune with each of their arrondissements.
export const normalizeCodeCommunes = codeCommunes =>
  codeCommunes.flatMap(getCodeCommuneForArrondissement);
