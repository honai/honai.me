import path from "path"
import fs from "fs"
import matter from "gray-matter"
import { mdToHtml } from "./md"

const BLOG_DIR = "content/blog"
const EXT_MD = ".md"

export const listPosts = () => {
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((d) => d.isFile() && path.extname(d.name) === EXT_MD)
    .map((d) => d.name)
    .sort((a, b) => (a === b ? 0 : a > b ? -1 : 1))
    .map((file) => path.join(BLOG_DIR, file))
    .map((file) => {
      const md = fs.readFileSync(file)
      const { data } = matter(md)
      const slug = path.basename(file, EXT_MD).split("_").slice(-1)[0]
      return { ...data, slug }
    })
}

export const findSinglePost = (slug) => {
  const file = fs.readdirSync(BLOG_DIR).find((f) => f.endsWith(`${slug}.md`))
  if (!file) {
    return null
  }
  const md = fs.readFileSync(path.join(BLOG_DIR, file))
  const { content, data } = matter(md)
  return { content: mdToHtml(content), meta: data }
}
