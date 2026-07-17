import { createContext, useContext, useState } from "react";

const AudioContext = createContext();

/**
 *
 * @param {*} param0
 * @returns
 */
export function AudioProvider({ children }) {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // playEpisode seperate from audio, as it needs more data like title, season, show etc. keeps responsibilties clear
  const playEpisode = (episode) => {
    setCurrentEpisode(episode);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const pauseAudio = () => {
    setIsPlaying(false);
  };

  const resumeAudio = () => {
    if (currentEpisode) {
      setIsPlaying(true);
    }
  };

  const seekAudio = (time) => {
    setCurrentTime(time);
  };

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
