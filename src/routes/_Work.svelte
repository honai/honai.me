<script>
  import SimpleCard from "$lib/components/SimpleCard/index.svelte"
  import Content from "$lib/components/SimpleCard/Content.svelte"

  /** @type {string} */
  export let name
  /** @type {string} */
  export let url
  /** @type {string} */
  export let imageUrl
</script>

<SimpleCard title={name}>
  <a href={url}>
    <img src={imageUrl} alt={`Screenshot of ${name}`} class="work-thumb" />
  </a>
  <Content>
    <slot />
  </Content>
</SimpleCard>

<style>
  .work-thumb {
    width: 100%;
  }
</style>
