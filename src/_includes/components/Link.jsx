const isExternalLink = (href) => {
  // スキーマがあるか
  if (!/^(https?:)?\/\//.test(href)) {
    // 相対パス or 絶対パス or fragment
    return false;
  }
  // ドメインはhonai.meか (サブドメイン含む)
  return !/^(https?:)?\/\/[^\/]*honai\.me($|[^.])/.test(href);
};

export const Link = ({ href, children, ...attrs }) => {
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
