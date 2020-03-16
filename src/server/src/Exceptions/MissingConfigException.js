class MissingConfigException extends Error {
  constructor(configName) {
    const finalMessage = `A config is missing : ${configName}`;
    super(finalMessage);
    this.name = this.constructor.name;

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(finalMessage).stack;
    }
  }
}

module.exports = MissingConfigException;
