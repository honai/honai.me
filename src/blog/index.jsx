import { DateTag } from "../_includes/components/DateTag";
import { PortfolioHero } from "../_includes/components/PortfolioHero";
import { useEleventy } from "../_includes/EleventyContext";
import { PortfolioLayout } from "../_includes/layouts/PortfolioLayout";
import { css, uc } from "../_includes/style.mjs";

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
    desc: p.data.description,
    thumb: p.data.thumbnail_url
      ? {
          url: p.data.thumbnail_url,
          alt: p.title,
        }
      : null,
  }));
  return (
    <PortfolioLayout pageUrl={page.url} subTitle="Blog">
      <PortfolioHero title="Blog" />
      <div class={postsLayout()}>
        {posts.map((p) => (
          <article class={article()}>
            <div class={thumb({ display: p.thumb ? null : "hideOnSm" })}>
              {p.thumb ? (
                <a href={p.url}>
                  <img src={p.thumb.url} alt={p.thumb.alt} class={thumbImg()} />
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
      </div>
    </PortfolioLayout>
  );
};

const title = css({
  lineHeight: 1.5,
  color: "$text",
});

const description = css({
  $$lh: 1.75,
  lineHeight: "$$lh",
  $$actualLh: "1.6rem * $$lh",
  height: "calc($$actualLh * 3)",
  overflowY: "hidden",
  position: "relative",
  "&::after": {
    content: "",
    display: "block",
    position: "absolute",
    top: "calc($$actualLh * 2)",
    right: "0",
    height: "calc(1.6rem * $$lh)",
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
