<script context="module">
  import { getContext } from "svelte";

  /**
   * @typedef {Object} EleventyContextVal
   * @prop {(date: string | Date) => string} isodate
   * @prop {(md: string) => string} mdinline
   * @prop {(content: string) => string} toc
   * @prop {(collection: unknown, page: unknown) => any} getPreviousCollectionItem
   * @prop {(collection: unknown, page: unknown) => any} getNextCollectionItem
   * @prop {(scssfile: string) => string} sassinline
   * @prop {(svgfilename: string) => string} svginline
   */

  export const JS_FUNCS_KEY = "jsFuncs";

  /**
   * @returns {EleventyContextVal}
   */
  export const getJsFuncs = () => getContext(JS_FUNCS_KEY);
</script>
