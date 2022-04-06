<script context="module">
  export const data = {
    pagination: {
      data: "collections.posts",
      size: 10,
      reverse: true,
    },
  };
</script>

<script>
  import BlogHeader from "../_includes/BlogHeader.svelte";
  import BlogLayout from "../_includes/BlogLayout.svelte";
  import BlogPagination from "../_includes/BlogPagination.svelte";
  import Footer from "../_includes/Footer.svelte";
  import Script from "../_includes/Script.svelte";

  export let page;
  export let pagination;
</script>

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
        {#each pagination.items as post}
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
              <a href={post.url} class="_reset-a more"> この記事を読む </a>
            </p>
          </li>
        {/each}
      </ul>
      <BlogPagination {pagination} />
      <div class="ad-sense">
        <!-- ブログ記事一覧下 -->
        <ins
          class="adsbygoogle"
          style="display:block"
          data-ad-client="ca-pub-9155380222623167"
          data-ad-slot="3792188932"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
    <Footer />
  </div>
</BlogLayout>
<Script
  js={`
    const publishDateEls = document.getElementsByClassName('post-publish-date')
    for (const el of publishDateEls) {
      const date = new Date(el.getAttribute('datetime'))
      el.textContent = date.toLocaleDateString()
    }
  `}
/>
