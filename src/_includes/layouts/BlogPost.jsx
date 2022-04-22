import { BlogHeader } from "../components/blog/BlogHeader";
import { BlogLayout } from "./BlogLayout";
import { useEleventy } from "../EleventyContext";
import { Footer } from "../components/Footer";
import { Script } from "../components/Script";
import { AdSenseWrap } from "../components/AdSenseWrap";
import { ArticleHeader } from "../components/blog/ArticleHeader";
import { css } from "../style.mjs";
import { PostMd } from "../components/blog/PostMd";
import { Toc } from "../components/blog/Toc";
import { PostNavigate } from "../components/blog/PostNavigate";

const githubLinkBase = "https://github.com/honai/honai.me/blob/main/";
const styleSheets = [
  {
    href: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/themes/prism-tomorrow.min.css",
    integrity: "sha256-xevuwyBEb2ZYh4nDhj0g3Z/rDBnM569hg9Vq6gEw/Sg=",
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
  og_image_url,
  updated,
  plugins,
}) => {
  const fn = useEleventy();
  const newerPost = fn.getPreviousCollectionItem(collections.posts, page);
  const olderPost = fn.getNextCollectionItem(collections.posts, page);
  return (
    <BlogLayout
      pageUrl={page.url}
      title={title}
      description={description}
      ogImageUrl={og_image_url}
      styleSheets={styleSheets}
    >
      <div class="body-layout">
        <BlogHeader />
        <div class="grow">
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

            <div class="ad">
              <AdSenseWrap>
                {/* 記事の下 */}
                <ins
                  class="adsbygoogle"
                  style="display:block"
                  data-ad-client="ca-pub-9155380222623167"
                  data-ad-slot="4880052047"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </AdSenseWrap>
            </div>
          </article>
        </div>
        <Footer />
      </div>

      <script defer src="/scripts/blog-post.js"></script>
      {plugins.includes("twitter") && (
        <Script type="application/json" class="external-scripts-list">{`
          ["https://platform.twitter.com/widgets.js"]
        `}</Script>
      )}
    </BlogLayout>
  );
};

const articleLayout = css({
  padding: "1rem",
  "@md": {
    display: "grid",
    gridTemplateAreas: `"header header"
                        "main   aside"
                        "ad     ."`,
    maxWidth: "120rem",
    margin: "0 auto",
    gridTemplateColumns: "minmax(0, 1fr) min(30rem, 30vw)",
    gridTemplateRows: "18rem auto auto",
    padding: "2rem 3rem",
    gap: "2rem 6rem",
    "> .header": { gridArea: "header", maxWidth: "72rem", margin: "auto" },
    "> .aside": { gridArea: "aside" },
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
    "> .ad": { gridArea: "ad", margin: "1rem" },
  },
});

const postEditLink = css({ color: "var(--color-text-secondary)" });
