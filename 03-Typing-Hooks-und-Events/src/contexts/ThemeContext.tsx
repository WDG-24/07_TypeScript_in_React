import { createContext, useContext, useState } from 'react';

// 'as const' macht das Array zu einem readonly tuple mit literal types
// (könnte nun auch in eine config.ts Datei ausgelagert werden)
const installedThemes = ['halloween', 'dim', 'caramellatte', 'nord'] as const;

// Type wird automatisch aus dem Array abgeleitet: "halloween" | "dim" | "caramellatte" | "nord"
export type UsableThemes = (typeof installedThemes)[number];

// Type für die Struktur des Context-Values
export type ThemeContextType = {
  theme: UsableThemes;
  changeTheme: (newTheme: UsableThemes) => void;
};

// Context braucht als Fallback Objekt mit initalem Wert
const ThemeContext = createContext<ThemeContextType>({
  theme: 'halloween',
  changeTheme: () => {},
});

// Props-Type inline definiert: children muss vom Type React.ReactNode sein
export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  // Generic <UsableThemes> gibt an, welche Werte der State haben darf
  const [theme, setTheme] = useState<UsableThemes>('halloween');

  // Parameter-Type stellt sicher, dass nur gültige Themes übergeben werden können
  const changeTheme = (newTheme: UsableThemes) => {
    if (installedThemes.includes(newTheme)) setTheme(newTheme);
  };

  return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  // Return-Type wird automatisch als ThemeContextType inferiert
  return useContext(ThemeContext);
}
