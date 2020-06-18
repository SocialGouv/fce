const context = require.context("./", true, /\.(js)$/);
const sources = {};

context.keys().forEach((filenameWithPath) => {
  const filename = filenameWithPath.split("/").pop();
  const filenameWithoutExtension = filename.split(".").shift();

  try {
    if (filenameWithoutExtension !== "index") {
      sources[filenameWithoutExtension] = context(filenameWithPath).default;
    }
  } catch (error) {
    console.error(`Cannot load file ${filenameWithoutExtension}`);
  }
});

export default sources;
