import { useContext, useMemo, useState } from "react";
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
 * - Groups episodes by podcast.
 * - Sorts podcast groups alphabetically.
 * - Sorts episodes within each group.
 *
 * @returns {JSX.Element}
 */
export default function Favourites() {
  const { favourites } = useContext(FavouritesContext);
  const { playEpisode } = useAudio();

  const [groupSort, setGroupSort] = useState("az");
  const [episodeSort, setEpisodeSort] = useState("newest");

  const groupedEntries = useMemo(() => {
    const grouped = favourites.reduce((acc, episode) => {
      if (!acc[episode.showTitle]) {
        acc[episode.showTitle] = [];
      }

      acc[episode.showTitle].push(episode);
      return acc;
    }, {});

    const entries = Object.entries(grouped);

    entries.sort(([a], [b]) =>
      groupSort === "az" ? a.localeCompare(b) : b.localeCompare(a),
    );

    return entries;
  }, [favourites, groupSort]);

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

      <div className={styles.sortControls}>
        <div className={styles.sortContainer}>
          <label htmlFor="group-sort" className={styles.sortLabel}>
            Podcast order
          </label>

          <select
            id="group-sort"
            className={selectStyles.select}
            value={groupSort}
            onChange={(e) => setGroupSort(e.target.value)}
          >
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>

        <div className={styles.sortContainer}>
          <label htmlFor="episode-sort" className={styles.sortLabel}>
            Episode order
          </label>

          <select
            id="episode-sort"
            className={selectStyles.select}
            value={episodeSort}
            onChange={(e) => setEpisodeSort(e.target.value)}
          >
            <option value="newest">Newest Added</option>
            <option value="oldest">Oldest Added</option>
            <option value="title-az">Title A-Z</option>
            <option value="title-za">Title Z-A</option>
          </select>
        </div>
      </div>

      {groupedEntries.map(([showTitle, episodes]) => {
        // Sort episodes within each podcast group based on the selected episodeSort option
        const sortedEpisodes = [...episodes];

        switch (episodeSort) {
          case "title-az":
            sortedEpisodes.sort((a, b) => a.title.localeCompare(b.title));
            break;

          case "title-za":
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
