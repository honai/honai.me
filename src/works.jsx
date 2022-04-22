import SimpleCard from "./_includes/components/SimpleCard";
import { useEleventy } from "./_includes/EleventyContext";
import { PortfolioLayout } from "./_includes/layouts/PortfolioLayout";
import { css } from "./_includes/style.mjs";

export default ({ profile, page }) => {
  const { mdinline } = useEleventy();
  return (
    <PortfolioLayout
      pageUrl={page.url}
      subTitle="Works"
      description="Works by Honai"
    >
      <div className="nav-title">
        <h1 className="title">Works by Honai</h1>
      </div>
      {profile.works.map((w) => (
        <SimpleCard title={w.name} href={w.url}>
          <a href={w.url}>
            {/* FIXME: height */}
            <img
              src={w.thumb}
              alt={w.name}
              height="360"
              className={css({ width: "100%", height: "auto" })()}
            />
          </a>
          <SimpleCard.Content>
            <div
              dangerouslySetInnerHTML={{
                __html: mdinline(w.desc),
              }}
            />
          </SimpleCard.Content>
        </SimpleCard>
      ))}
    </PortfolioLayout>
  );
};
