import { createContext } from "preact";
import { useContext } from "preact/hooks";

/** @type {any} */
const ContextValue = {};
const EleventyContext = createContext(ContextValue);

export const useEleventy = () => useContext(EleventyContext);

export default EleventyContext.Provider;
