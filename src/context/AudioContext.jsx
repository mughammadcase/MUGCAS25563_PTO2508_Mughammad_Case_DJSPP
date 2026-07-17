import { createContext, useContext, useState } from "react";

const AudioContext = createContext();

/**
 * Provides global audio state to the application.
 *
 * @param {*} param0
 * @returns
 */
export function AudioProvider({ children }) {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  /**
   * Sets the selected episode and starts playback
   *
   * @param {*} episode
   */
  function playEpisode(episode) {
    setCurrentEpisode(episode);
    setIsPlaying(true);
  }

  const pauseAudio = () => {
    setIsPlaying(false);
  };

  const resumeAudio = () => {
    setIsPlaying(true);
  };

  const seekAudio = (time) => {
    setCurrentTime(time);
  };

  return (
    <AudioContext.Provider
      value={{
        currentEpisode,
        isPlaying,
        playEpisode,
        pauseAudio,
        resumeAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

/**
 * Custom hook for consuming AudioContext
 *
 * @param {Object} episode
 * @returns
 */
export function useAudio() {
  return useContext(AudioContext);
}
