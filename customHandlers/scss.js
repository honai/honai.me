const path = require("path");
const sass = require("sass");

module.exports = {
  outputFileExtension: "css",
  compile: async function (inputContent, inputPath) {
    const parsed = path.parse(inputPath);
    if (parsed.name.startsWith("_")) {
      return;
    }
    const result = sass.compileString(inputContent, {
      loadPaths: [parsed.dir, this.config.dir.includes],
      style: "compressed",
    });
    return async (data) => {
      return result.css;
    };
  },
};
