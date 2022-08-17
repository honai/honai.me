// 日付をブラウザ言語に合わせる
const dateElements = document.querySelectorAll("[data-js-locale-date]");
for (const el of dateElements) {
  const date = new Date(el.getAttribute("datetime"));
  el.textContent = date.toLocaleDateString();
}

// インラインコードを読みやすく
for (const el of document.querySelectorAll(
  "pre:not([class]), code:not([class])"
)) {
  el.classList.add("language-text");
}

// TOCスクロール連動
const initTableOfContents = () => {
  const postTocClass = "toc";
  const headingObserveMap = new Map();
  const ids = [];

  const updateTocHighlights = (baseID, offset) => {
    const activeClass = "-active";
    const baseIdx = ids.indexOf(baseID);
    const targetIdx = baseIdx + offset;
    if (targetIdx < 0 || ids.length <= targetIdx) {
      return;
    }
    const targetID = ids[targetIdx];
    const removeTarget = document.querySelector(
      `.${postTocClass} a.${activeClass}`
    );
    if (removeTarget) {
      removeTarget.classList.remove(activeClass);
    }
    document
      .querySelector(`.${postTocClass} a[href='#${targetID}']`)
      .classList.add(activeClass);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const { target, isIntersecting, intersectionRatio: ratio } = e;
        const { y } = e.boundingClientRect;
        const id = target.getAttribute("id");
        const prev = headingObserveMap.get(id);
        headingObserveMap.set(id, { ...prev, y, ratio });
        if (prev.y === null) {
          continue;
        }
        const diffY = y - prev.y;
        if (isIntersecting) {
          updateTocHighlights(id, 0);
        } else if (!isIntersecting && diffY > 0) {
          updateTocHighlights(id, -1);
        }
      }
    },
    { threshold: 0, rootMargin: "-1% 0px -99% 0px" }
  );

  const tocAnchors = document.querySelectorAll(`.${postTocClass} a`);
  tocAnchors.forEach((a) => {
    const id = a.getAttribute("href").slice(1);
    ids.push(id);
    headingObserveMap.set(id, { y: null });
    observer.observe(document.getElementById(id));
  });
};

const loadExternalScripts = () => {
  const elms = document.getElementsByClassName("external-scripts-list");
  const scripts = Array.from(elms)
    .map((e) => JSON.parse(e.textContent))
    .flat();
  console.log(scripts);
  scripts.map((s) => {
    var e = document.createElement("script");
    e.src = s;
    document.body.appendChild(e);
  });
};

// polyfill
if (!window.requestIdleCallback) {
  window.requestIdleCallback = (cb) => {
    return window.setTimeout(cb, 1);
  };
}

window.requestIdleCallback(() => {
  initTableOfContents();
  loadExternalScripts();
});
