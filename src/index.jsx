import { useEleventy } from "./_includes/EleventyContext";
import { PortfolioLayout } from "./_includes/PortfolioLayout";
import { SpanSvg } from "./_includes/svg";

export default ({ profile, feeds, page }) => {
  const { isodate } = useEleventy();
  return (
    <PortfolioLayout pageUrl={page.url}>
      <div class="nav-title">
        <h1 class="title">Hi👋 I'm Honai.</h1>
        <nav class="nav">
          <a href="/works">Works</a>
          <a href="/blog/">Blog</a>
        </nav>
      </div>

      <section class="simple-card">
        <h2 class="heading" id="about">
          <a href="#about" class="anchor">
            About
          </a>
        </h2>
        <div class="content">
          <div class="profile-section">
            <SpanSvg filename="asisai" />
            <div class="name">
              <div class="ja">ほない</div>
              <div class="en">Honai Ueoka</div>
            </div>
          </div>
        </div>
        <div class="content">
          <p>
            京都大学大学院 情報学研究科 通信情報システム専攻 /
            修士課程（2023年3月修了予定） /{" "}
            <a href="https://camph.net/" target="_blank" rel="noopener">
              CAMPHOR-
            </a>{" "}
            運営メンバー
          </p>
        </div>
        <div class="content">
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
        </div>
      </section>

      <section class="simple-card">
        <h2 class="heading" id="education">
          <a href="#education" class="anchor">
            Education
          </a>
        </h2>
        {profile.education.map((E) => (
          <div class="content">
            <div class="education-item">
              <div class="period">{E.period}</div>
              <div class="desc">{E.title}</div>
            </div>
          </div>
        ))}
      </section>

      <section class="simple-card">
        <h2 class="heading" id="intern">
          <a href="#intern" class="anchor">
            Internships / Employments
          </a>
        </h2>
        {profile.jobs.map((E) => (
          <div class="content">
            <div class="education-item">
              <div class="period">{E.period}</div>
              <div class="desc">{E.title}</div>
            </div>
          </div>
        ))}
      </section>

      <section class="simple-card">
        <h2 class="heading" id="publications">
          <a href="#publications" class="anchor">
            Publications
          </a>
        </h2>
        {profile.publications.map((P) => (
          <div class="content">
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
          </div>
        ))}
      </section>

      <section class="simple-card">
        <h2 class="heading" id="posts">
          <a href="#posts" class="anchor">
            Posts
          </a>
        </h2>
        {feeds.map((post) => (
          <div class="content post-item">
            <a href={post.link} target="_blank" rel="noopener">
              {post.title}
            </a>
            <div class="source">
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
          </div>
        ))}
      </section>

      <section class="simple-card">
        <h2 class="heading" id="presentations">
          <a href="#presentations" class="anchor">
            Presentations
          </a>
        </h2>
        <div class="content">
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
        </div>
      </section>

      <section class="simple-card">
        <h2 class="heading" id="works">
          <a href="#works" class="anchor">
            Works
          </a>
        </h2>
        <div class="content">
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
        </div>
      </section>

      <section class="simple-card">
        <h2 class="heading" id="blog">
          <a href="#blog" class="anchor">
            Blog
          </a>
        </h2>
        <div class="content">
          <a href="/blog">Honai's Blog</a>
        </div>
      </section>
    </PortfolioLayout>
  );
};
