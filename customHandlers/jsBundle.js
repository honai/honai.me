const esbuild = require("esbuild");

module.exports = {
  outputFileExtension: "js",
  init() {},
  compile: async (_, inputPath) => {
    const isProd = process.env.NODE_ENV === "production";
    const res = await esbuild.build({
      entryPoints: [inputPath],
      write: false,
      bundle: true,
      format: "esm",
      minify: isProd,
      sourcemap: isProd ? false : "inline",
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
