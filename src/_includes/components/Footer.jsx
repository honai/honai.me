import { css } from "../style.mjs";

export const Footer = () => (
  <footer class={style()}>
    &copy; 2021 Honai Ueoka
    <br />
    <a href="/" class="_uncolor">
      Portfolio
    </a>
    &ensp;
    <a href="/works/" class="_uncolor">
      Works
    </a>
    &ensp;
    <a href="/blog/" class="_uncolor">
      Blog
    </a>
  </footer>
);

const style = css({
  backgroundColor: "#444",
  color: "#ccc",
  textAlign: "center",
  padding: "2rem",
});
