import { createContext, useEffect, useState } from "react";
import { getFavourites, saveFavourites } from "../utils/favouritesStorage";

// Context for managing favourited podcast episodes
export const FavouriteContext = createContext();

/**
 * Provides global favourites state and helper functions
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
export function FavouriteProvider({ children }) {
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
  function isFavourite(id) {
    return favourites.some((fav) => fav.id === id);
  }

  /**
   * Adds an episode to favourites
   *
   * @param {Object} episode
   */
  function addFavourite(episode) {
    if (isFavourite(episode.id)) return;

    setFavourites((prev) => [...prev, episode]);
  }

  /**
   * Removes an episode from favourites
   *
   * @param {string} id
   */
  function removeFavourite(id) {
    setFavourites((prev) => prev.filter((episode) => episode.id !== id));
  }

  /**
   * Toggle favourite status
   *
   * @param {Object} episode
   */
  function toggleFavourite(episode) {
    if (isFavourite(episode.id)) {
      removeFavourite(episode.id);
    } else {
      addFavourite(episode);
    }
  }

  return (
    <FavouriteContext.Provider
      value={{
        favourites,
        addFavourite,
        removeFavourite,
        toggleFavourite,
        isFavourite,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
}
