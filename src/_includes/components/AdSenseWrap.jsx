import { css } from "../style.mjs";

export const AdSenseWrap = ({ children }) => (
  <div class={style()}>{children}</div>
);

const style = css({ margin: "5rem 1rem 1rem", backgroundColor: "#eee" });
