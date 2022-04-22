import { BlogHeader } from "../components/BlogHeader";
import { BlogLayout } from "../layouts/BlogLayout";
import { BlogPagination } from "../components/BlogPagination";
import { Footer } from "../components/Footer";
import { Script } from "../components/Script";
import { AdSenseWrap } from "../components/AdSenseWrap";
import { PostList } from "../components/blog/PostList";
import { css, cx } from "../style.mjs";

/**
 * @param {object} p
 * @param {string} p.pageUrl
 * @param {import("../components/blog/PostList").PostItem[]} p.posts
 * @param {unknown} p.pagination
 */
export const BlogIndex = ({ pageUrl, posts, pagination }) => {
  return (
    <BlogLayout
      pageUrl={pageUrl}
      title="Honai's Blog"
      description="honaiのブログの記事一覧"
    >
      <div class="body-layout">
        <BlogHeader />
        <div class={cx("grow", postListLayout())}>
          <h1 class={cx("century-gothic", titleSty())}>Honai's Blog</h1>
          <PostList posts={posts} />
          <BlogPagination pagination={pagination} />
          <AdSenseWrap>
            {/* ブログ記事一覧下 */}
            <ins
              class="adsbygoogle"
              style="display:block"
              data-ad-client="ca-pub-9155380222623167"
              data-ad-slot="3792188932"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          </AdSenseWrap>
        </div>
        <Footer />
      </div>
      <Script>{`
        const publishDateEls = document.getElementsByClassName('post-publish-date')
        for (const el of publishDateEls) {
          const date = new Date(el.getAttribute('datetime'))
          el.textContent = date.toLocaleDateString()
        }
      `}</Script>
    </BlogLayout>
  );
};

const postListLayout = css({
  width: "100%",
  maxWidth: "720px",
  margin: "0 auto",
  padding: "0 20px 20px",
});
const titleSty = css({ textAlign: "center", padding: "48px 0" });
