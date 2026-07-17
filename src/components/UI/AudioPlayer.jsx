// useRef accesses DOM nodes, bypass React virtual DOM
import { useEffect, useRef } from "react";

import { useAudio } from "../../context/AudioContext";
import styles from "./AudioPlayer.module.css";

export default function AudioPlayer() {
  const audioRef = useRef(null);

  const {
    currentEpisode,
    isPlaying,
    currentTime,
    duration,
    setCurrentTime,
    setDuration,
    pauseAudio,
    resumeAudio,
  } = useAudio();

  /**
   * Loads a newly selected episode
   * Only runs when the selected episode changes
   */
  useEffect(() => {
    if (!audioRef.current || !currentEpisode) return;

    const audio = audioRef.current;

    audio.pause();
    audio.src = currentEpisode.file;
    audio.load();

    setCurrentTime(0);
    setDuration(0);

    audio.currentTime = 0;

    if (isPlaying) {
      audio.play().catch(console.error);
    }
  }, [currentEpisode]);

  /**
   * Handles play and pause state changes
   */
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  /**
   * Sets up audio listener once
   */
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      pauseAudio();
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [pauseAudio, setCurrentTime, setDuration]);

  /**
   * Warn the user before leaving the page while audio is playing.
   */
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isPlaying) return;

      event.preventDefault();

      // Required as browsers ignore custom warning messages
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isPlaying]);

  // Hide audio player until an episode is selected
  if (!currentEpisode) return null;

  return (
    <div className={styles.player}>
      <audio ref={audioRef} />

      <div className={styles.info}>
        <h4>{currentEpisode.title}</h4>
      </div>

      <button
        onClick={() => {
          if (isPlaying) {
            pauseAudio();
          } else {
            resumeAudio();
          }
        }}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>

      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={currentTime}
        onChange={(e) => {
          const time = Number(e.target.value);

          if (audioRef.current) {
            audioRef.current.currentTime = time;
          }

          setCurrentTime(time);
        }}
      />
    </div>
  );
}
