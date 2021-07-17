<script>
  export let title = ""
  export let id = ""
</script>

<section {id}>
  <h2><a href={`#${id}`}>{title}</a></h2>
  <slot />
</section>

<style>
  section {
    background-color: var(--color-fg);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: var(--len-radius);
  }
  h2 {
    margin: 0;
    font-weight: var(--font-weight-century);
    font-family: var(--font-family-century);
    font-size: 2rem;
    border-bottom: 1px solid var(--color-border);
    padding: 1.2rem;
  }
  h2 > a {
    color: unset;
    text-decoration: none;
  }
</style>
