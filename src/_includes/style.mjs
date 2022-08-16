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
  theme: lightTheme,
  keyframes,
} = createStitches({
  media: {
    smOnly: `screen and (max-width: 576px)`,
    sm: minWidthMedia(576),
    md: minWidthMedia(768),
    lg: minWidthMedia(992),
    dark: "(prefers-color-scheme: dark)",
    reduceMotion: "(prefers-reduced-motion)",
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
      bgGray: "#eee",
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
    centuryGothic: (_) => ({
      fontFamily: '"Century Gothic", CenturyGothic, century-gothic, sans-serif',
      fontStyle: "normal",
      fontWeight: 400,
    }),
  },
});

const darkTheme = createTheme({
  colors: {
    text: "#ccc",
    textSecondary: "#aaa",
    bg: "#000",
    fg: "#111",
    bgGray: "#2d2d2d",
    border: "#444",
    link: "rgb(62, 166, 255)",
    linkVisited: "rgb(193, 128, 255)",
    borderTarget: "$primary",
    shadow: "rgba(255, 255, 255, 0.5)",
  },
});

/** @param {"start" | "end"} d */
const openInNewPseudo = (d) => ({
  [d === "start" ? `&::before` : `&::after`]: {
    $$image: "url('/images/open_in_new.svg')",
    content: "",
    maskImage: "$$image",
    backgroundColor: "currentColor",
    display: "inline-block",
    opacity: 0.75,
    width: "0.9em",
    height: "0.9em",
    verticalAlign: "middle",
    marginInline: d === "start" ? "0 0.2em" : "0.2em 0",
  },
});

const newIconStartClass = "newiconstart";

const normalizeStyle = globalCss({
  "*, *::before, *::after": {
    boxSizing: "border-box",
  },
  html: {
    // 1rem = 10px
    fontSize: "62.5%",
    fontFamily: "sans-serif",
    scrollBehavior: "smooth",
    "@reduceMotion": {
      scrollBehavior: "auto",
    },
  },
  body: {
    fontSize: "1.6rem",
    margin: "0",
    lineHeight: 1.75,
    backgroundColor: "$bg",
    color: "$text",
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
    [`&[target]:not(.${newIconStartClass})`]: openInNewPseudo("end"),
    [`&[target].${newIconStartClass}`]: openInNewPseudo("start"),
  },
});

const colorSchemeStyles = globalCss({
  // @ts-ignore
  "@dark": { ":root": themeToObjStyle(darkTheme) },
});

const customScrollbarStyles = globalCss({
  ".scrollbar-thin": {
    // firefox
    scrollbarWidth: "thin",
    // webkit
    "&::-webkit-scrollbar": {
      height: "0.6rem",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      borderRadius: "0.3rem",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.4)",
      },
      "&:active": {
        backgroundColor: "rgba(255, 255, 255, 0.25)",
      },
    },
  },
});

/** utility classes */
const uc = {
  uncolor: css({ color: "inherit !important" })(),
  resetUl: css({
    paddingLeft: "0",
    listStyle: "none",
  })(),
  emojiFont: css({
    "-webkit-locale": "'en'",
    fontFamily:
      "apple color emoji,segoe ui emoji,noto color emoji,android emoji,segoe ui symbol",
  })(),
  anchorNewIconStart: newIconStartClass,
};

const getCssText = () => {
  normalizeStyle();
  colorSchemeStyles();
  customScrollbarStyles();
  return getCssTextInternal();
};

/** @type {(...classNames: string[]) => string} */
const cx = (...classNames) => classNames.join(" ");

export { css, getCssText, keyframes, cx, uc, darkTheme, lightTheme };
