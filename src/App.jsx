import { Routes, Route } from "react-router-dom";
import Header from "./components/UI/Header";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowDetail";
import { useTheme } from "./context/ThemeContext";
import { AudioPlayer } from "./components";

/**
 * Root component of the Podcast Explorer app.
 *
 * - Wraps the application in the `PodcastProvider` context for global state.
 * - Includes the `Header` component, displayed on all pages.
 * - Defines client-side routes using React Router:
 *    - "/" renders the `Home` page
 *    - "/show/:id" renders the `ShowDetail` page for a specific podcast
 * - Renders global AudioPlayer outside the routing tree
 *   so it remains mounted while navigating pages
 *
 * @returns {JSX.Element} The root application layout
 */
export default function App() {
  const { theme } = useTheme();

  return (
    <>
      <div className={`app ${theme}`}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/show/:id`} element={<ShowDetail />} />
        </Routes>

        <AudioPlayer />
      </div>
    </>
  );
}
