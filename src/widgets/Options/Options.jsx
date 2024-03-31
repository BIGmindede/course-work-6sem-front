import { useClassNames } from 'shared/lib/useClassNames'
import { Button, ButtonThemes } from 'shared/UI/Button/Button'
import { Themes, useTheme } from 'app/providers/themeProvider'
import ArrowDownIcon from 'shared/assets/ArrowDownIcon.svg?react'
import RequestsIcon from 'shared/assets/RequestsIcon.svg?react'
import LightThemeIcon from 'shared/assets/LightThemeIcon.svg?react'
import DarkThemecIcon from 'shared/assets/DarkThemeIcon.svg?react'
import cls from './Options.module.scss'
import { useState } from 'react'

export const Options = ({ className }) => {

    const { theme, handleThemeChange } = useTheme()

    const [collapsed, setCollapsed] = useState(true)

    return (
        <div className={useClassNames(cls.options, [cls[className], collapsed && cls.collapsed])}>
            <div className={cls.optionswrapper}>
                <Button action={handleThemeChange} className={ButtonThemes.ROUND}>
                    {theme === Themes.LIGHT
                        ? <DarkThemecIcon/>
                        : <LightThemeIcon/>
                    }
                </Button>
                <Button action={() => {}} className={ButtonThemes.ROUND}>
                    <RequestsIcon/>
                </Button>
            </div>
            <Button action={() => {setCollapsed(!collapsed)}} className={ButtonThemes.ROUND}>
                <ArrowDownIcon className={cls.arrowdownicon}/>
            </Button>
        </div>
    )
}