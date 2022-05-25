import { css } from "../style.mjs";
import { DateTag } from "./DateTag.jsx";

export const TitleDate = ({ title, date }) => {
  return (
    <div
      class={css({
        textAlign: "center",
        padding: "4rem 1rem",
        display: "flex",
        flexFlow: "column nowrap",
        gap: "2rem",
      })()}
    >
      <h1 class={css({ fontSize: "2.4rem", lineHeight: 1.25 })()}>{title}</h1>
      <div class={css({ centuryGothic: true })()}>
        <DateTag date={date} />
      </div>
    </div>
  );
};
