import { BlogHeader } from "../components/blog/BlogHeader";
import { BlogLayout } from "../layouts/BlogLayout";
import { BlogPagination } from "../components/blog/BlogPagination";
import { Footer } from "../components/Footer";
import { Script } from "../components/Script";
import { PostList } from "../components/blog/PostList";
import { css, cx } from "../style.mjs";
import VerticalGrow from "../components/VerticalGrow";

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
      <VerticalGrow>
        <BlogHeader />
        <VerticalGrow.Grow>
          <div class={postListLayout()}>
            <h1 class={cx(css({ centuryGothic: true })(), titleSty())}>
              Honai's Blog
            </h1>
            <PostList posts={posts} />
            <BlogPagination pagination={pagination} />
          </div>
        </VerticalGrow.Grow>
        <Footer />
      </VerticalGrow>
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
