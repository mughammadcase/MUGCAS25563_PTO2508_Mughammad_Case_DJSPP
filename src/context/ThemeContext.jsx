import React, { createContext, useContext, useEffect, useState } from "react";
import { getStoredTheme, saveTheme } from "../utils/themeStorage";

// Creates the Theme Context
const ThemeContext = createContext();

/**
 * Provide global theme state to the application
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
// children = the components wrapped inside <ThemeProvider> i.e. <App />)
export function ThemeProvider({ children }) {
  // calls the function during the initial render only, to avoid unnecessary reads from localStorage
  const [theme, setTheme] = useState(getStoredTheme);

  /**
   * Toggles between light and dark themes
   */
  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook for accessing the Theme Context
 *
 * @returns {{theme: string, toggleTheme: Function}}
 */
export function useTheme() {
  return useContext(ThemeContext);
}
