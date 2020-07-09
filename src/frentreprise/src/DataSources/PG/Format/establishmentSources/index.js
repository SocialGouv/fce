import exportAllFiles from "../../../../Utils/exportAllFiles";

const context = require.context("./", true, /\.(js)$/);
const files = exportAllFiles(context);

export default files;
