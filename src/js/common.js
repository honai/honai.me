import "./modules/theme-toggle";
import { requestIdleCallback } from "./modules/requestIdleCallback";

requestIdleCallback(() => {
  document.querySelectorAll("ins.adsbygoogle").forEach((_) => {
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
  });
});
