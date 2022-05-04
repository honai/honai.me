/**
 * @typedef Article
 * @prop {string} type
 * @prop {string} title
 * @prop {string} url
 * @prop {Date | string} date
 * @prop {{url: string; alt: string}} [thumb]
 */

import { useEleventy } from "../EleventyContext";
import { css } from "../style.mjs";
import { Link } from "./Link";
import SimpleCard from "./SimpleCard";

/** @param {{articles: Article[]}} p */
export const Recents = ({ articles }) => {
  const { isodate } = useEleventy();
  return (
    <SimpleCard id="feed" title="Recent Articles &amp; Talks">
      {articles.map((a) => {
        return (
          <SimpleCard.Content>
            <article class={articleSty()}>
              <Link href={a.url} class={articleThumb()}>
                {a.thumb ? (
                  <img src={a.thumb.url} alt={a.thumb.alt} loading="lazy" />
                ) : (
                  <div class={noImage()}>No Image</div>
                )}
              </Link>
              <div class={articleDesc()}>
                <h3>
                  <Link href={a.url} class={css({ fontSize: "1.8rem" })()}>
                    {a.title}
                  </Link>
                </h3>
                <div
                  class={css({
                    color: "$textSecondary",
                  })()}
                >
                  <div class={css({ centuryGothic: true })()}>
                    <span>{a.type}</span>&middot;{" "}
                    <time dateTime={isodate(a.date)}>{isodate(a.date)}</time>
                  </div>
                </div>
              </div>
            </article>
          </SimpleCard.Content>
        );
      })}
      <SimpleCard.Content>
        <div
          class={css({
            textAlign: "center",
            fontSize: "1.8rem",
            centuryGothic: true,
          })()}
        >
          <a href="/blog/">more articles</a>
          {" / "}
          <a href="/talks/">more talks</a>
        </div>
      </SimpleCard.Content>
    </SimpleCard>
  );
};

const noImage = css({
  backgroundColor: "$bg",
  color: "$textSecondary",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  centuryGothic: true,
});

const articleThumb = css({
  textDecoration: "none",
  aspectRatio: 2,
  "&::after": {
    display: "none !important",
  },
  [`& > img, & > .${noImage}`]: {
    borderRadius: "$defaultRad",
    border: "1px solid $border",
    width: "100%",
    height: "100%",
  },
  "& > img": {
    display: "block",
    objectFit: "cover",
  },
});

const articleDesc = css({
  display: "flex",
  flexFlow: "column nowrap",
  justifyContent: "space-between",
  lineHeight: 1.5,
});

const articleSty = css({
  width: "min(100%, 36rem)",
  marginInline: "auto",
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  [`& > .${articleThumb}`]: {
    flex: "1 1 auto",
  },
  "@sm": {
    width: "100%",
    gap: "2rem",
    flexWrap: "nowrap",
    [`& > .${articleThumb}`]: {
      flex: "0 0 24rem",
    },
  },
});
