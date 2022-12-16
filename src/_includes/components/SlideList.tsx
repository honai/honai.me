import { css } from "../style.js";
import { DateTag } from "./DateTag.js";

type Slide = Record<"title" | "url" | "thumb" | "subtitle" | "date", string>;

/**
 * @param {object} p
 * @param {Slide[]} p.slides
 */
export const SlideList = ({ slides }: { slides: Slide[] }) => {
  return (
    <div class={listSty()}>
      {slides.map((s) => (
        <article class={itemSty()}>
          <a href={s.url}>
            <img
              src={s.thumb}
              alt={`${s.title}のスライドのサムネイル`}
              class={css({
                display: "block",
                borderRadius: "$defaultRad $defaultRad 0 0",
                width: "100%",
                aspectRatio: "16/9",
                objectFit: "cover",
              })()}
              loading="lazy"
            />
          </a>
          <div
            class={css({
              display: "flex",
              flexFlow: "column nowrap",
              padding: "1rem",
            })()}
          >
            <h3 class={css({ fontSize: "1em" })()}>
              <a href={s.url}>{s.title}</a>
            </h3>
            <div class={slideSubText()}>{s.subtitle}</div>
            <div class={slideSubText()}>
              <DateTag date={s.date} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

const itemSty = css({
  borderRadius: "$defaultRad",
  border: "1px solid $border",
});

const listSty = css({
  display: "grid",
  gap: "2.4rem;",
  "@sm": {
    gridTemplateColumns: "1fr 1fr",
  },
});

const slideSubText = css({ fontSize: "1.4rem", color: "$textSecondary" });
