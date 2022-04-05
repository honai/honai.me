export const Script = ({ children, ...attrs }) => (
  <script {...attrs} dangerouslySetInnerHTML={{ __html: children }} />
);
