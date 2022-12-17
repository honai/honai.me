import esbuild from "esbuild";

export const compile = async (inputPath: string) => {
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
  return res.outputFiles[0].text;
};
