const _get = require("lodash.get");

class Injestor {
  constructor(config) {
    this._config = config;
  }

  getConfig(key) {
    return _get(this._config, key);
  }

  execute() {
    const filename = this.getConfig("filename");
    console.log({ filename });
  }
}

module.exports = Injestor;
