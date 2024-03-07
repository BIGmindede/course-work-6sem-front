import { useClassNames } from 'shared/lib/useClassNames'
import cls from './Button.module.scss'

export const ButtonThemes = {
    BASIC: 'basic',
    CLEAR: 'clear',
    ALFA: 'alfa',
    ROUND: 'round',
    AGREEMENT: 'agreement',
    WARNING: 'warning',
}

export const Button = ({ className, children, action }) => {

    return (
        <button onClick={action} className={useClassNames(cls.button, [cls[className]])}>
            {children}
        </button>
    )
}