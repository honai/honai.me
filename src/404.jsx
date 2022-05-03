import { PortfolioHero } from "./_includes/components/PortfolioHero";
import { PortfolioLayout } from "./_includes/layouts/PortfolioLayout";

export const data = {
  permalink: "404.html",
};

export default () => {
  const title = "404 Not Found";
  return (
    // @ts-ignore
    <PortfolioLayout noSeo>
      <PortfolioHero title={title} />
    </PortfolioLayout>
  );
};
