<script>
  export let title
</script>

<div class="nav-title">
  {#if title}
    <h2 class="subtitle">
      <a href="/" class="_uncolor">Honai Ueoka's Portfolio</a>
    </h2>
    <h1 class="title">{title}</h1>
  {:else}
    <h1 class="title">Honai Ueoka's Portfolio</h1>
    <nav class="nav">
      <a href="/works">Works</a>
      <a href="/blog/">Blog</a>
    </nav>
  {/if}
</div>

<style lang="scss">
  .nav-title {
    padding: 1rem 0 3rem;
    font-family: var(--font-family-century);
    font-weight: var(--font-weight-century);
    > .subtitle {
      font-size: 1.8rem;
      text-align: center;
    }
    > .title {
      padding: 2rem 0;
      text-align: center;
    }
    > .nav {
      font-size: 1.8rem;
      display: flex;
      width: 120px;
      margin: 0 auto;
      justify-content: space-between;
      > a {
        color: unset;
      }
    }
  }
</style>
