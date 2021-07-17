import adapter from "@sveltejs/adapter-static"
import preprocess from "svelte-preprocess"

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".svg"],
  kit: {
    adapter: adapter(),
    prerender: { pages: ["*", "/blog/rss.xml"] },
    target: "#svelte",
  },
  preprocess: preprocess(),
}

export default config
