import Model from "./Model";

export default class Communes extends Model {
  constructor() {
    super();
    this.saintTerms = ["ste", "sainte", "saint", "st"];
  }

  search(q) {
    const terms = [q];
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
        return res.rows;
      })
      .catch(e => {
        console.error("Communes::search", e);
        return null;
      });
  }
}
