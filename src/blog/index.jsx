import { BlogHeader } from "../_includes/components/BlogHeader";
import { BlogLayout } from "../_includes/layouts/BlogLayout";
import { BlogPagination } from "../_includes/components/BlogPagination";
import { Footer } from "../_includes/components/Footer";
import { Script } from "../_includes/components/Script";
import { AdSenseWrap } from "../_includes/components/AdSenseWrap";

export const data = {
  pagination: {
    data: "collections.posts",
    size: 10,
    reverse: true,
  },
};

export default ({ page, pagination }) => {
  return (
    <BlogLayout
      pageUrl={page.url}
      title="Honai's Blog"
      description="honaiのブログの記事一覧"
    >
      <div class="body-layout">
        <BlogHeader />
        <div class="grow post-list-layout">
          <h1 class="post-list-title century-gothic">Honai's Blog</h1>
          <ul class="post-list-ul">
            {pagination.items.map((post) => (
              <li class="post-list-item">
                <div class="date">
                  <time dateTime={post.date} class="post-publish-date">
                    {post.date}
                  </time>
                </div>
                <h2 class="title">
                  <a href={post.url} class="link _reset-a">
                    {post.data.title}
                  </a>
                </h2>
                <p class="description">
                  {post.data.description}
                  ...
                  <a href={post.url} class="_reset-a more">
                    この記事を読む
                  </a>
                </p>
              </li>
            ))}
          </ul>
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
