import styles from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "../Controls/ThemeToggle";

export default function Header() {
  return (
    <header className={styles.appHeader}>
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          🎙️ <span className={styles.logoText}>Podcast Explorer</span>
        </Link>
      </div>

      <nav className={styles.nav}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.navLink
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.navLink
          }
        >
          Favourites
        </NavLink>
      </nav>

      <div className={styles.right}>
        <ThemeToggle />
      </div>
    </header>
  );
}
