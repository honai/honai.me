import adapter from "@sveltejs/adapter-static"

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".svg"],
  kit: {
    adapter: adapter(),
    target: "#svelte",
    hydrate: false,
  },
}

export default config
