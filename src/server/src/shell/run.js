const argv = require("minimist")(process.argv.slice(2));
const { _: shellArgs, ...options } = argv;
const [scriptName, ...args] = shellArgs;
const className = scriptName + "Shell";

if (options.env) {
  process.env.NODE_ENV = options.env;
}
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const ShellClass = require(`./${className}`);
const shellClass = new ShellClass(args, options);
shellClass.execute();
