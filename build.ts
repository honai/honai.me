import fs from "node:fs/promises";
import path from "node:path";

import { load } from "js-yaml";

import _redirects from "./src/_redirects.js";
import NotFound from "./src/404.js";
import { wrapPage } from "./lib/page.js";
import { getCssText } from "./src/_includes/style.js";
import { Profile } from "./src/_data/profile.js";
import Works from "./src/works.js";
import SlideIndex from "./src/slides/index.js";
import getSlides from "./src/_data/slides.js";
import SlidePage from "./src/slides/SlidePage.js";
import SlideEmbed from "./src/slides/SlideEmbed.js";

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
  const slides = await getSlides();

  await fs.cp(staticDir, distDir, { recursive: true });
  await Promise.all([
    write("/_redirects", _redirects),
    write("/404.html", wrapPage("/404.html", NotFound)),
    writePage("/works/", (u) => wrapPage(u, () => Works({ profile }))),
    writePage("/slides/", (u) => wrapPage(u, () => SlideIndex({ slides }))),
    ...slides.map((s) =>
      writePage(`/slides/${s.slug}/`, (u) =>
        wrapPage(u, () => SlidePage({ slide: s }))
      )
    ),
    ...slides.map((s) =>
      writePage(`/slides/embed/${s.slug}/`, (u) =>
        wrapPage(u, () => SlideEmbed({ slide: s }))
      )
    ),
  ]);

  // css
  await write("/styles/index.css", getCssText());
}

type AbsolutePath = `/${string}`;
type TrailingSlash = `${AbsolutePath}/`;

async function write(absPath: AbsolutePath, content: string) {
  const file = path.join(distDir, absPath);
  const dir = path.dirname(file);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(file, content, { encoding: "utf-8" });
}

async function writePage(
  canonicalPath: TrailingSlash,
  Fn: (url: string) => string
) {
  const file = path.join(canonicalPath, "index.html") as AbsolutePath;
  await write(file, Fn(canonicalPath));
}

const start = new Date();
build().then(() => {
  const time = new Date().valueOf() - start.valueOf();
  console.log(`Finished in ${time / 1000}s.`);
});
