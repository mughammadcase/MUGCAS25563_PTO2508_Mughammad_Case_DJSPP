// Accesses DOM nodes, bypass React virtual DOM
import { useRef } from "react";

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

  // Ensures that player doesnt show until episode is selected
  if (!currentEpisode) return null;

  return (
    <div className={styles.player}>
      <audio ref={audioRef} />

      <div className={styles.info}>
        <h4>{currentEpisode.title}</h4>
      </div>

      <button onClick={() => (isPlaying ? pauseAudio() : resumeAudio())}>
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
