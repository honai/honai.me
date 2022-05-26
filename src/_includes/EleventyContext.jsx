import { createContext } from "preact";
import { useContext } from "preact/hooks";

/**
 * @typedef {Object} EleventyContextVal
 * @prop {{url: string}} page
 * @prop {(date: string | Date) => string} isodate
 * @prop {(md: string) => string} mdinline
 * @prop {(svgFile: string) => string} svginline
 * @prop {(content: string) => string} toc
 * @prop {(collection: unknown, page: unknown) => any} getPreviousCollectionItem
 * @prop {(collection: unknown, page: unknown) => any} getNextCollectionItem
 * @prop {string} SITE_DOMAIN
 */

/** @type {EleventyContextVal} */
// @ts-ignore
const ContextValue = {};
const EleventyContext = createContext(ContextValue);

export const useEleventy = () => useContext(EleventyContext);

export default EleventyContext.Provider;
