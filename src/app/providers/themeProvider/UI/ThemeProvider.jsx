import { useMemo, useState } from "react"
import { LS_THEME_KEY, ThemeContext } from "../lib/themeContext"

const defaultTheme = localStorage.getItem(LS_THEME_KEY)

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