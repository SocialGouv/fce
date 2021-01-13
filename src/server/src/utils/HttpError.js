class HttpError extends Error {
  constructor(message = "Internal server error", status = 500) {
    super(`${status} // ${message}`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status;
    this.statusMessage = this.constructor.httpErrors[status];
  }

  static httpErrors = {
    409: "Conflict",
    500: "Internal Server Error",
  };
}

module.exports = HttpError;
