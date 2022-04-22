import { createStitches } from "@stitches/core";

export const { css, getCssText, reset } = createStitches({
  media: {
    lg: "(min-width: 960px)",
  },
});

/** @type {(...classNames: string[]) => string} */
export const cx = (...classNames) => classNames.join(" ");
