import React, { useState, ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";

type Theme = "light" | "dark";

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [darkMode, setdarkMode] = useState<boolean>(false)
    const [theme, setTheme] = useState<Theme>('light');

    const toggleTheme = () => {
        setdarkMode(!darkMode)
        setTheme(darkMode === true ? 'dark' : 'light')
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, darkMode, setdarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};