import { useEleventy } from "../EleventyContext";
import { Footer } from "../components/Footer";
import { Script } from "../components/Script";
import { ArticleHeader } from "../components/blog/ArticleHeader";
import { css } from "../style.mjs";
import { PostMd } from "../components/blog/PostMd";
import { Toc } from "../components/blog/Toc";
import { PostNavigate } from "../components/blog/PostNavigate";
import { PortfolioLayout } from "./PortfolioLayout";

const githubLinkBase = "https://github.com/honai/honai.me/blob/main/";
const styleSheets = [
  {
    href: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/themes/prism-tomorrow.min.css",
    integrity: "sha256-xevuwyBEb2ZYh4nDhj0g3Z/rDBnM569hg9Vq6gEw/Sg=",
    async: true,
  },
  {
    href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css",
    integrity:
      "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X",
    async: true,
  },
];

export default ({
  content,
  page,
  collections,
  title,
  description,
  thumbnail_url,
  updated,
  plugins,
}) => {
  const fn = useEleventy();
  const newerPost = fn.getPreviousCollectionItem(collections.posts, page);
  const olderPost = fn.getNextCollectionItem(collections.posts, page);
  return (
    <PortfolioLayout
      pageUrl={page.url}
      subTitle={title}
      description={description}
      thumbnailUrl={thumbnail_url}
      headerMaxWidth="120rem"
    >
      <article class={articleLayout()}>
        <div class="header">
          <ArticleHeader
            title={title}
            published={fn.isodate(page.date)}
            updated={updated ?? fn.isodate(updated)}
          />
        </div>
        <aside class="aside">
          <div class="sticky">
            <Toc tocHtml={fn.toc(content)} />
            <PostNavigate newerPost={newerPost} olderPost={olderPost} />
            <div>
              <a
                href={`${githubLinkBase}${page.inputPath}`}
                class={postEditLink()}
              >
                この記事の編集をリクエスト (GitHub)
              </a>
            </div>
          </div>
        </aside>

        <main class="main">
          <PostMd content={content} />
        </main>
      </article>
      <Footer />
      <script defer src="/scripts/blog-post.js"></script>
      {plugins.includes("twitter") && (
        <Script type="application/json" class="external-scripts-list">{`
          ["https://platform.twitter.com/widgets.js"]
        `}</Script>
      )}
    </PortfolioLayout>
  );
};

const articleLayout = css({
  // FIXME: class直書き指定をやめる
  padding: "1rem",
  "& > .aside": {
    maxHeight: "50vh",
    overflowY: "auto",
    border: "1px solid $border",
  },
  "@md": {
    display: "grid",
    gridTemplateAreas: `"header header"
                        "main   aside"`,
    maxWidth: "120rem",
    margin: "0 auto",
    gridTemplateColumns: "minmax(0, 1fr) min(30rem, 30vw)",
    gridTemplateRows: "18rem auto",
    padding: "2rem 3rem",
    gap: "2rem 6rem",
    "> .header": { gridArea: "header", maxWidth: "72rem", margin: "auto" },
    "> .aside": {
      gridArea: "aside",
      maxHeight: "unset",
      border: "none",
      overflowY: "visible",
    },
    "> .main": { gridArea: "main" },
    "> .aside > .sticky": {
      position: "sticky",
      top: "2rem",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      maxHeight: "calc(100vh - 4rem)",
      overflowY: "auto",
    },
  },
});

const postEditLink = css({ color: "$textSecondary" });
