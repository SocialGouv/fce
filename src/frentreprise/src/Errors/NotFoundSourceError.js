/* istanbul ignore file */
/**
 * @summary A error thrown when a sorce not exist.
 */
function NotFoundSourceError(message) {
  this.message = `The source ${message} is not found`;
}

NotFoundSourceError.prototype = Object.create(Error.prototype, {
  constructor: { value: NotFoundSourceError },
  name: { value: "NotFoundSourceError" },
  stack: {
    get: function () {
      return new Error().stack;
    },
  },
});

export default NotFoundSourceError;
