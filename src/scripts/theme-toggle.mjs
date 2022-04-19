const DARK = "dark";
const LIGHT = "light";
const SYSTEM = "system";

const DARK_MEDIA = `(prefers-color-scheme: ${DARK})`;
const LIGHT_MEDIA = `(prefers-color-scheme: ${LIGHT})`;

const STORAGE_KEY = "theme-toggle-scheme";

const darkCSS = document.querySelectorAll(
  `link[rel=stylesheet][media*=prefers-color-scheme][media*="${DARK}"]`
);
const lightCSS = document.querySelectorAll(
  `link[rel=stylesheet][media*=prefers-color-scheme][media*="${LIGHT}"]`
);

const updatePreference = (mode) => {
  savePreference(mode);
  switch (mode) {
    case SYSTEM: {
      darkCSS.forEach((link) => {
        link.media = DARK_MEDIA;
        link.disabled = false;
      });
      lightCSS.forEach((link) => {
        link.media = LIGHT_MEDIA;
        link.disabled = false;
      });
      break;
    }
    case DARK: {
      darkCSS.forEach(enableCSS);
      lightCSS.forEach(disableCSS);
      break;
    }
    case LIGHT: {
      darkCSS.forEach(disableCSS);
      lightCSS.forEach(enableCSS);
      break;
    }
    default:
      // noop
      break;
  }
};

const enableCSS = (link) => {
  link.media = "all";
  link.disabled = false;
};

const disableCSS = (link) => {
  link.media = "not all";
  link.disabled = true;
};

const storedPreference = () => {
  return localStorage.getItem(STORAGE_KEY) ?? SYSTEM;
};

const savePreference = (scheme) => {
  if (scheme === SYSTEM) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }
  localStorage.setItem(STORAGE_KEY, scheme);
};

// TODO: WebComponentsにしたい
const themeSelector = document.getElementById("theme-selector");
const storedMode = storedPreference();
themeSelector.value = storedMode;
updatePreference(storedMode);
themeSelector.addEventListener("change", (e) => {
  const mode = e.target.value;
  if (![SYSTEM, DARK, LIGHT].includes(mode)) {
    return;
  }
  updatePreference(mode);
});
