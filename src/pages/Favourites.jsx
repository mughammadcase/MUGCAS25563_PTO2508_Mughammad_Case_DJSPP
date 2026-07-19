import { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";
import { useAudio } from "../context/AudioContext";
import EpisodeFavouritesButton from "../components/Controls/EpisodeFavouritesButton";
import { formatDate } from "../utils/formatDate";
import styles from "./Favourites.module.css";

/**
 * Displays all favourited podcast episodes.
 * Episodes are grouped by their parent show title
 *
 * @returns {JSX.Element}
 */
export default function Favourites() {
  const { favourites } = useContext(FavouritesContext);
  const { playEpisode } = useAudio();

  /**
   * Groups favourited episodes by their show title.
   *
   * @param {Array} favourites - The array of favourited episodes
   * @returns {Object} - An object with show titles as keys and arrays of episodes as values
   */
  const grouped = favourites.reduce((acc, episode) => {
    if (!acc[episode.showTitle]) {
      acc[episode.showTitle] = [];
    }

    acc[episode.showTitle].push(episode);

    return acc;
  }, {});

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

      {Object.entries(grouped).map(([showTitle, episodes]) => (
        <section key={showTitle} className={styles.showGroup}>
          <h2 className={styles.showHeading}>{showTitle}</h2>

          <div className={styles.episodeList}>
            {episodes.map((episode) => (
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
                  <h3>{episode.title}</h3>

                  <p>
                    Season {episode.season} • Episode {episode.episode}
                  </p>

                  <p className={styles.description}>
                    {episode.podcastDescription}
                  </p>

                  <p className={styles.updated}>
                    Added {formatDate(episode.addedAt)}
                  </p>
                </div>

                <EpisodeFavouritesButton episode={episode} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
