import unified from "unified"
import remarkParse from "remark-parse"
import remarkPrism from "remark-prism"
import remarkMath from "remark-math"
import remarkRehype from "remark-rehype"
import rehypeRaw from "rehype-raw"
import rehypeKatex from "rehype-katex"
import rehypeSlug from "rehype-slug"
import rehypeToc from "rehype-toc"
import rehypeStringify from "rehype-stringify"

/** @typedef {import("rehype-toc").HtmlElementNode} Node */

/**
 * @typedef {Object} Toc
 * @prop {string} text
 * @prop {string} id
 * @prop {number} level
 * @prop {Toc[]} [children=[]]
 */

/** @param {Node} node */
const tocLi = (node) => {
  if (node.tagName !== "li") throw Error("not li")
  /** @type {Node} */
  const hId = node.data.hookArgs[0].properties.id
  const text = node.children[0].children[0].value
  let children = []
  if (node.children[1]) {
    children = node.children[1].children.map(tocLi)
  }
  return { id: hId, text, children }
}

/** @type {(toc: Toc) => string[]} */
const listTocIds = (toc) => {
  if (toc.children && toc.children.length > 0) {
    const childIDs = toc.children.map(listTocIds).flat()
    return [toc.id, ...childIDs]
  }
  return [toc.id]
}

/** @type {(md: string) => { html: string, toc: Toc[], tocIDs: string[] } */
export const mdToHtmlToc = (md) => {
  let toc = []
  let tocIDs = []
  const processer = unified()
    .use(remarkParse)
    .use(remarkPrism, { transformInlineCode: true })
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeToc, {
      headings: ["h1", "h2"],
      customizeTOC: (node) => {
        toc = node.children[0].children.map(tocLi)
        tocIDs = toc.map(listTocIds).flat()
        return false
      },
    })
    .use(rehypeKatex)
    .use(rehypeStringify)

  const html = processer.processSync(md).toString()
  return { html, toc, tocIDs }
}
