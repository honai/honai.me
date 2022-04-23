/**
 * @typedef PostItem
 * @prop {string} date ISO Date
 * @prop {string} url
 * @prop {string} title
 * @prop {string} description
 */

import { css, cx } from "../../style.mjs";

/**
 * @param {object} p
 * @param {PostItem[]} p.posts
 */
export const PostList = ({ posts }) => {
  return (
    <ul class={listStyle()}>
      {posts.map((post) => (
        <li>
          <div class={dateSty()}>
            <time dateTime={post.date} class="post-publish-date">
              {post.date}
            </time>
          </div>
          <h2 class={titleSty()}>
            <a href={post.url} class={cx("_reset-a", titleLink())}>
              {post.title}
            </a>
          </h2>
          <p class={descSty()}>
            {post.description}
            ...
            <a href={post.url} class={cx("_reset-a", moreSty())}>
              この記事を読む
            </a>
          </p>
        </li>
      ))}
    </ul>
  );
};

const listStyle = css({
  listStyleType: "none",
  padding: "3.6rem 0",
  display: "flex",
  flexFlow: "column",
  gap: "3.6rem",
});

const dateSty = css({ color: "rgba(0, 0, 0, 0.75)" });
const titleSty = css({
  fontSize: "2.4rem",
  padding: "0.5rem 0",
  borderBottom: "1px solid $primary",
  color: "$primary",
});
const titleLink = css({ display: "block", textDecoration: "none" });
const descSty = css({ padding: "0.5rem 0" });
const moreSty = css({ textDecoration: "underline" });
