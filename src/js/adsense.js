import { requestIdleCallback } from "./modules/requestIdleCallback";

requestIdleCallback(() => {
  const el = document.createElement("script");
  el.src =
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9155380222623167";
  el.defer = true;
  document.body.append(el);
  window.adsbygoogle = window.adsbygoogle || [];
  window.adsbygoogle.push({});
});
