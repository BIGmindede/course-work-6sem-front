import { useContext } from "react";
import { LS_THEME_KEY, ThemeContext } from "./themeContext";

export const Themes = {
    LIGHT: 'light',
    DARK: 'dark'
}

export function useTheme() {
    const { appTheme, setAppTheme } = useContext(ThemeContext)

    const handleThemeChange = () => {
        const newTheme = appTheme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT
        setAppTheme(newTheme)
        localStorage.setItem(LS_THEME_KEY, newTheme)
    }

    return { theme: appTheme, handleThemeChange }
}