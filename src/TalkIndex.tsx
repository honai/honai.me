import { Talk } from "./talks/talks.js";
import { PortfolioHero } from "./_includes/components/PortfolioHero.js";
import { SlideList } from "./_includes/components/SlideList.js";
import { PortfolioLayout } from "./_includes/layouts/PortfolioLayout.js";
import { css } from "./_includes/style.js";

export default ({ talks }: { talks: Talk[] }) => {
  const sortedTalks = talks
    .map((t) => ({
      title: t.title,
      url: `/talks/${t.slug}/`,
      date: t.date,
      thumb: t.thumbnail,
      subtitle: "",
    }))
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
  return (
    <PortfolioLayout subTitle="Talks" description="Talks by Honai.">
      <PortfolioHero title="Talks" />
      <div
        class={css({
          width: "min(100% - 2rem, 72rem)",
          margin: "0 auto",
        })()}
      >
        <SlideList slides={sortedTalks} />
      </div>
    </PortfolioLayout>
  );
};
