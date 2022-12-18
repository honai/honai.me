import { Feed, Recents } from "./_includes/components/Recents.js";
import { PortfolioHero } from "./_includes/components/PortfolioHero.js";
import SimpleCard from "./_includes/components/SimpleCard.js";
import { SocialLinks } from "./_includes/components/SocialLinks.js";
import { PortfolioLayout } from "./_includes/layouts/PortfolioLayout.js";
import { css, cx, uc } from "./_includes/style.js";
import { SpanSvg } from "./_includes/svg/index.js";
import { Talk } from "./talks/talks.js";
import { Post } from "./blog/post/posts.js";
import { Profile } from "./_data/profile.js";

interface Props {
  profile: Profile;
  posts: Post[];
  talks: Talk[];
}

export default ({ profile, posts, talks }: Props) => {
  const latestArticles = [
    ...posts.map(postToFeed),
    ...talks.map(talkToFeed),
    ...profile.articles.map(articleToFeed),
  ]
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
    .slice(0, 5);
  return (
    <PortfolioLayout>
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

const articleToFeed = (a: Omit<Feed, "type">): Feed => ({
  type: "Article",
  date: new Date(a.date),
  title: a.title,
  url: a.url,
});

const postToFeed = (p: Post): Feed => ({
  type: "Article",
  title: p.title,
  url: `/blog/post/${p.slug}/`,
  date: p.date,
  thumb: p.thumbnail_url ? { url: p.thumbnail_url, alt: p.title } : undefined,
});

const talkToFeed = (t: Talk): Feed => ({
  type: "Talk",
  title: t.title,
  url: `/talks/${t.slug}/`,
  date: t.date,
  thumb: { url: t.thumbnail, alt: t.title },
});
