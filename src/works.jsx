import { useEleventy } from "./_includes/EleventyContext";
import { PortfolioLayout } from "./_includes/PortfolioLayout";

export default ({ profile, page }) => {
  const { mdinline } = useEleventy();
  return (
    <PortfolioLayout
      pageUrl={page.url}
      subTitle="Works"
      description="Works by honai"
    >
      <div className="nav-title">
        <h2 className="subtitle">
          <a href="/" className="_uncolor">
            honai.me
          </a>
        </h2>
        <h1 className="title">Works by honai</h1>
      </div>
      {profile.works.map((w) => (
        <div className="simple-card">
          <h2 className="heading">
            <a href={w.url} target="_blank" rel="noopener" className="_reset-a">
              {w.name}
            </a>
          </h2>
          <a href={w.url}>
            {/* FIXME: height */}
            <img
              src={w.thumb}
              alt={w.name}
              height="360"
              className="work-thumb"
            />
          </a>
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: mdinline(w.desc),
            }}
          />
        </div>
      ))}
    </PortfolioLayout>
  );
};
