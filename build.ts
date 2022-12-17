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
import { getTalks } from "./src/talks/talks.js";
import TalkPage from "./src/_includes/layouts/TalkPage.js";
import TalkIndex from "./src/TalkIndex.js";
import { getPosts } from "./src/blog/post/posts.js";
import PostIndex from "./src/blog/PostIndex.js";
import BlogPost from "./src/_includes/layouts/BlogPost.js";
import rss from "./src/rss.js";

const cwd = process.cwd();
const distDir = path.join(cwd, "build");
const srcDir = path.join(cwd, "src");
const staticDir = path.join(cwd, "static");

const SITE_DOMAIN = "www.honai.me";

async function build() {
  const profile = load(
    await fs.readFile(path.join(srcDir, "_data/profile.yaml"), {
      encoding: "utf-8",
    })
  ) as Profile;
  const slides = await getSlides();
  const talks = await getTalks();
  const posts = await getPosts();
  const paginatedPosts = paginate(posts, 15, `/blog/`);
  console.log(paginatedPosts);
  const prevNextPosts = posts.map((p, i) => ({
    post: p,
    newerPost: i === 0 ? undefined : posts[i - 1],
    olderPost: i === posts.length - 1 ? undefined : posts[i + 1],
  }));

  await fs.cp(staticDir, distDir, { recursive: true });
  await Promise.all<Promise<void>[]>([
    write("/_redirects", _redirects),
    write("/404.html", wrapPage("/404.html", NotFound)),
    writePage("/works/", (u) => wrapPage(u, () => Works({ profile }))),
    // slides
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
    // talks
    writePage("/talks/", (u) => wrapPage(u, () => TalkIndex({ talks }))),
    ...talks.map((talk) =>
      writePage(`/talks/${talk.slug}/`, (u) =>
        wrapPage(u, () => TalkPage(talk))
      )
    ),
    // posts
    ...paginatedPosts.map((page) =>
      writePage(page.currentHref, (u) =>
        wrapPage(u, () => PostIndex({ ...page, posts: page.grouped }))
      )
    ),
    ...prevNextPosts.map((props) =>
      writePage(`/blog/post/${props.post.slug}/`, (u) =>
        wrapPage(u, () => BlogPost(props))
      )
    ),
    // feed
    write("/blog/rss.xml", rss(posts, SITE_DOMAIN)),
  ]);

  // css
  await write("/styles/index.css", getCssText());
  await fs.copyFile(
    path.join(cwd, "node_modules/highlight.js/styles/github-dark-dimmed.css"),
    path.join(distDir, "styles/highlight.css")
  );
}

type AbsolutePath = `/${string}`;
type TrailingSlash = `${AbsolutePath}/`;

async function write(absPath: AbsolutePath, content: string) {
  const file = path.join(distDir, absPath);
  const dir = path.dirname(file);
  console.log(`Writing ${path.relative(cwd, file)}`);
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

type Page<T> = {
  prevHref?: TrailingSlash;
  currentHref: TrailingSlash;
  nextHref?: TrailingSlash;
  total: number;
  currentIdx: number;
  grouped: T[];
};

function paginate<T>(data: T[], by: number, baseUrl: TrailingSlash): Page<T>[] {
  // 0番目はbaseurlそのまま
  const toHref = (i: number): TrailingSlash =>
    i === 0 ? baseUrl : `${baseUrl}${i.toString(10)}/`;

  const groups = Math.ceil(data.length / by);
  return Array(groups)
    .fill(0)
    .map((_, i) => ({
      currentIdx: i,
      total: groups,
      grouped: data.slice(i * by, (i + 1) * by),
      prevHref: i === 0 ? undefined : toHref(i - 1),
      currentHref: toHref(i),
      nextHref: i === groups - 1 ? undefined : toHref(i + 1),
    }));
}

const start = new Date();
build().then(() => {
  const time = new Date().valueOf() - start.valueOf();
  console.log(`Finished in ${time / 1000}s.`);
});
