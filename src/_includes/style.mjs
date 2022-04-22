import { createStitches } from "@stitches/core";

const {
  css,
  getCssText: getCssTextInternal,
  globalCss,
} = createStitches({
  media: {
    sm: "(min-width: 576px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 992px)",
  },
});

/** @type {(...classNames: string[]) => string} */
const cx = (...classNames) => classNames.join(" ");

const globalStyle = globalCss({
  "*, *::before, *::after": {
    boxSizing: "border-box",
  },
  html: {
    // 1rem = 10px
    fontSize: "62.5%",
    fontFamily: "sans-serif",
  },
  body: {
    fontSize: "1.6rem",
    margin: "0",
    lineHeight: 1.75,
  },
  "h1, h2, h3, h4, h5, h6": {
    margin: "0",
    fontWeight: "unset",
  },
  main: {
    display: "block",
  },
  "p, ul, ol": {
    margin: "0",
  },
  ul: {
    lineHeight: 2,
  },
  img: {
    maxWidth: "100%",
  },
  "._rounded": {
    borderRadius: "50%",
  },
  "._uncolor": {
    color: "inherit !important",
  },
  "._reset-ul": {
    paddingLeft: "0",
    listStyle: "none",
  },
  "._reset-a": {
    color: "inherit !important",
    textDecorationLine: "inherit !important",
  },
});

const getCssText = () => {
  globalStyle();
  return getCssTextInternal();
};

export { css, getCssText, cx };
