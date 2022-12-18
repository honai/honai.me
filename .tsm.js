// @ts-check

// Default config file is `tsm.js`.
// It conflicts with bin `tsm` with pnpm scripts

/** @type {import("tsm/config").ConfigFile} */
export default {
  ".tsx": {
    jsxImportSource: "preact",
    jsx: "automatic",
    loader: "tsx",
  },
  // ".svg": {
  //   loader: "text",
  // },
};
