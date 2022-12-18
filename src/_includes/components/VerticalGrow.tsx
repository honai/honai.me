import { ChildrenOnly } from "../../types.js";
import { css } from "../style.js";

export const Grow: ChildrenOnly = ({ children }) => (
  <div class={grow()}>{children}</div>
);

const VerticalGrow: ChildrenOnly = ({ children }) => (
  <div class={wrap()}>{children}</div>
);

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
