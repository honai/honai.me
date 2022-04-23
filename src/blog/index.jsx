import { BlogIndex } from "../_includes/layouts/BlogIndex";

export const data = {
  pagination: {
    data: "collections.posts",
    size: 10,
    reverse: true,
  },
};

/** @type {(p: any) => import("../_includes/components/blog/PostList").PostItem} */
const convertPost = (p) => {
  return {
    date: p.date,
    url: p.url,
    title: p.data.title,
    description: p.data.description,
  };
};

export default ({ page, pagination }) => {
  return (
    <BlogIndex
      pageUrl={page.url}
      pagination={pagination}
      posts={pagination.items.map(convertPost)}
    />
  );
};
