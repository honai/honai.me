import { HTMLAttributes } from "../../types.js";

const isExternalLink = (href: string) => {
  // スキーマがあるか
  if (!/^(https?:)?\/\//.test(href)) {
    // 相対パス or 絶対パス or fragment
    return false;
  }
  // ドメインはhonai.meか (サブドメイン含む)
  return !/^(https?:)?\/\/[^\/]*honai\.me($|[^.])/.test(href);
};

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const Link = ({ href, children, ...attrs }: Props) => {
  if (isExternalLink(href)) {
    return (
      <a href={href} target="_blank" rel="noopener" {...attrs}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} {...attrs}>
      {children}
    </a>
  );
};
