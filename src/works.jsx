import { useEleventy } from "./_includes/EleventyContext";

export const data = {
  layout: "portfolio-base.njk",
  title: "Works | honai.me",
};

export default ({ profile, _functions }) => {
  const { mdinline } = useEleventy();
  return (
    <>
      <div className="nav-title">
        <h2 className="subtitle">
          <a href="/" className="_uncolor">
            Honai Ueoka's Portfolio
          </a>
        </h2>
        <h1 className="title">Works</h1>
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
    </>
  );
};
