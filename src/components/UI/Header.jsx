import styles from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "../Controls/ThemeToggle";

export default function Header() {
  return (
    <header className={styles.appHeader}>
      <h1>
        <Link to="/" className={styles.logo}>
          🎙️ Podcast App
        </Link>
      </h1>

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

      <ThemeToggle />
    </header>
  );
}
