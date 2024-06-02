import { useClassNames } from 'shared/lib/useClassNames'
import cls from './Button.module.scss'

export const ButtonThemes = {
    BASIC: 'basic',
    CLEAR: 'clear',
    ALFA: 'alfa',
    ROUND: 'round',
    AGREEMENT: 'agreement',
    WARNING: 'warning',
    WITH_ICON: 'withicon',
    UNDERLINED: 'underlined'
}

export const Button = ({ className, children, action, mouseOver, mouseOut, disabled }) => {

    return (
        <button 
            onClick={action}
            className={useClassNames(cls.button, [cls[className]])}
            onMouseOver={mouseOver}
            onMouseOut={mouseOut}
            disabled={disabled}
        >
            {children}
        </button>
    )
}