import { PortfolioHero } from "./_includes/components/PortfolioHero.js";
import { PortfolioLayout } from "./_includes/layouts/PortfolioLayout.js";

export default () => {
  const title = "404 Not Found";
  return (
    // TODO: noSeoが消えてた
    // PortfolioLayoutにBaseHtmlを含めなければよい？
    <PortfolioLayout noSeo>
      <PortfolioHero title={title} />
    </PortfolioLayout>
  );
};
