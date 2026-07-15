/**
 * Retrieves the saved theme from localStorage
 * Default to light mode if no theme is saved
 *
 * returns {string} The saved theme: light or dark
 */
export function getStoredTheme() {
  return localStorage.getItem("theme") || "light";
}

export function saveTheme(theme) {
  localStorage.setItem("theme", theme);
}
