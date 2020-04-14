const MissingOptionException = require("../Exceptions/MissingOptionException");
const _get = require("lodash.get");

class Shell {
  constructor(args, options, config) {
    this._args = args;
    this._options = options;
    this._config = config;
  }

  isVerbose() {
    return !!this._options.verbose;
  }

  checkRequiredOption(option) {
    if (!Object.prototype.hasOwnProperty.call(this._options, option)) {
      throw new MissingOptionException(option);
    }

    return true;
  }

  getConfig(key, defaultValue = undefined) {
    return _get(this._config, key, defaultValue);
  }

  getEnvConfig(key, defaultValue = undefined) {
    return this.getConfig(`env.${key}`, defaultValue);
  }
}

module.exports = Shell;
