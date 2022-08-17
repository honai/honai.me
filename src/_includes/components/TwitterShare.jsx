import { useEleventy } from "../EleventyContext";
import { css, cx, uc } from "../style.mjs";
import { SpanSvg } from "../svg";

/**
 * @param {object} p
 * @param {string} p.title
 * @param {string} p.path
 * @param {boolean} [p.noNewIcon]
 * @param {any} p.children
 */
export const TwitterShareLink = ({ path, title, noNewIcon, children }) => {
  const { SITE_DOMAIN } = useEleventy();
  const shareUrl = new URL("https://twitter.com/intent/tweet");
  shareUrl.searchParams.set("url", `https://${SITE_DOMAIN}${path}`);
  shareUrl.searchParams.set("text", title);
  const aClass = noNewIcon ? cx(uc.uncolor, uc.anchorNoNewIcon) : uc.uncolor;
  return (
    <a
      href={shareUrl.href}
      target="_blank"
      class={aClass}
      onClick={`window.open('${shareUrl}', 'honai-me-twitter', 'width=600,height=450'); return false;`}
      title="記事をツイートする"
    >
      {children}
    </a>
  );
};

const WhiteTwitterIcon = () => (
  <SpanSvg class={style()} filename="twitter-white" />
);

const style = css({
  color: "$textSecondary",
  width: "3.2rem",
  height: "3.2rem",
  display: "inline-block",
});

export const TwitterShareIcon = ({ path, title }) => (
  <TwitterShareLink path={path} title={title} noNewIcon>
    <WhiteTwitterIcon />
  </TwitterShareLink>
);
