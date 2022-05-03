import { PortfolioLayout } from "./_includes/layouts/PortfolioLayout";

export default ({ page, collections }) => {
  return (
    <PortfolioLayout pageUrl={page.url}>
      <ul>
        {collections.talks.map((s) => (
          <li>
            <a href={s.url}>
              {s.data.title} {String(s.date)}
            </a>
          </li>
        ))}
      </ul>
    </PortfolioLayout>
  );
};
