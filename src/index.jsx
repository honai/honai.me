import { Recents } from "./_includes/components/Recents";
import { PortfolioHero } from "./_includes/components/PortfolioHero";
import SimpleCard from "./_includes/components/SimpleCard";
import { SocialLinks } from "./_includes/components/SocialLinks";
import { PortfolioLayout } from "./_includes/layouts/PortfolioLayout";
import { css, cx, uc } from "./_includes/style.mjs";
import { SpanSvg } from "./_includes/svg";

export default ({ profile, page, collections }) => {
  const latestArticles = [
    ...collections.posts.map(postToFeed),
    ...profile.articles.map(articleToFeed),
    ...profile.slides.map(slideToFeed),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);
  return (
    <PortfolioLayout pageUrl={page.url}>
      <PortfolioHero title="Hi👋 I'm Honai." showNav />

      <div
        class={css({
          display: "flex",
          flexFlow: "column nowrap",
          gap: "3rem",
          width: "min(100% - 2rem, 72rem)",
          margin: "0 auto",
        })()}
      >
        <SimpleCard id="about" title="About">
          <SimpleCard.Content>
            <div
              class={css({
                display: "flex",
                alignItems: "center",
                gap: "2.4rem",
              })()}
            >
              <SpanSvg filename="asisai" />
              <div class={css({ textAlign: "center" })()}>
                <div class={css({ fontSize: "2.4rem" })()}>ほない</div>
                <div class={css({ color: "$textSecondary" })()}>
                  Honai Ueoka
                </div>
              </div>
            </div>
          </SimpleCard.Content>
          <SimpleCard.Content>
            <p>
              京都大学大学院 情報学研究科 通信情報システム専攻 /
              修士課程（2023年3月修了予定） /{" "}
              <a href="https://camph.net/" target="_blank" rel="noopener">
                CAMPHOR-
              </a>{" "}
              運営メンバー
            </p>
          </SimpleCard.Content>
          <SimpleCard.Content>
            <SocialLinks links={profile.links} />
          </SimpleCard.Content>
        </SimpleCard>

        <Recents articles={latestArticles} />

        <SimpleCard id="education" title="Education">
          {profile.education.map((E) => (
            <SimpleCard.Content>
              <div class={css({ color: "$textSecondary" })()}>{E.period}</div>
              <div>{E.title}</div>
            </SimpleCard.Content>
          ))}
        </SimpleCard>

        <SimpleCard id="intern" title="Internships / Employments">
          {profile.jobs.map((E) => (
            <SimpleCard.Content>
              <div class={css({ color: "$textSecondary" })()}>{E.period}</div>
              <div>{E.title}</div>
            </SimpleCard.Content>
          ))}
        </SimpleCard>

        <SimpleCard id="publications" title="Publications">
          {profile.publications.map((P) => (
            <SimpleCard.Content>
              {P.authors}
              <br />
              <strong>{P.title}</strong>
              <br />
              {P.journal}
              <br />
              {P.links.map((L) => (
                <>
                  <a href={L.url} target="_blank" rel="noopener">
                    {L.text}
                  </a>
                  &ensp;
                </>
              ))}
            </SimpleCard.Content>
          ))}
        </SimpleCard>

        <SimpleCard id="works" title="Works">
          <SimpleCard.Content>
            <ul
              class={cx(
                uc.resetUl,
                css({
                  padding: "1rem 2rem 2rem",
                  display: "grid",
                  gap: "2rem",
                })()
              )}
            >
              {profile.works.slice(0, 2).map((w, i) => (
                <li>
                  <a href={`/works/#${i}`} title={w.name}>
                    <img src={w.thumb} alt={w.name} loading="lazy" />
                  </a>
                </li>
              ))}
            </ul>
            <div class={css({ textAlign: "center" })()}>
              <a href="/works/">See more works</a>
            </div>
          </SimpleCard.Content>
        </SimpleCard>
      </div>
    </PortfolioLayout>
  );
};

const articleToFeed = (a) => ({
  type: "Article",
  date: new Date(a.date),
  title: a.title,
  url: a.url,
  sub: {
    title: a.source.title,
    url: a.source.url,
  },
});

const postToFeed = (p) => ({
  type: "Article",
  title: p.data.title,
  url: p.url,
  date: p.date,
  thumb: { url: p.data.thumbnail_url, alt: p.data.title },
});

const slideToFeed = (s) => ({
  type: "Slide",
  title: s.title,
  url: s.url,
  date: new Date(s.date),
  thumb: { url: `/images/slide_thumb/${s.thumb}`, alt: s.title },
  sub: {
    title: s.event.title,
    url: s.event.url,
  },
});
