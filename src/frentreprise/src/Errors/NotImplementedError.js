/* istanbul ignore file */
/**
 * @summary A error thrown when a method is defined but not implemented (yet).
 * @param {any} message An additional message for the error.
 */
function NotImplementedError(message) {
  ///<summary>The error thrown when the given function isn't implemented.</summary>
  const sender = new Error().stack.split("\n")[2].replace(" at ", "");

  this.message = `The method ${sender} isn't implemented.`;

  // Append the message if given.
  if (message) this.message += ` Message: "${message}".`;

  let str = this.message;

  while (str.indexOf("  ") > -1) {
    str = str.replace("  ", " ");
  }

  this.message = str;
}

NotImplementedError.prototype = Object.create(Error.prototype, {
  constructor: { value: NotImplementedError },
  name: { value: "NotImplementedError" },
  stack: {
    get: function() {
      return new Error().stack;
    }
  }
});

export default NotImplementedError;
