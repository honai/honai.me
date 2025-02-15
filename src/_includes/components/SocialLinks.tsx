import { css, cx, uc } from "../style.js";
import { SpanSvg } from "../svg/index.js";

interface Props {
  links: { url: string; text: string; icon: string }[];
}
export const SocialLinks = ({ links }: Props) => (
  <ul class={cx(uc.resetUl, list())}>
    {links.map(({ url, icon, text }) => (
      <li class={iconTextFlex()}>
        <a
          href={url}
          title={text}
          target="_blank"
          rel="noopener"
          class={css({
            ...iconSize,
            "&::after": { display: "none !important" },
          })()}
        >
          <SpanSvg class={spanSvgSty()} filename={icon} />
        </a>
        <a href={url} target="_blank" rel="noopener" class={link()}>
          <span class="text">{text}</span>
        </a>
      </li>
    ))}
  </ul>
);

const list = css({
  padding: "0 1rem",
  display: "flex",
  flexFlow: "column nowrap",
  gap: "1.5rem",
});

const link = css({
  centuryGothic: true,
  color: "$textSecondary",
  "&:visited": {
    color: "unset",
  },
});

const iconTextFlex = css({
  display: "flex",
  flexFlow: "row nowrap",
  alignItems: "center",
  gap: "1rem",
});

const iconSize = {
  "$$svg-size": "2.4rem",
  width: "$$svg-size",
  height: "$$svg-size",
};

const spanSvgSty = css({
  "&, & > svg": iconSize,
});
