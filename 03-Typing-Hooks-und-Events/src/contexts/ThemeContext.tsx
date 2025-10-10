import { createContext, useContext, useState } from 'react';

export type ThemeContextType = {
  theme: UsableThemes;
  changeTheme: (newTheme: UsableThemes) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'halloween',
  changeTheme: () => {},
});

const installedThemes = ['halloween', 'dim', 'caramellatte', 'nord'] as const;

export type UsableThemes = (typeof installedThemes)[number];

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<UsableThemes>('halloween');

  const changeTheme = (newTheme: UsableThemes) => {
    if (installedThemes.includes(newTheme)) setTheme(newTheme);
  };

  return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
