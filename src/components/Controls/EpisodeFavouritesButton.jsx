import { useContext } from "react";
import { FavouritesContext } from "../../context/FavouritesContext";

/**
 * Button for adding an episode as a favourite
 *
 * @param {Object} props
 * @param {Object} props.episode
 * @returns {JSX.Element}
 */
export default function EpisodeFavouritesButton({ episode }) {
  const { toggleFavourites, isFavourites } = useContext(FavouritesContext);

  const favourites = isFavourites(episode.id);

  function handleClick(e) {
    // Prevents the episode card click (play audio)
    e.stopPropagation();

    toggleFavourites(episode);
  }

  return (
    <button onClick={handleClick} aria-label="Toggle favourites">
      {favourites ? "❤️" : "🤍"}
    </button>
  );
}
