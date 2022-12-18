import { Post } from "../../../blog/post/posts.js";

interface Props {
  newerPost?: Post;
  olderPost?: Post;
}
export const PostNavigate = ({ newerPost, olderPost }: Props) => (
  <div>
    <div>
      <a href="/blog">記事一覧</a>
    </div>
    {newerPost && (
      <div>
        次の記事:{" "}
        <a href={`/blog/post/${newerPost.slug}/`}>{newerPost.title}</a>
      </div>
    )}
    {olderPost && (
      <div>
        前の記事:{" "}
        <a href={`/blog/post/${olderPost.slug}/`}>{olderPost.title}</a>
      </div>
    )}
  </div>
);
