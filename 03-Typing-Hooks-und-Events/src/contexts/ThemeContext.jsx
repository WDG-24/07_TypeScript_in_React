import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('halloween');

const installedThemes = ['halloween', 'dim', 'caramellatte', 'nord'];

export default function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState('halloween');
  const changeTheme = (newTheme) => {
    if (installedThemes.includes(newTheme)) setTheme(newTheme);
  };
  return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
