import unified from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import rehypeSlug from "rehype-slug"
import rehypeRaw from "rehype-raw"
import rehypeToc from "rehype-toc"

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
        toc = node
        return false
      },
    })
    .use(rehypeStringify)

  const html = processer.processSync(md).toString()
  return { html, toc }
}
