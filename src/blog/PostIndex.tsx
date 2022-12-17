import { Paginate } from "../types.js";
import { BlogPagination } from "../_includes/components/blog/BlogPagination.js";
import { DateTag } from "../_includes/components/DateTag.js";
import { PortfolioHero } from "../_includes/components/PortfolioHero.js";
import { useEleventy } from "../_includes/EleventyContext.js";
import { PortfolioLayout } from "../_includes/layouts/PortfolioLayout.js";
import { css, uc } from "../_includes/style.js";
import { Post } from "./post/posts.js";

interface Props extends Paginate {
  posts: Post[];
}

export default ({ posts, ...pagination }: Props) => {
  const { isodate } = useEleventy();
  const postsFixed = posts.map((p) => ({
    date: isodate(p.date),
    url: `/blog/post/${p.slug}/`,
    title: p.title,
    desc: p.description,
    thumb: p.thumbnail_url
      ? {
          url: p.thumbnail_url,
          alt: p.title,
        }
      : null,
  }));
  return (
    <PortfolioLayout subTitle="Blog">
      <PortfolioHero title="Blog" />
      <div class={postsLayout()}>
        {postsFixed.map((p) => (
          <article class={article()}>
            <div class={thumb({ display: p.thumb ? null : "hideOnSm" })}>
              {p.thumb ? (
                <a href={p.url} class={css({ width: "100%" })()}>
                  <img
                    src={p.thumb.url}
                    alt={p.thumb.alt}
                    loading="lazy"
                    class={thumbImg()}
                  />
                </a>
              ) : (
                <span
                  class={css({
                    centuryGothic: true,
                    margin: "auto",
                    color: "$textSecondary",
                  })()}
                >
                  No image
                </span>
              )}
            </div>
            <h3 class={title()}>
              <a href={p.url} class={uc.uncolor}>
                {p.title}
              </a>
            </h3>
            <div class={desc()}>
              <p class={description()}>{p.desc}</p>
              <div
                class={css({
                  fontSize: "1.4rem",
                  color: "$textSecondary",
                  display: "flex",
                  justifyContent: "space-between",
                })()}
              >
                <DateTag date={p.date} />
                <a href={p.url} class={uc.uncolor}>
                  続きを読む
                </a>
              </div>
            </div>
          </article>
        ))}
        <BlogPagination {...pagination} />
      </div>
    </PortfolioLayout>
  );
};

const title = css({
  lineHeight: 1.5,
  color: "$text",
});

const description = css({
  $$fs: "1.4rem",
  $$lh: 1.75,
  fontSize: "$$fs",
  lineHeight: "$$lh",
  $$actualLh: "calc($$fs * $$lh)",
  height: "calc($$actualLh * 4)",
  overflowY: "hidden",
  position: "relative",
  "&::after": {
    content: "",
    display: "block",
    position: "absolute",
    top: "calc($$actualLh * 3)",
    right: "0",
    height: "$$actualLh",
    width: "min(100%, 5rem)",
    background: "linear-gradient(to right, transparent, $fg)",
  },
});

const desc = css({
  $hash: "desc",
  display: "flex",
  flexFlow: "column nowrap",
  justifyContent: "space-between",
});

const thumbImg = css({
  display: "block",
  width: "100%",
  margin: "auto",
  aspectRatio: "2/1",
  objectFit: "cover",
  borderRadius: "$defaultRad",
});

const thumb = css({
  display: "flex",
  border: "1px solid $border",
  variants: {
    display: {
      hideOnSm: {
        "@smOnly": {
          display: "none",
        },
      },
    },
  },
});

const article = css({
  padding: "2rem 1rem",
  display: "grid",
  gap: "1rem",
  backgroundColor: "$fg",
  borderRadius: "$defaultRad",
  border: "1px solid $border",
  "@sm": {
    gridTemplateAreas: `"title title"
                        "thumb desc"`.replace(/\s+/, " "),
    gridTemplateColumns: "24rem 1fr",
    gap: "2rem",
    padding: "2rem",
    [`> .${title}`]: {
      gridArea: "title",
    },
    [`> .${desc}`]: {
      gridArea: "desc",
    },
    [`> .${thumb}`]: {
      gridArea: "thumb",
    },
  },
});

const postsLayout = css({
  width: "min(100% - 2rem, 72rem)",
  marginInline: "auto",
  display: "flex",
  flexFlow: "column nowrap",
  gap: "3.6rem",
});
