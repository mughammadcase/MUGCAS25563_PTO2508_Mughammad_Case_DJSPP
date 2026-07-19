import { createContext, useEffect, useState } from "react";
import { getFavourites, saveFavourites } from "../utils/favouritesStorage";

// Context for managing favourited podcast episodes
export const FavouritesContext = createContext();

/**
 * Provides global favourites state and helper functions
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
export function FavouritesProvider({ children }) {
  // Lazy initialization to read once during init & no extra render with empty array first
  const [favourites, setFavourites] = useState(() => getFavourites());

  /**
   * Persist favourites whenever they change
   */
  useEffect(() => {
    saveFavourites(favourites);
  }, [favourites]);

  /**
   * Checks if an episode is already favourited
   *
   * @param {string} id
   * @returns {boolean}
   */
  function isFavourites(id) {
    return favourites.some((fav) => fav.id === id);
  }

  /**
   * Adds an episode to favourites
   *
   * @param {Object} episode
   */
  function addFavourites(episode) {
    if (isFavourites(episode.id)) return;

    setFavourites((prev) => [
      ...prev,
      {
        ...episode,
        addedAt: new Date().toISOString(),
      },
    ]);
  }

  /**
   * Removes an episode from favourites
   *
   * @param {string} id
   */
  function removeFavourites(id) {
    setFavourites((prev) => prev.filter((episode) => episode.id !== id));
  }

  /**
   * Toggle favourite status
   *
   * @param {Object} episode
   */
  function toggleFavourites(episode) {
    if (isFavourites(episode.id)) {
      removeFavourites(episode.id);
    } else {
      addFavourites(episode);
    }
  }

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addFavourites,
        removeFavourites,
        toggleFavourites,
        isFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}
