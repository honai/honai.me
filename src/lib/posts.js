import path from "path"
import fs from "fs"
import matter from "gray-matter"

import { dev, prerendering } from "$app/env"

import { mdToHtmlToc } from "./md"

const BLOG_DIR = "content/blog"
const EXT_MD = ".md"

/** @type {(data: any, slug: string) => import("./posts").PostMeta} */
const frontMatterToPostMeta = (data, slug) => {
  const { title, description, date, updated, og_imaeg_url } = data
  if (typeof date !== "s")
    if (dev || prerendering) {
      if ([title, description, date].some((e) => !e)) {
        console.error(data)
        throw Error("Some of front matter is missing")
      }
    }
  const ogImageUrl = og_imaeg_url
    ? og_imaeg_url.startsWith("/")
      ? `https://www.honai.me${og_imaeg_url}`
      : og_imaeg_url
    : undefined
  return { title, description, date, updated, ogImageUrl, slug }
}

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
      return frontMatterToPostMeta(data, slug)
    })
}

/** @type {(slug: string) => import("./posts").Post | null} */
export const findSinglePost = (slug) => {
  const file = fs.readdirSync(BLOG_DIR).find((f) => f.endsWith(`${slug}.md`))
  if (!file) {
    return null
  }
  const md = fs.readFileSync(path.join(BLOG_DIR, file))
  const { content, data } = matter(md)
  const { html, toc, tocIDs } = mdToHtmlToc(content)
  return { meta: frontMatterToPostMeta(data, slug), contentHtml: html, toc, tocIDs }
}
