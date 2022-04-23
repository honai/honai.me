import { css, cx, uc } from "../style.mjs";
import { SpanSvg } from "../svg";

/**
 * @param {object} p
 * @param {{url: string; text: string; icon: string}[]} p.links
 */
export const SocialLinks = ({ links }) => (
  <ul class={cx("_reset-ul", list())}>
    {links.map(({ url, icon, text }) => (
      <li>
        <a
          href={url}
          target="_blank"
          rel="noopener"
          class={cx(link(), uc.uncolor)}
        >
          <SpanSvg class={iconSty()} filename={icon} />
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
  display: "flex",
  flexFlow: "row nowrap",
  alignItems: "center",
  gap: "1rem",
  centuryGothic: true,
  color: "$textSecondary",
});

const iconSty = css({
  "$$svg-size": "2.4rem",
  "&, &>svg": {
    width: "$$svg-size",
    height: "$$svg-size",
  },
});
