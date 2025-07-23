import { createContext } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
    darkMode: boolean;
    setdarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    setTheme: () => {},
    darkMode: false,
    setdarkMode: () => {},
    toggleTheme: () => {},
});