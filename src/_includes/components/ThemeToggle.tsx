import { css, darkTheme, lightTheme } from "../style.js";
import { SpanSvg } from "../svg/index.js";
import { Script } from "./Script.js";

const STORAGE_KEY = "theme-toggle-scheme";

export const ThemeToggle = () => {
  return (
    <div id="theme-toggle" class={wrap()}>
      <SpanSvg class={svgIcon()} filename="theme" />{" "}
      <select
        id="theme-selector"
        data-storage-key={STORAGE_KEY}
        class={select()}
      >
        <option value="">System</option>
        <option value="light" data-theme-class={lightTheme}>
          Light
        </option>
        <option value="dark" data-theme-class={darkTheme}>
          Dark
        </option>
      </select>
      {/* inline scripts to avoid style flush */}
      <Script>{`
        const stored = localStorage.getItem("${STORAGE_KEY}");
        if (stored === "light") {
          document.body.classList.add("${lightTheme}");
        } else if (stored === "dark") {
          document.body.classList.add("${darkTheme}");
        }
      `}</Script>
    </div>
  );
};

const wrap = css({
  display: "flex",
  gap: "0.5rem",
});

const svgIcon = css({
  "> svg": {
    verticalAlign: "middle",
  },
});

const select = css({
  color: "$text",
  backgroundColor: "$bg",
  border: "1px solid $border",
  borderRadius: "0.5rem",
  opacity: 0.8,
});
