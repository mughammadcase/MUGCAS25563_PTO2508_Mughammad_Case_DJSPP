import { useContext, useState } from "react";
import { FavouritesContext } from "../context/FavouritesContext";
import { useAudio } from "../context/AudioContext";
import EpisodeFavouritesButton from "../components/Controls/EpisodeFavouritesButton";
import { formatDate } from "../utils/formatDate";
import styles from "./Favourites.module.css";
import selectStyles from "../components/Filters/Select.module.css";

/**
 * Displays all favourited podcast episodes.
 *
 * Features:
 * - Groups episodes by their parent show
 * - Allows sorting by:
 *   - Newest added
 *   - Oldest added
 *   - Episode title A-Z
 *   - Episode title Z-A
 *
 * @returns {JSX.Element}
 */
export default function Favourites() {
  const { favourites } = useContext(FavouritesContext);
  const { playEpisode } = useAudio();

  const [sort, setSort] = useState("newest");

  /**
   * Groups favourited episodes by show title.
   *
   * @type {Record<string, Array>}
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
      <h3 className={styles.subtitle}>Your saved episodes from all shows</h3>

      <div className={styles.sortContainer}>
        <label htmlFor="sort-favourites" className={styles.sortLabel}>
          Sort by:
        </label>

        <select
          id="sort-favourites"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className={selectStyles.select}
        >
          <option value="newest">Newest Added</option>
          <option value="oldest">Oldest Added</option>
          <option value="az">Episode Title A-Z</option>
          <option value="za">Episode Title Z-A</option>
        </select>
      </div>

      {Object.entries(grouped).map(([showTitle, episodes]) => {
        /**
         * Creates a sorted copy of the show's episodes
         */
        const sortedEpisodes = [...episodes];

        switch (sort) {
          case "az":
            sortedEpisodes.sort((a, b) => a.title.localeCompare(b.title));
            break;

          case "za":
            sortedEpisodes.sort((a, b) => b.title.localeCompare(a.title));
            break;

          case "oldest":
            sortedEpisodes.sort(
              (a, b) => new Date(a.addedAt) - new Date(b.addedAt),
            );
            break;

          case "newest":
          default:
            sortedEpisodes.sort(
              (a, b) => new Date(b.addedAt) - new Date(a.addedAt),
            );
            break;
        }

        return (
          <section key={showTitle} className={styles.showGroup}>
            <h2 className={styles.showHeading}>{showTitle}</h2>

            <div className={styles.episodeList}>
              {sortedEpisodes.map((episode) => (
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
                      Added: {formatDate(episode.addedAt)}
                    </p>
                  </div>

                  <EpisodeFavouritesButton episode={episode} />
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
