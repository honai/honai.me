import { JSX } from "preact";

import { useEleventy } from "../EleventyContext.js";

interface Props extends JSX.HTMLAttributes<HTMLSpanElement> {
  filename: string;
}

export const SpanSvg = ({ filename, ...other }: Props) => {
  const { svginline } = useEleventy();
  return (
    <span
      {...other}
      dangerouslySetInnerHTML={{ __html: svginline(filename) }}
    />
  );
};
