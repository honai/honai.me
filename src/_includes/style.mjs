import { createStitches } from "@stitches/core";

const minWidthMedia = (px) => `screen and (min-width: ${px}px)`;

const {
  css,
  getCssText: getCssTextInternal,
  globalCss,
} = createStitches({
  media: {
    sm: minWidthMedia(576),
    md: minWidthMedia(768),
    lg: minWidthMedia(992),
  },
  utils: {
    centuryGothic: (bool) =>
      bool && {
        fontFamily:
          '"Century Gothic", CenturyGothic, century-gothic, sans-serif',
        fontStyle: "normal",
        fontWeight: 400,
        fontDisplay: "swap",
      },
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
