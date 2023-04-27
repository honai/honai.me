import { PortfolioHero } from "./_includes/components/PortfolioHero.js";
import { PortfolioLayout } from "./_includes/layouts/PortfolioLayout.js";
import { css } from "./_includes/style.js";

export default () => {
  const title = "404 Not Found";
  return (
    // TODO: noSeoが消えてた
    // PortfolioLayoutにBaseHtmlを含めなければよい？
    <PortfolioLayout noSeo>
      <PortfolioHero title={title} />
      <div
        class={css({
          width: "min(100% - 2rem, 72rem)",
          margin: "0 auto",
        })()}
      >
        <iframe
          style="border-radius:12px"
          src="https://open.spotify.com/embed/track/2sTOL1uzMEkB5iFNXe6ehJ?utm_source=generator&theme=0"
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </PortfolioLayout>
  );
};
