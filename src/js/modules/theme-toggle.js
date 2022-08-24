import { requestIdleCallback } from "./requestIdleCallback";
// TODO: WebComponentsにしたい
function main() {
  /** @type {HTMLSelectElement} */
  const themeSelector = document.getElementById("theme-selector");
  const STORAGE_KEY = themeSelector.dataset.storageKey;

  const themeClassMap = new Map(
    Array.from(themeSelector.options)
      .filter((option) => !!option.value) // デフォルトオプションは空文字
      //                key =>        value
      .map((option) => [option.value, option.dataset.themeClass])
  );

  const modes = Array.from(themeClassMap.keys());
  function changeTheme(mode) {
    themeClassMap.forEach((v, k) => {
      if (mode === k) {
        document.body.classList.add(v);
      } else {
        document.body.classList.remove(v);
      }
    });
  }

  const storedMode = localStorage.getItem(STORAGE_KEY);
  if (modes.includes(storedMode)) {
    themeSelector.value = storedMode;
    // changeTheme(storedMode); // 初期でやるならいらない
  }

  themeSelector.addEventListener("change", (e) => {
    const mode = e.target.value;
    changeTheme(mode);
    !!mode
      ? localStorage.setItem(STORAGE_KEY, mode)
      : localStorage.removeItem(STORAGE_KEY);
  });
}

requestIdleCallback(main);
