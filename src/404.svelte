<script context="module">
  export const data = {
    permalink: "404.html",
  };
</script>

<script>
  import { getJsFuncs } from "./_includes/SvelteContext.svelte";
  const { sassinline } = getJsFuncs();
  const inlineStyle = `<style>${sassinline(
    "portfolio-critical.scss"
  )}<\/style>`;
</script>

<svelte:head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>404 Not Found</title>
  <link rel="icon" href="/favicon.ico" />
  <link rel="stylesheet" href="https://use.typekit.net/bdo3rru.css" />
  {@html inlineStyle}
</svelte:head>

<div class="body-layout">
  <main class="main-content">
    <div class="nav-title">
      <h2 class="subtitle">
        <a href="/" class="_uncolor"> Honai Ueoka's Portfolio </a>
      </h2>
      <h1 class="title">404 Not Found</h1>
    </div>
  </main>
</div>
