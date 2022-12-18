import { css } from "../style.js";
import { DateTag } from "./DateTag.js";

export const TitleDate = ({
  title,
  date,
}: {
  title: string;
  date: Date | string;
}) => {
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
