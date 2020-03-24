import Model from "./Model";

const citiesWithDistricts = [
  {
    nom: "MARSEILLE",
    code_postal: "13000",
    code_insee:
      "13201,13202,13203,13204,13205,13206,13207,13208,13209,13210,13211,13212,13213,13214,13215,13216"
  },
  {
    nom: "LYON",
    code_postal: "69000",
    code_insee: "69381,69382,69383,69384,69385,69386,69387,69388,69389"
  }
];

export default class Communes extends Model {
  constructor() {
    super();
    this.saintTerms = ["ste", "sainte", "saint", "st"];
  }

  search(q) {
    const terms = [q];
    // eslint-disable-next-line security/detect-non-literal-regexp
    const regexSaint = new RegExp(`^(${this.saintTerms.join("|")})`, "i");
    const matchSt = q.match(regexSaint);

    if (matchSt) {
      const matchTerm = matchSt[0];
      const restTerm = q.split(matchTerm, 2).pop();
      this.saintTerms.forEach(term => {
        terms.push(term + restTerm);
      });
    }

    return this.db
      .query(
        "SELECT * FROM communes WHERE nom ~* ($1) OR LPAD(code_postal, 5, '0') ILIKE $2",
        [terms.join("|"), `${q}%`]
      )
      .then(res => {
        citiesWithDistricts.forEach(({ nom, code_postal, code_insee }) => {
          const hasCityInResults = !!res.rows.find(city => {
            // eslint-disable-next-line security/detect-non-literal-regexp
            const regex = new RegExp(`^${nom} \\d{2}$`);
            return regex.test(city.nom);
          });

          if (hasCityInResults) {
            res.rows.unshift({
              nom,
              code_postal,
              code_insee
            });
          }
        });

        return res.rows;
      })
      .catch(e => {
        console.error("Communes::search", e);
        return null;
      });
  }
}
