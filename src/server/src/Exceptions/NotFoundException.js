class NotFoundException extends Error {
  constructor(identifier) {
    const finalMessage = `${identifier} is not found`;
    super(finalMessage);
    this.name = this.constructor.name;

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(finalMessage).stack;
    }
  }
}

module.exports = NotFoundException;
