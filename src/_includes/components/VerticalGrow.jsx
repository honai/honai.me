import { css } from "../style.mjs";

export const Grow = ({ children }) => <div class={grow()}>{children}</div>;

const VerticalGrow = ({ children }) => <div class={wrap()}>{children}</div>;

const grow = css();

const wrap = css({
  display: "flex",
  flexFlow: "column nowrap",
  minHeight: "100vh",
  [`> .${grow}`]: {
    flex: "1 0 auto",
  },
});

export default Object.assign(VerticalGrow, { Grow });
