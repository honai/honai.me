<svelte:head>
  <link rel="stylesheet" href="https://use.typekit.net/bdo3rru.css" />
</svelte:head>

<div class="layout">
  <div class="content">
    <slot />
  </div>
</div>

<style>
  :global(:root) {
    --color-primary: #02454a;
    --color-text: #333;
    --color-text-secondary: #666;
    --color-bg: rgba(250, 250, 250);
    --color-fg: #fff;
    --color-border: rgb(219, 219, 219);
    --len-radius: 4px;
    --font-family-century: century-gothic, sans-serif;
    --font-weight-century: 400;
  }
  .layout {
    background-color: var(--color-bg);
    color: var(--color-text);
  }
  .content {
    padding: 1rem;
    max-width: calc(720px + 2rem);
    margin: 0 auto;
  }
</style>
