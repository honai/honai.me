import path from "path"
import fs from "fs"
import matter from "gray-matter"

import { dev, prerendering } from "$app/env"

import { mdToHtmlToc } from "./md"

const BLOG_DIR = "content/blog"
const EXT_MD = ".md"

/** @type {(data: any, slug: string, filePath: string) => import("./posts").PostMeta} */
const frontMatterToPostMeta = (data, slug, filePath) => {
  const { title, description, date, updated, og_image_url } = data
  if (typeof date !== "s")
    if (dev || prerendering) {
      if ([title, description, date].some((e) => !e)) {
        console.error("Some of front matter is missing", data)
        throw Error("Some of front matter is missing")
      }
      if (!og_image_url) {
        console.warn("OG Image is not defined", data.title)
      }
    }
  const ogImageUrl = og_image_url
    ? og_image_url.startsWith("/")
      ? `https://www.honai.me${og_image_url}`
      : og_image_url
    : undefined
  return { title, description, date, updated, ogImageUrl, slug, filePath }
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
      return frontMatterToPostMeta(data, slug, file)
    })
}

/** @type {(slug: string) => import("./posts").Post | null} */
export const findSinglePost = (slug) => {
  const file = fs.readdirSync(BLOG_DIR).find((f) => f.endsWith(`${slug}.md`))
  if (!file) {
    return null
  }
  const filePath = path.join(BLOG_DIR, file)
  const md = fs.readFileSync(filePath)
  const { content, data } = matter(md)
  const { html, toc, tocIDs } = mdToHtmlToc(content)
  return { meta: frontMatterToPostMeta(data, slug, filePath), contentHtml: html, toc, tocIDs }
}
