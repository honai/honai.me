import path from "path"
import fs from "fs"
import matter from "gray-matter"
import { mdToHtml } from "./md"

const blogDir = "content/blog"

/**
 * @typedef {Object} PostMeta
 * @property {{ slug: string, year: string }} params
 */

/**
 * @typedef {Object} Post
 * @property {PostMeta} meta
 * @property {string} content
 */

/** @type {() => PostMeta[]} */
export const listPosts = () => {
  return fs
    .readdirSync(blogDir, { withFileTypes: true })
    .filter((d) => d.isFile() && path.extname(d.name) === ".md")
    .map((d) => d.name)
    .sort((a, b) => (a === b ? 0 : a > b ? -1 : 1))
    .map((file) => path.join(blogDir, file))
    .map((file) => {
      const md = fs.readFileSync(file)
      const { data } = matter(md)
      const year = new Date(data.date).getFullYear().toString()
      const slug = path.basename(file, ".md").split("_").slice(-1)[0]
      return { ...data, params: { slug, year } }
    })
}

/** @type {(slug: string) => Post | null} */
export const findSinglePost = (slug) => {
  const file = fs.readdirSync(blogDir).find((f) => f.endsWith(`${slug}.md`))
  if (!file) {
    return null
  }
  const md = fs.readFileSync(path.join(blogDir, file))
  const { content, data } = matter(md)
  return { content: mdToHtml(content), meta: data }
}
