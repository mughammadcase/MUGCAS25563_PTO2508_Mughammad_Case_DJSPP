import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App.jsx";
import { PodcastProvider } from "./context/PodcastContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AudioProvider } from "./context/AudioContext";
import { FavouriteProvider } from "./context/FavouritesContext";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PodcastProvider>
        <ThemeProvider>
          <AudioProvider>
            <FavouriteProvider>
              <App />
            </FavouriteProvider>
          </AudioProvider>
        </ThemeProvider>
      </PodcastProvider>
    </BrowserRouter>
  </StrictMode>,
);
