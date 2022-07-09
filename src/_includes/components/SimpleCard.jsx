import { css, uc } from "../style.mjs";

/**
 * @param {object} p
 * @param {string=} p.id
 * @param {string} p.title
 * @param {string=} p.href defaults to self
 * @param {any} p.children
 */
const SimpleCard = ({ id, title, href, children }) => (
  <section id={id} class={wrap()}>
    <h2 class={heading()}>
      {href || id ? (
        <a href={href || `#${id}`} class={uc.uncolor}>
          {title}
        </a>
      ) : (
        <>{title}</>
      )}
    </h2>
    {children}
  </section>
);

const wrap = css({
  backgroundColor: "$fg",
  color: "$text",
  border: "1px solid $border",
  borderRadius: "$defaultRad",
  "&:target": {
    outline: "2px solid $borderTarget",
    boxShadow: "0 0 3px $shadow",
  },
});

const heading = css({
  fontSize: "2rem",
  lineHeight: 1.5,
  borderBottom: "1px solid $border",
  padding: "1.2rem",
  centuryGothic: true,
});

const CardContent = ({ children }) => <div class={content()}>{children}</div>;

const content = css({
  padding: "1.5rem",
  borderBottom: "1px solid $border",
  "&:last-child": {
    borderBottom: "none",
  },
});

export default Object.assign(SimpleCard, {
  Content: CardContent,
});
