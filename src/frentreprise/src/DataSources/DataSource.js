/* istanbul ignore file */

import NotImplementedError from "../Errors/NotImplementedError";

export default class DataSource {
  async getSIRET() {
    throw new NotImplementedError();
  }

  async getSIREN() {
    throw new NotImplementedError();
  }

  getSIRETCheck() {
    throw new NotImplementedError();
  }

  getSIRENCheck() {
    throw new NotImplementedError();
  }
}
