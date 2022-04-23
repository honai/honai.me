import { PortfolioHeader } from "./_includes/components/PortfolioHeader";
import SimpleCard from "./_includes/components/SimpleCard";
import { useEleventy } from "./_includes/EleventyContext";
import { PortfolioLayout } from "./_includes/layouts/PortfolioLayout";
import { css, cx } from "./_includes/style.mjs";
import { SpanSvg } from "./_includes/svg";

export default ({ profile, feeds, page }) => {
  const { isodate } = useEleventy();
  return (
    <PortfolioLayout pageUrl={page.url}>
      <PortfolioHeader title="Hi👋 I'm Honai." showNav />
      <SimpleCard id="about" title="About">
        <SimpleCard.Content>
          <div class="profile-section">
            <SpanSvg filename="asisai" />
            <div class="name">
              <div class="ja">ほない</div>
              <div class="en">Honai Ueoka</div>
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
          <ul class="social-links _reset-ul">
            {profile.links.map((L) => (
              <li class="item">
                <a
                  href={L.url}
                  target="_blank"
                  rel="noopener"
                  class="link _reset-a"
                >
                  <SpanSvg class="icon" filename={L.icon} />
                  <span class="text">{L.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </SimpleCard.Content>
      </SimpleCard>

      <SimpleCard id="education" title="Education">
        {profile.education.map((E) => (
          <SimpleCard.Content>
            <div>
              <div class={css({ color: "$textSecondary" })()}>{E.period}</div>
              <div>{E.title}</div>
            </div>
          </SimpleCard.Content>
        ))}
      </SimpleCard>

      <SimpleCard id="intern" title="Internships / Employments">
        {profile.jobs.map((E) => (
          <SimpleCard.Content>
            <div class="education-item">
              <div class="period">{E.period}</div>
              <div class="desc">{E.title}</div>
            </div>
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

      <SimpleCard id="posts" title="Posts">
        {feeds.map((post) => (
          <SimpleCard.Content>
            <a href={post.link} target="_blank" rel="noopener">
              {post.title}
            </a>
            <div
              class={css({
                textAlign: "right",
                fontSize: "1.4rem",
                color: "$textSecondary",
              })()}
            >
              <time dateTime={isodate(post.pubDate)}>
                {isodate(post.pubDate)}
              </time>{" "}
              &middot;{" "}
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noopener"
                class="_uncolor"
              >
                {post.sourceTitle}
              </a>
            </div>
          </SimpleCard.Content>
        ))}
      </SimpleCard>

      <SimpleCard id="presentations" title="Presentations">
        <SimpleCard.Content>
          <ul class="_reset-ul slide-list">
            {profile.slides.map((s) => (
              <li class="slide-item">
                <a href={s.url} class="link _reset-a">
                  <img
                    src={`/images/slide_thumb/${s.thumb}`}
                    alt={`${s.title}のスライドのサムネイル`}
                    width="640"
                    height="320"
                    class="thumb"
                    loading="lazy"
                  />
                  <div class="texts">
                    <div class="title">{s.title}</div>
                    <div class="subtitle">{s.subtitle}</div>
                    <div class="date">{s.date}</div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </SimpleCard.Content>
      </SimpleCard>

      <SimpleCard id="works" title="Works">
        <SimpleCard.Content>
          <div class="works-gallery">
            {profile.works.slice(0, 2).map((w) => (
              <a href={w.url} title={w.name} class="thumblink">
                <img src={w.thumb} alt={w.name} class="thumb" loading="lazy" />
              </a>
            ))}
          </div>
          <div class="works-page-link">
            <a href="/works">See more works</a>
          </div>
        </SimpleCard.Content>
      </SimpleCard>

      <SimpleCard id="blog" title="Blog">
        <SimpleCard.Content>
          <a href="/blog">Honai's Blog</a>
        </SimpleCard.Content>
      </SimpleCard>
    </PortfolioLayout>
  );
};
