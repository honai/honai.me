import { SpanSvg } from "../svg";

export const ThemeToggle = () => {
  return (
    <div class="theme-toggle">
      <SpanSvg class="icon" filename="theme" />{" "}
      <select name="theme" id="theme-selector" class="select">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};
