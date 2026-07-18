import { useNavigate } from "react-router-dom";
import GenreTags from "../GenreTags";
import styles from "./RecommendedCarousel.module.css";

/**
 *
 * @param {*} param0
 * @returns
 */
export default function CarouselCard({ podcast }) {
  const navigate = useNavigate();

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
