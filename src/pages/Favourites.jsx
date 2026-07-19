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
 * - Filter favourites by podcast.
 * - Sort episodes by:
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

  const [selectedPodcast, setSelectedPodcast] = useState("all");
  const [episodeSort, setEpisodeSort] = useState("newest");

  /**
   * Builds a sorted list of unique podcast titles
   */
  const podcastTitles = useMemo(() => {
    return [...new Set(favourites.map((episode) => episode.showTitle))].sort(
      (a, b) => a.localeCompare(b),
    );
  }, [favourites]);

  /**
   * Group favourites by podcast
   */
  const groupedEntries = useMemo(() => {
    const grouped = favourites.reduce((acc, episode) => {
      if (!acc[episode.showTitle]) {
        acc[episode.showTitle] = [];
      }

      acc[episode.showTitle].push(episode);

      return acc;
    }, {});

    let entries = Object.entries(grouped);

    if (selectedPodcast !== "all") {
      entries = entries.filter(([title]) => title === selectedPodcast);
    }

    return entries;
  }, [favourites, selectedPodcast]);

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
          <label htmlFor="podcast-filter" className={styles.sortLabel}>
            Podcast
          </label>

          <select
            id="podcast-filter"
            className={selectStyles.select}
            value={selectedPodcast}
            onChange={(e) => setSelectedPodcast(e.target.value)}
          >
            <option value="all">All Podcasts</option>

            {podcastTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.sortContainer}>
          <label htmlFor="episode-sort" className={styles.sortLabel}>
            Episode Order
          </label>

          <select
            id="episode-sort"
            className={selectStyles.select}
            value={episodeSort}
            onChange={(e) => setEpisodeSort(e.target.value)}
          >
            <option value="newest">Newest Added</option>
            <option value="oldest">Oldest Added</option>
            <option value="title-az">Episode Title A-Z</option>
            <option value="title-za">Episode Title Z-A</option>
          </select>
        </div>
      </div>

      {groupedEntries.map(([showTitle, episodes]) => {
        // Sort episodes based on the selected sort option
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
