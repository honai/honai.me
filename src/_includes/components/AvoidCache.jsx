/** @param {import("preact/src/jsx").JSXInternal.HTMLAttributes<HTMLLinkElement>} p */
export const Link = ({ href, ...attrs }) => (
  <link {...attrs} href={withDateQuery(href)} />
);

/** @param {import("preact/src/jsx").JSXInternal.HTMLAttributes<HTMLScriptElement>} p */
export const Script = ({ src, ...attrs }) => (
  <script {...attrs} src={withDateQuery(src)}></script>
);

const withDateQuery = (s) => `${s}?${new Date().getTime()}`;
