import adapter from "@sveltejs/adapter-static"
import preprocess from "svelte-preprocess"

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".svg"],
  kit: {
    adapter: adapter(),
    hydrate: false,
  },
  preprocess: preprocess(),
}

export default config
