import { TwitterCard } from "../../types.js";
import { Children } from "../../types.js";
import { Footer } from "../components/Footer.js";
import { Header } from "../components/Header.js";
import VerticalGrow from "../components/VerticalGrow.js";
import { BaseHtml } from "./BaseHtml.js";

interface Props {
  subTitle?: string;
  /** 空文字ならdescriptionなし、undefならデフォルトのテキスト */
  description?: string;
  thumbnailUrl?: string;
  twitterCard?: TwitterCard;
  headerMaxWidth?: string;
  adsense?: boolean;
  noSeo?: boolean;
  children: Children;
}

export const PortfolioLayout = ({ headerMaxWidth, children, ...o }: Props) => {
  return (
    <BaseHtml
      title={!!o.subTitle ? `${o.subTitle} | honai.me` : "honai.me"}
      description={o.description ?? "honaiのポートフォリオ・ブログ"}
      thumbnailUrl={o.thumbnailUrl || "/images/profile.png"}
      twitterCard={
        o.twitterCard ||
        (o.thumbnailUrl ? { kind: "large" } : { kind: "normal" })
      }
      adsense={o.adsense}
      noSeo={o.noSeo}
    >
      <VerticalGrow>
        <Header maxWidth={headerMaxWidth || "72rem"} />
        <VerticalGrow.Grow>{children}</VerticalGrow.Grow>
        <Footer />
      </VerticalGrow>
    </BaseHtml>
  );
};
