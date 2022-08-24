export const requestIdleCallback =
  window.requestIdleCallback || ((cb) => window.setTimeout(cb, 1));
