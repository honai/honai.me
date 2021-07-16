<script>
  import Hero from "$lib/components/Hero.svelte"
  import Seo from "$lib/components/Seo.svelte"
  import Layout from "./_Layout.svelte"
  import Work from "./_Work.svelte"
</script>

<Seo title="Works | honai.me" description="Works of Honai Ueoka" path="/works" />
<Layout>
  <Hero title="Works" />
  <div class="card-layout">
    <Work
      name="COVID-19 World Information Watcher"
      url="https://lotus.kuee.kyoto-u.ac.jp/NLPforCOVID-19/"
      imageUrl="/images/covid-19-watcher.png"
    >
      <ul>
        <li>
          Code (frontend): <a href="https://github.com/NLPforCOVID-19/covid-19-ui">NLPforCOVID-19 / covid-19-ui</a>
        </li>
        <li>
          <a href="https://www.nii.ac.jp/today/89/2.html"
            >「世界中のCOVID-19情報が俯瞰できるサイトを構築」第89号 - NII Today</a
          >
        </li>
        <li><a href="https://www.aclweb.org/anthology/2020.nlpcovid19-2.13/">Paper</a></li>
      </ul>
    </Work>

    <Work name="ExcElm" url="https://excelm.honai.me/" imageUrl="/images/excelm.png">
      <ul>
        <li>Code: <a href="https://github.com/honai/excelm">honai / excelm</a></li>
        <li>
          <a href="https://qiita.com/honai/items/061b024839f1d174436e">ElmでミニExcelを作ろう - Qiita</a>
        </li>
      </ul>
    </Work>

    <Work name="質問箱" url="https://qa.honai.me/" imageUrl="/images/neing.png">
      <ul>
        <li>
          Code: <a href="https://github.com/honai/vscode-shortcuts-wallpaper">honai / vscode-shortcuts-wallpaper</a>
        </li>
        <li>Just reproduced the official keyboard shortcuts reference (PDF) with CSS with darker theme.</li>
      </ul>
    </Work>

    <Work
      name="VSCode Shortcuts Wallpaper"
      url="https://honai.github.io/vscode-shortcuts-wallpaper/"
      imageUrl="/images/vscode-shortcut.png"
    >
      <ul>
        <li>
          Code: <a href="https://github.com/honai/vscode-shortcuts-wallpaper">honai / vscode-shortcuts-wallpaper</a>
        </li>
        <li>Just reproduced the official keyboard shortcuts reference (PDF) with CSS with darker theme.</li>
      </ul>
    </Work>
  </div>
</Layout>

<style>
  .card-layout {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
</style>
