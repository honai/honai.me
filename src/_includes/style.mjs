import { createStitches } from "@stitches/core";

const themeToObjStyle = (theme) => {
  const res = {};
  // TODO: add other than colors
  [theme.colors].forEach((tokens) => {
    Object.keys(tokens).forEach((k) => {
      const token = tokens[k];
      res[token.variable] = token.value;
    });
  });
  return res;
};

const minWidthMedia = (px) => `screen and (min-width: ${px}px)`;

const {
  css,
  getCssText: getCssTextInternal,
  globalCss,
  createTheme,
  theme: defaultTheme,
} = createStitches({
  media: {
    sm: minWidthMedia(576),
    md: minWidthMedia(768),
    lg: minWidthMedia(992),
    dark: "(prefers-color-scheme: dark)",
  },
  theme: {
    colors: {
      primary: "rgb(2, 69, 74)",
      link: "rgb(0, 0, 238)",
      linkVisited: "rgb(85, 26, 139)",
      text: "#333",
      textSecondary: "#666",
      bg: "rgba(250, 250, 250)",
      fg: "#fff",
      border: "rgb(219, 219, 219)",
      // TODO: primaryを再利用
      borderTarget: "rgba(2, 69, 74, 0.5)",
      shadow: "rgba(0, 0, 0, 0.2)",
    },
    radii: {
      defaultRad: "4px",
    },
  },
  utils: {
    centuryGothic: () => ({
      fontFamily: '"Century Gothic", CenturyGothic, century-gothic, sans-serif',
      fontStyle: "normal",
      fontWeight: 400,
    }),
    inheritColor: () => ({ color: "inherit !important" }),
  },
});

const darkTheme = createTheme({
  colors: {
    text: "#eee",
    textSecondary: "#aaa",
    bg: "#000",
    fg: "#111",
    border: "#444",
    link: "rgb(62, 166, 255)",
    linkVisited: "rgb(193, 128, 255)",
    borderTarget: "$primary",
    shadow: "rgba(255, 255, 255, 0.5)",
  },
});

const normalizeStyle = globalCss({
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
  a: {
    color: "$link",
    "&:visited": { color: "$linkVisited" },
  },
});

const colorSchemeStyles = globalCss({
  // @ts-ignore
  "@dark": { ":root": themeToObjStyle(darkTheme) },
});

/** @deprecated */
const helperClasses = globalCss({
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

/** utility classes */
const uc = {
  uncolor: css({ color: "inherit !important" })(),
};

const getCssText = () => {
  normalizeStyle();
  colorSchemeStyles();
  helperClasses();
  return getCssTextInternal();
};

/** @type {(...classNames: string[]) => string} */
const cx = (...classNames) => classNames.join(" ");

export { css, getCssText, cx, uc };
