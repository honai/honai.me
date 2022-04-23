import { useEleventy } from "../_includes/EleventyContext";
import { BlogIndex } from "../_includes/layouts/BlogIndex";

export const data = {
  pagination: {
    data: "collections.posts",
    size: 10,
    reverse: true,
  },
};

export default ({ page, pagination }) => {
  const { isodate } = useEleventy();
  const posts = pagination.items.map((p) => ({
    date: isodate(p.date),
    url: p.url,
    title: p.data.title,
    description: p.data.description,
  }));
  return <BlogIndex pageUrl={page.url} pagination={pagination} posts={posts} />;
};
