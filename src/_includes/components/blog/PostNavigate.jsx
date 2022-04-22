export const PostNavigate = ({ newerPost, olderPost }) => (
  <div>
    <div>
      <a href="/blog">記事一覧</a>
    </div>
    {newerPost && (
      <div>
        次の記事: <a href={newerPost.url}>{newerPost.data.title}</a>
      </div>
    )}
    {olderPost && (
      <div>
        前の記事: <a href={olderPost.url}>{olderPost.data.title}</a>
      </div>
    )}
  </div>
);
