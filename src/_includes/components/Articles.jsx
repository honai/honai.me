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
            {/* <img src={a.thumb} loading="lazy" /> */}
            <Link href={a.url}>{a.title}</Link>
            <div
              class={css({
                textAlign: "right",
                fontSize: "1.4rem",
                color: "$textSecondary",
              })()}
            >
              <time dateTime={isodate(a.date)}>{isodate(a.date)}</time>
              {a.source && (
                <>
                  {" "}
                  &middot;{" "}
                  <Link href={a.source.url} class={uc.uncolor}>
                    {a.source.title}
                  </Link>
                </>
              )}
            </div>
          </SimpleCard.Content>
        );
      })}
    </SimpleCard>
  );
};
