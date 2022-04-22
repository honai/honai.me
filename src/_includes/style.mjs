import { createStitches } from "@stitches/core";

export const { css, getCssText, reset } = createStitches({
  media: {
    sm: "(min-width: 576px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 992px)",
  },
});

/** @type {(...classNames: string[]) => string} */
export const cx = (...classNames) => classNames.join(" ");
