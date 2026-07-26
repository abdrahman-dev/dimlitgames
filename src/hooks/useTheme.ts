import { useState, useEffect, useCallback } from "react";
import type { ThemeMode } from "../types";

const STORAGE_KEY = "dimlit-theme";

function getInitialTheme(): ThemeMode {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "night" || stored === "dawn") return stored;
  if (window.matchMedia("(prefers-color-scheme: dawn)").matches) return "dawn";
  return "night";
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme);

  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeState(mode);
    localStorage.setItem(STORAGE_KEY, mode);
    document.documentElement.setAttribute("data-theme", mode);
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === "night" ? "dawn" : "night");
  }, [theme, setTheme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, setTheme, toggle };
}
