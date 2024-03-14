import { useClassNames } from 'shared/lib/useClassNames'
import cls from './Options.module.scss'
import { Button, ButtonThemes } from 'shared/UI/Button/Button'
import { Themes, useTheme } from 'app/providers/themeProvider'
import LightThemeIcon from 'shared/assets/LightThemeIcon.svg?react'
import DarkThemecIcon from 'shared/assets/DarkThemeIcon.svg?react'

export const Options = ({ className }) => {

    const { theme, handleThemeChange } = useTheme()

    return (
        <div className={useClassNames(cls.options, [cls[className]])}>
            <Button action={handleThemeChange} className={ButtonThemes.ROUND}>
                {theme === Themes.LIGHT
                    ? <DarkThemecIcon/>
                    : <LightThemeIcon/>
                }
            </Button>
        </div>
    )
}