const esbuild = require("esbuild");

module.exports = {
  outputFileExtension: "js",
  init() {},
  compile: async (_, inputPath) => {
    const isDev =
      process.env.NODE_ENV === "development" ||
      process.env.npm_lifecycle_event === "dev";
    const res = await esbuild.build({
      entryPoints: [inputPath],
      write: false,
      bundle: true,
      format: "esm",
      minify: !isDev,
      sourcemap: isDev ? "inline" : false,
    });
    if (res.outputFiles.length !== 1) {
      throw new Error("esbuild multiple output");
    }
    const out = res.outputFiles[0].text;
    return async () => {
      return out;
    };
  },
  read: false,
};
