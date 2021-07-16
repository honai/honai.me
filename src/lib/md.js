import unified from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import rehypeSlug from "rehype-slug"
import rehypeRaw from "rehype-raw"
import rehypeToc from "rehype-toc"

/** @typedef {import("rehype-toc").HtmlElementNode} Node */

/**
 * @typedef {Object} Toc
 * @prop {string} title
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

/** @type {(md: string) => { html: string, toc: any } */
export const mdToHtmlToc = (md) => {
  let toc
  const processer = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeToc, {
      headings: ["h1", "h2"],
      customizeTOC: (node) => {
        toc = node.children[0].children.map(tocLi)
        return false
      },
    })
    .use(rehypeStringify)

  const html = processer.processSync(md).toString()
  return { html, toc }
}
