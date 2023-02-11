import { Script } from "./Script.js";

const ADSENSE_PUB_ID = "ca-pub-9155380222623167";

const ADSENSE_SCRIPT = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`;

export const AdSrc = () => (
  <script defer src={ADSENSE_SCRIPT} crossOrigin="anonymous"></script>
);

export const AdScript = () => (
  <Script>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</Script>
);

export const AdUnitBlogIndex = () => (
  // ブログ記事一覧下
  <ins
    class="adsbygoogle"
    style="display:block"
    data-ad-client={ADSENSE_PUB_ID}
    data-ad-slot="3792188932"
    data-ad-format="auto"
    data-full-width-responsive="true"
  ></ins>
);
