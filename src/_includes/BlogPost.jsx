import { BlogHeader } from "./BlogHeader";
import { BlogLayout } from "./layouts/BlogLayout";
import { useEleventy } from "./EleventyContext";
import { Footer } from "./Footer";
import { Script } from "./Script";

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
          <article class="article-layout">
            <header class="header article-header">
              <h1 class="title">{title}</h1>
              <div class="meta">
                <div class="century-gothic date">
                  <time id="published-time" dateTime={fn.isodate(page.date)}>
                    {fn.isodate(page.date)}
                  </time>
                  {updated && (
                    <>
                      {" "}
                      (Updated at{" "}
                      <time id="updated-time" dateTime={fn.isodate(updated)}>
                        {updated}
                      </time>
                      )
                    </>
                  )}
                </div>
              </div>
            </header>

            <aside class="aside">
              <div class="sticky">
                <div class="post-toc">
                  <div class="title">目次</div>
                  {/* div > nav.toc > ol > li > a.-active */}
                  <div dangerouslySetInnerHTML={{ __html: fn.toc(content) }} />
                </div>

                <div class="post-navigate">
                  <div>
                    <a href="/blog">記事一覧</a>
                  </div>
                  {newerPost && (
                    <div>
                      次の記事:{" "}
                      <a href={newerPost.url}>{newerPost.data.title}</a>
                    </div>
                  )}
                  {olderPost && (
                    <div>
                      前の記事:{" "}
                      <a href={olderPost.url}>{olderPost.data.title}</a>
                    </div>
                  )}
                </div>

                <div class="post-edit">
                  <a href={`${githubLinkBase}${page.inputPath}`} class="link">
                    この記事の編集をリクエスト (GitHub)
                  </a>
                </div>
              </div>
            </aside>

            <main class="main">
              <div
                class="post-markdown"
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
            </main>

            <div class="ad ad-sense">
              {/* 記事の下 */}
              <ins
                class="adsbygoogle"
                style="display:block"
                data-ad-client="ca-pub-9155380222623167"
                data-ad-slot="4880052047"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
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
