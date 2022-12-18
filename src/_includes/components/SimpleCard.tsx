import { Children, ChildrenOnly } from "../../types.js";
import { css, uc } from "../style.js";

interface Props {
  id?: string;
  title: string;
  /** defaults to self */
  href?: string;
  children: Children;
}

const SimpleCard = ({ id, title, href, children }: Props) => (
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

const CardContent: ChildrenOnly = ({ children }) => (
  <div class={content()}>{children}</div>
);

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
