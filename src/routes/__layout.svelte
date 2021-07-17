<svelte:head>
  <link rel="stylesheet" href="https://use.typekit.net/bdo3rru.css" />
</svelte:head>

<div class="layout">
  <slot />
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
    min-height: 100vh;
    background-color: var(--color-bg);
    color: var(--color-text);
  }
</style>
