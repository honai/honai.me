<script context="module">
  export const hydrate = false
  export const router = false
</script>

<script>
  import Hero from "$lib/components/Hero.svelte"
  import Layout from "./_Layout.svelte"
</script>

<svelte:head>
  <title>404 Not Found</title>
</svelte:head>

<Layout>
  <Hero title="404 Not Found" />
</Layout>
