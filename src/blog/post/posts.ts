import { readdir } from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { dirName } from "../../lib.js";
import { renderPost, Toc } from "../../../lib/md.js";

const __dirname = dirName(import.meta.url);

interface FM {
  title: string;
  description: string;
  date: string;
  updated?: string;
  thumbnail_url?: string;
  plugins?: ("twitter" | "math")[];
}

export interface Post extends Omit<FM, "date"> {
  content: string;
  slug: string;
  date: Date;
  toc: Toc[];
}

export const getPosts = async (): Promise<Post[]> => {
  const mdFiles = await (
    await readdir(__dirname)
  ).filter((f) => path.extname(f) === ".md" && !f.startsWith("!"));
  return mdFiles
    .map((f) => {
      const slug = path.basename(f, ".md");
      const { content: md, data } = matter.read(path.join(__dirname, f));
      const fm = data as FM;
      checkFm(fm);
      const { html, toc } = renderPost(md);
      return {
        ...fm,
        date: new Date(fm.date),
        content: html,
        toc,
        slug,
      };
    })
    .sort((a, b) => b.date.valueOf() - a.date.valueOf());
};

const checkFm = (fm: FM) => {
  if (!fm.title || !fm.date || !fm.description) {
    throw `Missing property in post frontmatter: ${fm.title}`;
  }
};
