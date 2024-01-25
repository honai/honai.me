import { Profile } from "./_data/profile.js";
import { PortfolioHero } from "./_includes/components/PortfolioHero.js";
import SimpleCard from "./_includes/components/SimpleCard.js";
import { PortfolioLayout } from "./_includes/layouts/PortfolioLayout.js";
import { css } from "./_includes/style.js";
import { render } from "../lib/md.js";

export default ({ profile }: { profile: Profile }) => {
  return (
    <PortfolioLayout subTitle="Works" description="Works by Honai">
      <PortfolioHero title="Works" />
      <div
        class={css({
          margin: "0 auto",
          width: "min(100% - 2rem, 72rem)",
          display: "flex",
          flexFlow: "column nowrap",
          gap: "3rem",
        })()}
      >
        {profile.works.map((w, i) => (
          <SimpleCard id={i.toString()} title={w.name} href={w.url}>
            <a href={w.url}>
              {/* FIXME: height */}
              <img
                src={w.thumb}
                alt={w.name}
                height="360"
                loading="lazy"
                className={css({ width: "100%", height: "auto" })()}
              />
            </a>
            <SimpleCard.Content>
              <div
                dangerouslySetInnerHTML={{
                  __html: render(w.desc),
                }}
              />
            </SimpleCard.Content>
          </SimpleCard>
        ))}
      </div>
    </PortfolioLayout>
  );
};
