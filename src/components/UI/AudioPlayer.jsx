// useRef accesses DOM nodes, bypass React virtual DOM
import { useRef, useEffect } from "react";

import { useAudio } from "../../context/AudioContext";
import styles from "./AudioPlayer.module.css";

export default function AudioPlayer() {
  const audioRef = useRef(null);

  const {
    currentEpisode,
    isPlaying,
    currentTime,
    duration,
    pauseAudio,
    resumeAudio,
    seekAudio,
  } = useAudio();

  useEffect(() => {
    if (!audioRef.current || !currentEpisode) return;

    audioRef.current.src = currentEpisode.file;

    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentEpisode]);

  // Ensures that player doesnt show until episode is selected
  if (!currentEpisode) return null;

  return (
    <div className={styles.player}>
      <audio ref={audioRef} />

      <div className={styles.info}>
        <h4>{currentEpisode.title}</h4>
      </div>

      <button
        onClick={() => {
          if (!audioRef.current) return;

          if (isPlaying) {
            audioRef.current.pause();
            pauseAudio();
          } else {
            audioRef.current.play();
            resumeAudio();
          }
        }}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>

      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={(e) => seekAudio(Number(e.target.value))}
      />
    </div>
  );
}
