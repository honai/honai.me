import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createContext } from "preact";
import { useContext } from "preact/hooks";

interface EleventyContextVal {
  page: { url: string };
  isodate: (date: string | Date) => string;
  svginline: (svgBasename: string) => string;
  // toc: (content: string) => string;
  SITE_DOMAIN: string;
}

/**
 * @typedef {Object} EleventyContextVal
 * @prop {{url: string}} page
 * @prop {any} eleventy
 * @prop {(date: string | Date) => string} isodate
 * @prop {(md: string) => string} mdinline
 * @prop {(svgFile: string) => string} svginline
 * @prop {(content: string) => string} toc
 * @prop {(collection: unknown, page: unknown) => any} getPreviousCollectionItem
 * @prop {(collection: unknown, page: unknown) => any} getNextCollectionItem
 * @prop {string} SITE_DOMAIN
 */

export const ContextInitialValue: EleventyContextVal = {
  page: { url: "/initial" },
  isodate: (date) => {
    if (typeof date === "string") {
      return new Date(date).toISOString().slice(0, 10);
    }
    return date.toISOString().slice(0, 10);
  },
  SITE_DOMAIN: "www.honai.me",
  svginline: (svgBasename) => {
    return fs.readFileSync(path.join(dirname, `svg/${svgBasename}.svg`), {
      encoding: "utf-8",
    });
  },
};
const EleventyContext = createContext<EleventyContextVal>(ContextInitialValue);

export const useEleventy = () => useContext(EleventyContext);

export default EleventyContext.Provider;

const dirname = fileURLToPath(path.dirname(import.meta.url));
