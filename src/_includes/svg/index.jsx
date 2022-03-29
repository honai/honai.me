import { useEleventy } from "../EleventyContext";

export const SpanSvg = ({ filename, ...other }) => {
  const { svginline } = useEleventy();
  return (
    <span
      class={other.class}
      dangerouslySetInnerHTML={{ __html: svginline(filename) }}
    />
  );
};
