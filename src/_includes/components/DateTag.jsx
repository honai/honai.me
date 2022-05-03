import { useEleventy } from "../EleventyContext";

export const DateTag = ({ date, ...other }) => {
  const { isodate } = useEleventy();
  return (
    <time dateTime={isodate(date)} {...other}>
      {isodate(date)}
    </time>
  );
};
