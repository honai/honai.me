<script>
  export let href
  export let integrity
  export let async = false
</script>

<svelte:head>
  {#if async}
    <link
      rel="stylesheet"
      {href}
      {integrity}
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
      media="print"
      onload="this.media='all'"
    />
    <noscript>
      <link rel="stylesheet" {href} {integrity} crossorigin="anonymous" referrerpolicy="no-referrer" />
    </noscript>
  {:else}
    <link rel="stylesheet" {href} {integrity} crossorigin="anonymous" referrerpolicy="no-referrer" />
  {/if}
</svelte:head>
