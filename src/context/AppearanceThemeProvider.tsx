import { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextType = {
  color: string;
  setColor: (color: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultColor = '#3B82F6'; // Default ke biru

export const AppearanceThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [color, setColorState] = useState(defaultColor);

  // Ubah CSS variable
  const applyColor = (color: string) => {
    document.documentElement.style.setProperty('--primary', color);
    document.documentElement.style.setProperty(
      '--primary-foreground',
      '#ffffff'
    );
  };

  const setColor = (newColor: string) => {
    setColorState(newColor);
    applyColor(newColor);
    localStorage.setItem('theme-color', newColor);
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme-color');
    const initialColor = saved || defaultColor;
    setColorState(initialColor);
    applyColor(initialColor);
  }, []);

  return (
    <ThemeContext.Provider value={{ color, setColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppreanceTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error(
      'useAppreanceTheme must be used inside AppearanceThemeProvider'
    );
  return ctx;
};
