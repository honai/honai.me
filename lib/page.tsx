import { JSX } from "preact";
import { renderToString } from "preact-render-to-string";
import EleventyContext, {
  ContextInitialValue,
} from "../src/_includes/EleventyContext.js";

type FC = () => JSX.Element;

export const wrapPage = (canonicalPath: string, Component: FC) => {
  return (
    "<!DOCTYPE html>" +
    renderToString(
      <EleventyContext
        value={{ ...ContextInitialValue, page: { url: canonicalPath } }}
      >
        <Component />
      </EleventyContext>
    )
  );
};
