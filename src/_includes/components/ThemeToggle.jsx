import { css } from "../style.mjs";
import { SpanSvg } from "../svg";

export const ThemeToggle = () => {
  return (
    <div id="theme-toggle" class="theme-toggle">
      <SpanSvg class={svgIcon()} filename="theme" />{" "}
      <select name="theme" id="theme-selector" class={select()}>
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};

const svgIcon = css({
  "> svg": {
    verticalAlign: "middle",
  },
});

const select = css({
  color: "var(--color-text)",
  backgroundColor: "var(--color-fg)",
  border: "1px solid var(--color-border)",
  borderRadius: "0.5rem",
  padding: "0.5rem 0",
});
