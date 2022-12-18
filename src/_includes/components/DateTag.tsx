import { HTMLAttributes } from "../../types.js";
import { useEleventy } from "../EleventyContext.js";

export const DateTag = ({
  date,
  ...other
}: { date: Date | string } & HTMLAttributes<HTMLTimeElement>) => {
  const { isodate } = useEleventy();
  return (
    <time dateTime={isodate(date)} {...other}>
      {isodate(date)}
    </time>
  );
};
