<script>
  import Header from "./_Header.svelte"
  import Footer from "./_Footer.svelte"
</script>

<div class="wrap">
  <Header />
  <div class="grow">
    <slot />
  </div>
  <Footer />
</div>

<style>
  .wrap {
    display: flex;
    flex-flow: column nowrap;
    min-height: 100vh;
  }
  .grow {
    flex: 1 0 auto;
  }
</style>
