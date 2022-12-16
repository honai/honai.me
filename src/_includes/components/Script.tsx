import type { JSX } from "preact";

interface Props extends JSX.HTMLAttributes<HTMLScriptElement> {
  children: string;
}

export const Script = ({ children, ...attrs }: Props) => (
  <script {...attrs} dangerouslySetInnerHTML={{ __html: children.trim() }} />
);
