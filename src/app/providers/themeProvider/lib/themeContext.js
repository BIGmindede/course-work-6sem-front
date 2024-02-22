import { createContext } from "react";

export const Themes = {
    LIGHT: 'light',
    DARK: 'dark'
}

export const ThemeContext = createContext({})

export const LS_THEME_KEY = 'theme'