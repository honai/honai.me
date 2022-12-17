import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { marked } from "marked";

import { dirName } from "../lib.js";

type FM = {
  [key in "title" | "thumbnail"]: string;
};

export type Talk = FM & {
  content: string;
  date: string;
  slug: string;
};

const dirname = dirName(import.meta.url);

export const getTalks = async (): Promise<Talk[]> => {
  const mdFiles = await (
    await fs.readdir(dirname)
  ).filter((f) => path.extname(f) === ".md");
  return mdFiles.map((f) => {
    const b = path.basename(f, ".md");
    const date = b.slice(0, 10);
    const slug = b.slice(11);
    const { data, content: md } = matter.read(path.join(dirname, f));
    const content = marked.parse(md);
    const typedData = data as FM;
    return { ...typedData, date, slug, content };
  });
};
