import { useState, useEffect } from 'react';
import { Theme, THEMES, ThemeConfig } from '../components/ThemeSwitcher';

const THEME_STORAGE_KEY = 'chit_game_theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('cyan-wave');
  const [config, setConfig] = useState<ThemeConfig>(THEMES['cyan-wave']);

  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
    if (savedTheme && THEMES[savedTheme]) {
      setTheme(savedTheme);
      setConfig(THEMES[savedTheme]);
      applyTheme(THEMES[savedTheme]);
    }
  }, []);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    setConfig(THEMES[newTheme]);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    applyTheme(THEMES[newTheme]);
  };

  const applyTheme = (themeConfig: ThemeConfig) => {
    // Apply CSS variables for dynamic theming
    document.documentElement.style.setProperty('--theme-primary', themeConfig.colors.primary);
    document.documentElement.style.setProperty('--theme-secondary', themeConfig.colors.secondary);
    document.documentElement.style.setProperty('--theme-accent', themeConfig.colors.accent);
    document.documentElement.style.setProperty('--theme-glow', themeConfig.colors.glow);
  };

  return { theme, config, changeTheme };
}
