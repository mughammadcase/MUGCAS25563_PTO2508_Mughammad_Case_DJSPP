import { useNavigate } from "react-router-dom";
import GenreTags from "../GenreTags";
import styles from "./RecommendedCarousel.module.css";

/**
 * Renders a single podcast card for recommended podcasts in the carousel
 * @param {*} props - object containing the podcast data
 * @param {Object} props.podcast - The podcast data to display in the card\
 * @param {string} props.podcast.id - unique Id of the podcast
 * @returns {JSX.Element}
 */
export default function CarouselCard({ podcast }) {
  const navigate = useNavigate();

  /**
   * Handles click on the carousel card to navigate to the show detail page
   */
  function handleClick() {
    navigate(`/show/${podcast.id}`, {
      state: { genres: podcast.genres },
    });
  }

  return (
    <div className={styles.card} onClick={handleClick}>
      <img src={podcast.image} alt={podcast.title} className={styles.image} />

      <h3>{podcast.title}</h3>

      <GenreTags genres={podcast.genres} />
    </div>
  );
}
