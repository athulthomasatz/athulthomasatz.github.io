import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext(); 

const themes = {
  dark: {
    name: "dark",
    background: "#0a192f",
    text: "#e6f1ff",
    accent: "#64ffda",
    navbar: "#112240",
    secondary: "#8892b0",
    projecttechtagbackground: "#64ffda",
    projecttechtagcolor: "black",
  },
  light: {
    name: "light",
    background: "#f5f5f5",
    text: "#1a1a1a",
    accent: "#49f731",
    navbar: "#ffffff",
    secondary: "#6e6e6e",
    projecttechtagbackground: " #49f731",
    projecttechtagcolor: "black",
  },
  cyberpunk: {
    name: "cyberpunk",
    background: "#ab85d4",
    text: "#FFFFFF",
    accent: "#424cb8",
    navbar: "#4e1b6e",
    secondary: "#424cb8",
    projecttechtagbackground: " #ff2e6c",
    projecttechtagcolor: "black",
  },
  forest: {
    name: "forest",
    background: "#1a472a",
    text: "#ffffff",
    accent: "#2eff97",
    navbar: "#0c1f12",
    secondary: "#7ab992",
    projecttechtagbackground: " #2eff97",
    projecttechtagcolor: "black",
  },
  sunset: {
    name: "sunset",
    background: "#2d142c",
    text: "#ffffff",
    accent: "#ff6b6b",
    navbar: "#1a0c1a",
    secondary: "#ffd93d",
    projecttechtagbackground: " #ff6b6b",
    projecttechtagcolor: "black",
  },
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentTheme, setCurrentTheme] = useState("dark");

  useEffect(() => {
    const baseTheme = isDarkMode ? themes.dark : themes.light;
    const selectedTheme =
      currentTheme === "dark" || currentTheme === "light"
        ? baseTheme
        : themes[currentTheme];

    document.documentElement.style.setProperty(
      "--background",
      selectedTheme.background
    );
    document.documentElement.style.setProperty("--text", selectedTheme.text);
    document.documentElement.style.setProperty(
      "--accent",
      selectedTheme.accent
    );
    document.documentElement.style.setProperty(
      "--navbar-bg",
      selectedTheme.navbar
    );
    document.documentElement.style.setProperty(
      "--secondary-text",
      selectedTheme.secondary
    );
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode, currentTheme]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    setCurrentTheme(isDarkMode ? "light" : "dark");
  };

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    setIsDarkMode(themeName === "dark");
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        currentTheme,
        changeTheme,
        themes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
