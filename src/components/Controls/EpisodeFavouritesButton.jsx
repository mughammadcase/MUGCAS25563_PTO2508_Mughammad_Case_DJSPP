import { useContext } from "react";
import { FavouriteContext } from "../../context/FavouritesContext";

/**
 * Button for adding an episode as a favourite
 *
 * @param {Object} props
 * @param {Object} props.episode
 * @returns {JSX.Element}
 */
export default function EpisodeFavouritesButton({ episode }) {
  const { toggleFavourite, isFavourite } = useContext(FavouriteContext);

  const favourite = isFavourite(episode.id);

  function handleClick(e) {
    // Prevents the episode card click (play audio)
    e.stopPropagation();

    toggleFavourite(episode);
  }

  return (
    <button onClick={handleClick} aria-label="Toggle favourite">
      {favourite ? "❤️" : "🤍"}
    </button>
  );
}
