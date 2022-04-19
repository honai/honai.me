import { useEleventy } from "../EleventyContext";

export const SpanSvg = ({ filename, ...other }) => {
  const { svginline } = useEleventy();
  return (
    <span
      {...other}
      dangerouslySetInnerHTML={{ __html: svginline(filename) }}
    />
  );
};
