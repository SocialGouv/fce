import postgres from "../db/postgres";

export default class Model {
  constructor() {
    this.db = postgres;
  }
}
