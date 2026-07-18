import { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";
import { useAudio } from "../context/AudioContext";
import EpisodeFavouritesButton from "../components/Controls/EpisodeFavouritesButton";
import { formatDate } from "../utils/formatDate";
import styles from "./Favourites.module.css";

export default function Favourites() {
  const { favourites } = useContext(FavouritesContext);
  const { playEpisode } = useAudio();

  if (favourites.length === 0) {
    return (
      <main className={styles.emptyState}>
        <h2>No favourites yet.</h2>
        <p>
          Add episodes to your favourites by clicking the heart icon and they'll
          appear here.
        </p>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <h1>Favourite Episodes</h1>

      <div className={styles.episodeList}>
        {favourites.map((episode) => (
          <div
            key={episode.id}
            className={styles.episodeCard}
            onClick={() => playEpisode(episode)}
          >
            <img
              src={episode.image}
              alt={episode.showTitle}
              className={styles.cover}
            />

            <div className={styles.info}>
              <h3>{episode.showTitle}</h3>

              <p>
                Season {episode.season} • Episode {episode.episode}
              </p>

              <p className={styles.description}>{episode.podcastDescription}</p>

              <p className={styles.updated}>
                Updated {formatDate(episode.updated)}
              </p>

              <small>
                Season {episode.season} • Episode {episode.episode}
              </small>
            </div>

            <EpisodeFavouritesButton episode={episode} />
          </div>
        ))}
      </div>
    </main>
  );
}
