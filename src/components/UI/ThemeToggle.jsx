import { useTheme } from "../../context/ThemeContext";

import lightIcon from "../../assets/icon-light-theme.svg";
import darkIcon from "../../assets/icon-dark-theme.svg";

import styles from "./ThemeToggle.module.css";

/**
 * Displays the application theme toggle
 *
 * Allowing users to switch between light and dark mode
 *
 * @returns {JSX.Element} Theme toggle component
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.themeToggleContainer}>
      {/* Light and dark mode as active icons, toggle button also changes colour and position basedon current theme */}
      <img
        src={lightIcon}
        alt="Light mode"
        className={`${styles.themeIcon} ${
          theme === "light" ? styles.selected : ""
        }`}
      />

      <button
        className={`${styles.themeToggle} ${
          theme === "dark" ? styles.active : ""
        }`}
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        <span className={styles.toggleCircle}></span>
      </button>

      <img
        src={darkIcon}
        alt="Dark mode"
        className={`${styles.themeIcon} ${
          theme === "dark" ? styles.selected : ""
        }`}
      />
    </div>
  );
}
