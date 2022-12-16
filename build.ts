import fs from "node:fs/promises";
import path from "node:path";

import { load } from "js-yaml";

import _redirects from "./src/_redirects.js";
import NotFound from "./src/404.js";
import { wrapPage } from "./lib/page.js";
import { getCssText } from "./src/_includes/style.js";
import { Profile } from "./src/_data/profile.js";
import Works from "./src/works.js";

const cwd = process.cwd();
const distDir = path.join(cwd, "build");
const srcDir = path.join(cwd, "src");
const staticDir = path.join(cwd, "static");

async function build() {
  const profile = load(
    await fs.readFile(path.join(srcDir, "_data/profile.yaml"), {
      encoding: "utf-8",
    })
  ) as Profile;

  await fs.cp(staticDir, distDir, { recursive: true });
  await Promise.all([
    write("/_redirects", _redirects),
    write("/404.html", wrapPage("/404.html", NotFound)),
    write(
      "/works/index.html",
      wrapPage("/works/", () => Works({ profile }))
    ),
  ]);
  await write("/styles/index.css", getCssText());
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
