<script>
  import Seo from "$lib/components/Seo.svelte"
  import SimpleCard from "$lib/components/SimpleCard/index.svelte"
  import SimpleCardContent from "$lib/components/SimpleCard/Content.svelte"
  import profile from "$lib/profile"
  import Hero from "$lib/components/Hero.svelte"
  import Layout from "./_Layout.svelte"
</script>

<Seo title="Honai Ueoka" description="Honai Ueoka's portfolio website." />

<Layout>
  <Hero />

  <div class="card-layout">
    <SimpleCard title="About" id="about">
      <SimpleCardContent>
        <div class="profile-section">
          <img src="/images/me.jpg" alt="honaiの写真" width="72" height="72" class="icon" />
          <div class="name">
            <div class="ja">上岡 輔乃</div>
            <div class="en">Honai Ueoka</div>
          </div>
        </div>
      </SimpleCardContent>
      <SimpleCardContent>
        <p>京都大学大学院 情報学研究科 通信情報システム専攻 / 修士課程（2023年3月修了予定） / CAMPHOR- 運営メンバー</p>
      </SimpleCardContent>
      <SimpleCardContent>
        <ul class="social-links _reset-ul">
          {#each profile.links as L}
            <li class="item">
              <a href={L.url} class="link _reset-a">
                <L.Icon />
                <span class="text">{L.text}</span>
              </a>
            </li>
          {/each}
        </ul>
      </SimpleCardContent>
    </SimpleCard>

    <SimpleCard id="education" title="Education">
      {#each profile.education as E}
        <SimpleCardContent>
          <div class="content">
            <div class="education-item">
              <div class="period">{E.period}</div>
              <div class="desc">{E.title}</div>
            </div>
          </div>
        </SimpleCardContent>
      {/each}
    </SimpleCard>

    <SimpleCard id="jobs" title="Internships / Employments">
      {#each profile.jobs as E}
        <SimpleCardContent>
          <div class="content">
            <div class="education-item">
              <div class="period">{E.period}</div>
              <div class="desc">{E.title}</div>
            </div>
          </div>
        </SimpleCardContent>
      {/each}
    </SimpleCard>

    <SimpleCard id="publications" title="Publications">
      {#each profile.publications as P}
        <SimpleCardContent>
          <div class="content">
            {P.authors}
            <br />
            <strong>{P.title}</strong>
            <br />
            {P.journal}
            <br />
            {#each P.links as L}
              <a href={L.url}>{L.text}</a>&ensp;
            {/each}
          </div>
        </SimpleCardContent>
      {/each}
    </SimpleCard>

    <SimpleCard id="presentations" title="Presentations">
      <SimpleCardContent>
        <ul class="_reset-ul slide-list">
          {#each profile.presentations as s}
            <li class="slide-item">
              <a href={s.url} class="link _reset-a">
                <img
                  src="/images/slide_thumb/{s.thumb}"
                  alt="{s.title}のスライドのサムネイル"
                  width="640"
                  height="320"
                  class="thumb"
                  loading="lazy"
                />
                <div class="texts">
                  <div class="title">{s.title}</div>
                  <div class="subtitle">{s.subtitle}</div>
                  <div class="date">{s.date}</div>
                </div>
              </a>
            </li>
          {/each}
        </ul>
      </SimpleCardContent>
    </SimpleCard>

    <SimpleCard id="works" title="Works">
      <SimpleCardContent>
        <div class="works-gallery">
          <a href="https://lotus.kuee.kyoto-u.ac.jp/NLPforCOVID-19/" class="thumblink">
            <img
              src="/images/covid-19-watcher.png"
              alt="COVID-19 World Information Watcher"
              class="thumb"
              loading="lazy"
            />
          </a>
          <a href="https://excelm.honai.me/" class="thumblink">
            <img src="/images/excelm.png" alt="ExcElm" class="thumb" loading="lazy" />
          </a>
        </div>
      </SimpleCardContent>
    </SimpleCard>

    <SimpleCard id="blog" title="Blog">
      <SimpleCardContent>
        <a href="/blog">Honai's Blog</a>
      </SimpleCardContent>
    </SimpleCard>
  </div>
</Layout>

<style lang="scss">
  @use 'src/variables' as v;

  .card-layout {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .profile-section {
    display: flex;
    align-items: center;
    > .icon {
      width: 7.2rem;
      height: 7.2rem;
      border-radius: 50%;
    }
    > .name {
      margin-left: 2.4rem;
      text-align: center;
    }
    > .name > .ja {
      font-size: 2.4rem;
    }
    > .name > .en {
      color: var(--color-text-secondary);
    }
  }

  .social-links {
    padding: 0 1rem;
    > .item {
      margin-bottom: 1.5rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
    > .item > .link {
      display: flex;
      align-items: center;
      > :global(svg) {
        width: 2.4rem;
        height: 2.4rem;
        margin-right: 1rem;
      }
      > .text {
        color: var(--color-text-secondary);
        font-family: var(--font-family-century);
      }
    }
  }

  .education-item {
    > .period {
      color: var(--color-text-secondary);
    }
  }

  .slide-list {
    @media screen and (min-width: v.$break-sm) {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      > .slide-item {
        flex: 0 0 49%;
      }
    }
    > .slide-item {
      margin-bottom: 1.5rem;
    }
  }

  .slide-item {
    border-radius: var(--len-radius);
    border: 1px solid var(--color-border);
  }

  .slide-item > .link {
    display: flex;
    flex-flow: column nowrap;
    > .thumb {
      border-radius: var(--len-radius) var(--len-radius) 0 0;
      width: 100%;
      height: auto;
    }
    > .texts {
      padding: 1rem;
    }
    > .texts > .title {
      padding: 0.5rem 0;
    }
    > .texts > .subtitle,
    > .texts > .date {
      font-size: 1.4rem;
      color: var(--color-text-secondary);
    }
  }

  .works-gallery {
    padding: 0 2rem;
    display: flex;
    flex-flow: column nowrap;
    > .thumblink {
      margin: 0.4rem 0;
    }
  }
</style>
