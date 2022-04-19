import { createContext } from "preact";
import { useContext } from "preact/hooks";

/**
 * @typedef {Object} EleventyContextVal
 * @prop {(date: string | Date) => string} isodate
 * @prop {(md: string) => string} mdinline
 * @prop {(scssFile: string) => string} sassinline
 * @prop {(content: string) => string} toc
 * @prop {(collection: unknown, page: unknown) => any} getPreviousCollectionItem
 * @prop {(collection: unknown, page: unknown) => any} getNextCollectionItem
 */

/** @type {EleventyContextVal} */
// @ts-ignore
const ContextValue = {};
const EleventyContext = createContext(ContextValue);

export const useEleventy = () => useContext(EleventyContext);

export default EleventyContext.Provider;
