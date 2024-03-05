import { useMemo, useState } from "react"
import { LS_THEME_KEY, ThemeContext, Themes } from "../lib/themeContext"

const defaultTheme = localStorage.getItem(LS_THEME_KEY) || Themes.LIGHT

export const ThemeProvider = ({children}) => {
    const [appTheme, setAppTheme] = useState(defaultTheme)

    const defaultProps = useMemo(() => ({
        appTheme,
        setAppTheme
    }), [appTheme])

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    )
}