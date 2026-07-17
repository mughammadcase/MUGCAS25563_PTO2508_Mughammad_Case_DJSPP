import { createContext, useContext, useState } from "react";

const AudioContext = createContext();

/**
 *
 * @param {*} param0
 * @returns
 */
export function AudioProvider({ children }) {
  // Stores which epidose is loaded
  const [currentEpisode, setCurrentEpisode] = useState(null);

  // Audio playing or not (boolean)
  const [isPlaying, setIsPlaying] = useState(false);

  // Stores the listening progress
  const [currentTime, setCurrentTime] = useState(0);

  // length of the episode
  const [duration, setDuration] = useState(0);

  // empty functions for actions
  const playEpisode = (episode) => {};

  const pauseAudio = () => {};

  const resumeAudio = () => {};

  const seekAudio = (time) => {};

  return (
    <AudioContext.Provider
      value={{
        currentEpisode,
        isPlaying,
        currentTime,
        duration,

        playEpisode,
        pauseAudio,
        resumeAudio,
        seekAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

/**
 *
 * @returns
 */
export function useAudio() {
  return useContext(AudioContext);
}
