const STORAGE_KEY = "podcast-favourites";

/**
 * Retrieves all favourite episodes from localStorage
 * @returns {Array}
 */
export function getFavourites() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Saves favourite episodes to localStorage
 * @param {Array} favourites
 */
export function saveFavourites(favourites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
}
