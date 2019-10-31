const MissingOptionException = require("../Exceptions/MissingOptionException");

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
}

module.exports = Shell;
