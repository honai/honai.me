import fs from "node:fs/promises";
import path from "node:path";

import _redirects from "./src/_redirects.js";

const cwd = process.cwd();
const distDir = path.join(cwd, "build");
const srcDir = path.join(cwd, "src");
const staticDir = path.join(cwd, "static");

async function build() {
  await fs.cp(staticDir, distDir, { recursive: true });
  Promise.all([write("/_redirects", _redirects)]);
}

type AbsolutePath = `/${string}`;

async function write(absPath: AbsolutePath, content: string) {
  const file = path.join(distDir, absPath);
  const dir = path.dirname(file);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(file, content, { encoding: "utf-8" });
}

const start = new Date();
build().then(() => {
  const time = new Date().valueOf() - start.valueOf();
  console.log(`Finished in ${time / 1000}s.`);
});
