/* istanbul ignore file */
/**
 * @summary A error thrown when a given SIRET or SIREN is invalid.
 */
function InvalidIdentifierError(message) {
  this.message = `Invalid SIRET or SIREN. ${message}`;
}

InvalidIdentifierError.prototype = Object.create(Error.prototype, {
  constructor: { value: InvalidIdentifierError },
  name: { value: "InvalidIdentifierError" },
  stack: {
    get: function() {
      return new Error().stack;
    }
  }
});

export default InvalidIdentifierError;
