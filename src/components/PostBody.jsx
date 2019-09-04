import markdownIt from 'markdown-it'
import mk from 'markdown-it-katex'
import { primaryColor } from 'src/components/theme'
import Main from 'src/components/Main'

const md = new markdownIt({ html: true })

// https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md#renderer
var defaultRender =
  md.renderer.rules.link_open ||
  function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }
// eslint-disable-next-line @typescript-eslint/camelcase
md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
  var aIndex = tokens[idx].attrIndex('target')
  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank'])
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank'
  }
  tokens[idx].attrPush(['rel', 'noopener noreferrer'])
  return defaultRender(tokens, idx, options, env, self)
}

md.use(mk, { throwOnError: false, errorColor: ' #cc0000' })

const PostBody = ({ content }) => {
  const contentHtml = md.render(content)
  return (
    <Main>
      <article dangerouslySetInnerHTML={{ __html: contentHtml }} />
      <style jsx>
        {`
          article {
            padding: 0 10px;
          }
          @media screen and (min-width: 992px) {
            article {
              font-size: 18px;
            }
          }
          article :global(*) {
            max-width: 100%;
          }
          article :global(h1) {
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          }
          article :global(h2) {
            line-height: 1.5;
            display: flex;
            align-items: center;
            margin: 2rem 0 1.5rem;
          }
          article :global(h2::before) {
            content: '';
            background-color: ${primaryColor};
            height: 25px;
            width: 5px;
            border-radius: 3px;
            margin-right: 15px;
          }
          article :global(h2::after) {
            content: '';
            border-bottom: 1px dashed;
            border-color: rgba(0, 0, 0, 0.2);
            flex: 1 1 auto;
            margin-left: 10px;
          }
          article :global(img) {
            display: inline-block;
            max-width: calc(100% - 10px);
            max-height: 50vh;
            margin: 5px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          }
          article :global(blockquote) {
            background-color: ${primaryColor}11;
            padding: 1px 10px;
            border-radius: 0 3px 3px 0;
            border-left: 3px solid ${primaryColor}DD;
            padding-left: 20px;
          }
          article :global(code),
          article :global(pre) {
            font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace;
            font-size: 0.85rem;
            background-color: ${primaryColor}11;
            border-radius: 3px;
          }
          article :global(code) {
            padding: 0.2em 0.4em;
          }
          article :global(pre) {
            padding: 16px;
            overflow-x: auto;
          }
          article :global(pre code) {
            background-color: transparent;
          }
          article :global(table) {
            border-collapse: collapse;
            width: 100%;
          }
          article :global(table th),
          article :global(table td) {
            padding: 0.5rem;
            vertical-align: top;
            border-top: 1px solid #dee2e6;
          }
          article :global(table thead th) {
            vertical-align: bottom;
            border-bottom: 2px solid #dee2e6;
          }
        `}
      </style>
    </Main>
  )
}

export default PostBody
