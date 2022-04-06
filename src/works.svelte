<script>
  import { getJsFuncs } from "./_includes/SvelteContext.svelte";
  import PortfolioLayout from "./_includes/PortfolioLayout.svelte";

  export let profile;
  export let page;

  const { mdinline } = getJsFuncs();
</script>

<PortfolioLayout
  pageUrl={page.url}
  subTitle="Works"
  description="Works by Honai"
>
  <div class="nav-title">
    <h2 class="subtitle">
      <a href="/" class="_uncolor"> honai.me </a>
    </h2>
    <h1 class="title">Works by Honai</h1>
  </div>
  {#each profile.works as w}
    <div class="simple-card">
      <h2 class="heading">
        <a href={w.url} target="_blank" rel="noopener" class="_reset-a">
          {w.name}
        </a>
      </h2>
      <a href={w.url}>
        <!-- FIXME: height  -->
        <img src={w.thumb} alt={w.name} height="360" class="work-thumb" />
      </a>
      <div class="content">{@html mdinline(w.desc)}</div>
    </div>
  {/each}
</PortfolioLayout>
