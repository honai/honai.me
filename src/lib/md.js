import unified from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"

const processer = unified().use(remarkParse).use(remarkRehype).use(rehypeStringify)

/** @type {(md: string) => string} */
export const mdToHtml = (md) => {
  const vfile = processer.processSync(md)
  return vfile.contents.toString()
}
