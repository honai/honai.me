import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import VerticalGrow from "../components/VerticalGrow";
import { BaseHtml } from "./BaseHtml";

/**
 * @param {Object} props
 * @param {string} [props.subTitle]
 * @param {string} [props.description] 空文字ならdescriptionなし、undefならデフォルトのテキスト
 * @param {string} [props.thumbnailUrl]
 * @param {import("../../../types").TwitterCard} [props.twitterCard]
 * @param {string} [props.headerMaxWidth]
 * @param {any} props.children
 */
export const PortfolioLayout = ({ headerMaxWidth, children, ...o }) => {
  return (
    <BaseHtml
      title={!!o.subTitle ? `${o.subTitle} | honai.me` : "honai.me"}
      description={o.description ?? "honaiのポートフォリオ・ブログ"}
      thumbnailUrl={o.thumbnailUrl || "/images/profile.png"}
      twitterCard={
        o.twitterCard ||
        (o.thumbnailUrl ? { kind: "large" } : { kind: "normal" })
      }
    >
      <VerticalGrow>
        <Header maxWidth={headerMaxWidth || "72rem"} />
        <VerticalGrow.Grow>{children}</VerticalGrow.Grow>
        <Footer />
      </VerticalGrow>
    </BaseHtml>
  );
};
