const DARK = "dark";
const LIGHT = "light";
const SYSTEM = "system";

const STORAGE_KEY = "theme-toggle-scheme";

const updatePreference = (mode) => {
  savePreference(mode);
  const { classList } = document.body;
  switch (mode) {
    case SYSTEM: {
      classList.remove(DARK, LIGHT);
      break;
    }
    case DARK: {
      classList.remove(LIGHT);
      classList.add(DARK);
      break;
    }
    case LIGHT: {
      classList.remove(DARK);
      classList.add(LIGHT);
      break;
    }
    default:
      // noop
      break;
  }
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
