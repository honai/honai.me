import { useEleventy } from "../EleventyContext.js";
import { Footer } from "../components/Footer.js";
import { Script } from "../components/Script.js";
import { ArticleHeader } from "../components/blog/ArticleHeader.js";
import { css, uc } from "../style.js";
import { PostMd } from "../components/blog/PostMd.js";
import { Toc } from "../components/blog/Toc.js";
import { PostNavigate } from "../components/blog/PostNavigate.js";
import { BaseHtml } from "./BaseHtml.js";
import { Header } from "../components/Header.js";
import VerticalGrow from "../components/VerticalGrow.js";
import {
  TwitterShareIcon,
  TwitterShareLink,
} from "../components/TwitterShare.js";
import { Post } from "../../blog/post/posts.js";

const githubLinkBase = "https://github.com/honai/honai.me/blob/main/";

interface Props {
  post: Post;
  newerPost?: Post;
  olderPost?: Post;
}

export default ({ post, newerPost, olderPost }: Props) => {
  const fn = useEleventy();
  const { title, description, thumbnail_url, updated, date, content } = post;
  const url = `/blog/post/${post.slug}/`;
  return (
    <BaseHtml
      title={title}
      description={description}
      thumbnailUrl={thumbnail_url || "/images/profile.png"}
      twitterCard={thumbnail_url ? { kind: "large" } : { kind: "normal" }}
      lazyStylesheets={[
        "/styles/highlight.css",
        "https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css",
      ]}
    >
      <VerticalGrow>
        <Header maxWidth="120rem" />
        <VerticalGrow.Grow>
          <article class={articleLayout()}>
            <div class="header">
              <ArticleHeader
                title={title}
                published={fn.isodate(date)}
                updated={updated ? fn.isodate(updated) : undefined}
              />
            </div>
            <aside class="aside">
              <div class="sticky">
                <Toc tocHtml={"TODO"} />
                <div class={css({ color: "$textSecondary" })()}>
                  <a
                    href={`${githubLinkBase}/src/blog/post/${post.slug}.md`}
                    class={uc.uncolor}
                  >
                    この記事の編集をリクエスト (GitHub)
                  </a>
                  <br />
                  <TwitterShareLink path={url} title={title}>
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
            <TwitterShareIcon path={url} title={title} />
          </div>
          <Footer />
        </VerticalGrow.Grow>
      </VerticalGrow>
      {post.plugins && post.plugins.includes("twitter") && (
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
