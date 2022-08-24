import { useEleventy } from "../EleventyContext";
import { Footer } from "../components/Footer";
import { Script } from "../components/Script";
import { ArticleHeader } from "../components/blog/ArticleHeader";
import { css, uc } from "../style.mjs";
import { PostMd } from "../components/blog/PostMd";
import { Toc } from "../components/blog/Toc";
import { PostNavigate } from "../components/blog/PostNavigate";
import { BaseHtml } from "./BaseHtml";
import { Header } from "../components/Header";
import VerticalGrow from "../components/VerticalGrow";
import { TwitterShareIcon, TwitterShareLink } from "../components/TwitterShare";

const githubLinkBase = "https://github.com/honai/honai.me/blob/main/";

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
    <BaseHtml
      title={title}
      description={description}
      thumbnailUrl={thumbnail_url || "/images/profile.png"}
      twitterCard={thumbnail_url ? { kind: "large" } : { kind: "normal" }}
      lazyStylesheets={[
        "/styles/prism-tomorrow.min.css",
        "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css",
      ]}
    >
      <VerticalGrow>
        <Header maxWidth="120rem" />
        <VerticalGrow.Grow>
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
                <div class={css({ color: "$textSecondary" })()}>
                  <a
                    href={`${githubLinkBase}${page.inputPath}`}
                    class={uc.uncolor}
                  >
                    この記事の編集をリクエスト (GitHub)
                  </a>
                  <br />
                  <TwitterShareLink path={page.url} title={title}>
                    ツイート
                  </TwitterShareLink>
                </div>
                <PostNavigate newerPost={newerPost} olderPost={olderPost} />
              </div>
            </aside>
            <div className="main">
              <main>
                <PostMd content={content} />
              </main>
            </div>
          </article>
          <div class={css({ textAlign: "center", marginBlockStart: "0rem" })()}>
            <TwitterShareIcon path={page.url} title={title} />
          </div>
          <Footer />
        </VerticalGrow.Grow>
      </VerticalGrow>
      {plugins.includes("twitter") && (
        <Script type="application/json" class="external-scripts-list">{`
          ["https://platform.twitter.com/widgets.js"]
        `}</Script>
      )}
      <script type="module" src="/js/post-page.js"></script>
    </BaseHtml>
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
