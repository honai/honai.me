/**
 * @typedef Article
 * @prop {string} title
 * @prop {string} url
 * @prop {Date | string} date
 * @prop {string} [thumb]
 * @prop {{url: string; title: string}} [source]
 */

import { useEleventy } from "../EleventyContext";
import { css, uc } from "../style.mjs";
import { Link } from "./Link";
import SimpleCard from "./SimpleCard";

/** @param {{articles: Article[]}} p */
export const Articles = ({ articles }) => {
  const { isodate } = useEleventy();
  return (
    <SimpleCard id="articles" title="Recent Articles">
      {articles.map((a) => {
        return (
          <SimpleCard.Content>
            <div class={articleSty()}>
              {a.thumb && (
                <Link href={a.url} class={articleThumb()}>
                  <img src={a.thumb} loading="lazy" />
                </Link>
              )}
              <div class={articleDesc()}>
                <Link href={a.url}>{a.title}</Link>
                <div
                  class={css({
                    textAlign: "right",
                    fontSize: "1.4rem",
                    color: "$textSecondary",
                  })()}
                >
                  {a.source && (
                    <>
                      <Link href={a.source.url} class={uc.uncolor}>
                        {a.source.title}
                      </Link>{" "}
                    </>
                  )}
                  <time dateTime={isodate(a.date)}>{isodate(a.date)}</time>
                </div>
              </div>
            </div>
          </SimpleCard.Content>
        );
      })}
    </SimpleCard>
  );
};

const articleThumb = css({
  lineHeight: 0,
  "& > img": {
    display: "block",
    objectFit: "cover",
    borderRadius: "$defaultRad",
    border: "1px solid $border",
    width: "12rem",
    height: "6rem",
  },
  "@sm": {
    "& > img": {
      width: "18rem",
      height: "9rem",
    },
  },
});

const articleDesc = css({
  display: "flex",
  flexFlow: "column nowrap",
  justifyContent: "space-between",
  gap: "0.5rem",
  lineHeight: 1.5,
});

const articleSty = css({
  display: "flex",
  flexFlow: "row nowrap",
  alignItems: "space-between",
  gap: "1rem",
  [`& > .${articleThumb}`]: {
    flex: "0 0 auto",
  },
  [`& > .${articleDesc}`]: {
    flex: "1 1 auto",
  },
});
