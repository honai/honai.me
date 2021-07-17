<script>
  /** @type {import('$lib/posts').PostMeta} */
  export let post

  const dateString = new Date(post.date).toLocaleDateString("ja")
</script>

<li class="post-list-item">
  <div class="date">
    <time datetime={post.date} class="post-publish-date">{dateString}</time>
  </div>
  <h2 class="title">
    <a href={`/blog/post/${post.slug}`} class="link _reset-a">{post.title}</a>
  </h2>
  <p class="description">
    {post.description}
    ...
    <a href={post.url} class="_reset-a more">この記事を読む</a>
  </p>
</li>

<style lang="scss">
  .post-list-item {
    > .date {
      color: rgba(0, 0, 0, 0.75);
    }
    > .title {
      font-size: 2.4rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--color-primary);
      color: var(--color-primary);
    }
    > .title > .link {
      display: block;
      text-decoration: none;
    }
    > .description {
      padding: 0.5rem 0;
    }
    > .description > .more {
      text-decoration: underline;
    }
  }
</style>
