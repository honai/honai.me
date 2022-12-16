type PeriodTitle = Record<"period" | "title", string>[];

export type Profile = {
  links: Record<"url" | "text" | "icon", string>[];
  education: PeriodTitle;
  jobs: PeriodTitle;
  publications: {
    title: string;
    authors: string;
    journal: string;
    links: Record<"text" | "url", string>[];
  }[];
  works: Record<"name" | "url" | "thumb" | "desc", string>[];
  articles: {
    title: string;
    url: string;
    date: Date;
    source: {
      title: string;
      url: string;
    };
  }[];
};
